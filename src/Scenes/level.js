import Tile from "../Board/Tile.js";
import MrDo from "../Entities/MrDo.js";
import Apple from "../Board/Apple.js";
import Ball from "../Entities/ball.js";
import Dino from "../Entities/Dino.js";
import DinoSpawner from "../Board/dinoSpawner.js";
import BonusItem from "../Board/bonusItem.js";

export default class Level extends Phaser.Scene {
	constructor(){
		super({ key: 'level' });

	}

    init(data){
        this.level = data.level
        this.score = data.score
        this.lives = data.lives
        this.remainingCherries = 0
        this.remainingEnemies = 7
        this.currentEnemies = 0
    }

    preload(){

    }

    addCherries(num){
        this.remainingCherries += num
    }

    addScore(points){
        this.score += points
        this.updateUI()
    }


    create(){
        let map = this.loadMap(this.level);

        this.mapIndex = []
        this.enemies = []
        this.playerBall

        // physic groups
        this.mapTilesGrp = this.physics.add.staticGroup()
        let limits = this.physics.add.staticGroup()
        this.ballGrp = this.physics.add.group()
        this.applesGrp = this.physics.add.group()
        this.enemyGrp = this.physics.add.group()
        this.bonusItemGrp = this.physics.add.group()


        // player limits
        limits.add(this.add.zone(200, 100, 32, 32 * 13).setOrigin(1,0));                        // left
        limits.add(this.add.zone(200 + 32 * 12, 100, 32, 32 * 13).setOrigin(0,0));              // right
        limits.add(this.add.zone(200, 100, 32 * 12, 32).setOrigin(0,1));                        // top
        limits.add(this.add.zone(200 + 32 * 12, 100 + 32 * 13, 32 * 12, 32).setOrigin(1,0));    // bottom

        // map tiles
        let auxCont = 0;
        for(let i = 0; i < 13; i++){
            for(let o = 0; o < 12; o++){
                this.mapIndex.push(new Tile(this, 216 + 32 * o, 116 + 32 * i, map[auxCont], this.level).setScale(2))
                this.mapTilesGrp.add(this.mapIndex[auxCont])
                if(map[auxCont] == 0){
                    this.mapTilesGrp.remove(this.mapIndex[auxCont])
                }
                auxCont++;
            }            
        }

        this.add.existing(new DinoSpawner(this, this.game.config.width * 0.47, this.game.config.height * 0.51, this.remainingEnemies).setScale(2).setOrigin(0.5))

        // UI
        this.scoreText = this.drawText(this.game.config.width * 0.70, this.game.config.height * 0.88,  "SCORE: " + this.score , 15).setOrigin(1, 0)
        this.livesText = this.drawText(this.game.config.width * 0.3, this.game.config.height * 0.88,  "x " + this.lives, 15).setOrigin(0, 0)
        this.extraText = this.drawText(this.game.config.width * 0.24, this.game.config.height * 0.93,  "EXTRA", 15).setOrigin(0.0)
        this.add.image(this.game.config.width * 0.26, this.game.config.height * 0.89, 'single_mr_do').setScale(2)

        // player
        this.player = new MrDo(this, 216 + 32 * 5, 116 + 32 * 12).setScale(2).setDepth(2)
        this.physics.add.existing(this.player)

        //#region colisions
        // player collisions
        this.physics.add.collider(this.player, limits)
        this.physics.add.collider(this.player, this.applesGrp)
        this.physics.add.overlap(this.player, this.mapTilesGrp, (player, sqr)=>{
            sqr.squareAction(player)
        })
        this.physics.add.overlap(this.player, this.enemyGrp, (player, enemy)=>{
            this.killPlayer();
        })
        this.physics.add.overlap(this.player, this.ballGrp, (player, ball)=>{
            player.reload()
            ball.destroy()
        })
        this.physics.add.overlap(this.player, this.bonusItemGrp, ()=>{
            this.addScore((this.level + 1) * 500)
        })

        // ball collisions
        this.physics.add.collider(this.ballGrp, this.mapTilesGrp)
        this.physics.add.collider(this.ballGrp, limits)
        this.physics.add.collider(this.ballGrp, limits)

        this.physics.add.overlap(this.ballGrp, this.enemyGrp, (ball, enemy)=>{
            enemy.die('regular')
            this.remainingEnemies--
            this.currentEnemies--
            ball.destroy()
            this.player.reload()
        })
        this.physics.add.collider(this.ballGrp,this.mapTilesGrp, (tile, ball) =>{
            // if(tile.body.touching.up){
            //     ball.ballBounce(0)
            // }
            // if(tile.body.touching.down){
            //     ball.ballBounce(1)
            // }
            // if(tile.body.touching.right){
            //     ball.ballBounce(2)
            // }
            // if(tile.body.touching.left){
            //     ball.ballBounce(3)
            // }
        })

        // enemy collisions
        this.physics.add.collider(this.enemyGrp, limits, (enemy) =>{
            enemy.relocateToCenter()
            enemy.changeDirection (Math.floor(Math.random() * 4))
        })
        this.physics.add.collider(this.enemyGrp, this.mapTilesGrp, (enemy) =>{
            enemy.relocateToCenter()
            enemy.changeDirection(Math.floor(Math.random() * 4))        
        })

        //#endregion
    }

    update(t, dt){
        // victoria
        if(this.remainingEnemies <= 0 || this.remainingCherries <= 0){
            this.scene.start('end', {
                level: this.level,
                score: this.score,
                lives: this.lives,
                victory: true
            })

        }
        // derrota
        else if(this.lives <= 0){
            this.scene.start('end', {
                level: this.level,
                score: this.score,
                lives: this.lives,
                victory: false
            })
        }
    }

    spawnBall(x, y, dir){
        let ball = new Ball(this, x, y, dir).setScale(0.6)
        this.ballGrp.add(ball)
        this.playerBall = ball
        ball.setDirection(dir)
        ball.body.setBounce(1)
    }

    spawnApple(x, y){
        this.applesGrp.add(new Apple(this, x, y).setDepth(1))
    }

    spawnDino(x, y){
        let dino = new Dino(this, x, y).setScale(2)
        this.currentEnemies++;
        this.enemyGrp.add(dino)
        this.enemies.push(dino)
    }

    spawnBonus(x, y){
        
    }

    updateUI(){
        this.scoreText.setText("SCORE: " + this.score)
        this.livesText.setText("x " + this.lives)
    }

    killPlayer(){
        this.lives -= 1
        this.resetLevel()
        this.updateUI()
    }

    resetLevel(){
        // kill all enemies 
        this.enemies.forEach((dino)=>{
            dino.destroy()
        })
        this.enemies = []

        if(this.playerBall != null) this.playerBall.destroy()
        this.player.reload()

        this.add.existing(new DinoSpawner(this, this.game.config.width * 0.47, this.game.config.height * 0.51, this.remainingEnemies).setScale(2).setOrigin(0.5))
        this.player.resetOGPosition()
    }

    // 0 = vacio, 1 = tierra, 2 = manzana, 3 = cereza
    loadMap(level){
        switch(level){
            case 0:
                return [
                    1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                    3, 3, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    3, 3, 1, 1, 2, 0, 3, 3, 3, 3, 0, 0,
                    3, 3, 1, 3, 3, 0, 3, 3, 3, 3, 2, 0,
                    3, 3, 1, 3, 3, 0, 1, 1, 2, 1, 1, 0,
                    1, 1, 2, 3, 3, 0, 1, 1, 1, 1, 1, 0,
                    1, 1, 1, 3, 3, 0, 1, 1, 3, 3, 1, 0,
                    1, 1, 1, 1, 1, 0, 1, 1, 3, 3, 1, 0,
                    3, 3, 3, 3, 1, 0, 1, 2, 3, 3, 1, 0,
                    3, 3, 3, 3, 1, 0, 1, 1, 3, 3, 1, 0,
                    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0,
                    0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
                    ];
            break;
            case 1:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 1,
                    0, 0, 3, 3, 3, 3, 2, 1, 1, 1, 0, 0,
                    0, 2, 3, 3, 3, 3, 2, 1, 3, 3, 1, 0,
                    1, 1, 1, 2, 1, 1, 1, 1, 3, 3, 1, 0,
                    3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 0,
                    3, 3, 1, 1, 1, 0, 1, 1, 3, 3, 0, 0,
                    3, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
                    3, 3, 1, 0, 0, 0, 1, 2, 1, 1, 3, 3,
                    1, 0, 0, 0, 3, 3, 3, 3, 1, 1, 3, 3,
                    0, 0, 1, 1, 3, 3, 3, 3, 1, 1, 3, 3,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ];
            break;
            case 2:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 1, 1, 2, 1, 2, 1, 0, 0, 1,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 1, 3, 3, 3, 3, 1, 3, 3, 2, 0,
                    3, 3, 2, 3, 3, 3, 3, 1, 3, 3, 1, 0,
                    3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 1, 0,
                    3, 3, 1, 1, 1, 0, 1, 1, 3, 3, 0, 0,
                    3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 3, 3, 1, 1, 2, 1, 1, 0, 0,
                    1, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 0,
                    0, 1, 1, 3, 3, 1, 1, 3, 3, 3, 3, 0,
                    0, 0, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                    ];
            break;
            case 3:
                return [
                    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                    3, 3, 3, 3, 0, 1, 1, 1, 2, 0, 1, 1,
                    3, 3, 3, 3, 0, 2, 1, 1, 1, 0, 3, 3,
                    1, 1, 2, 0, 0, 1, 1, 1, 1, 0, 3, 3,
                    3, 3, 1, 0, 1, 1, 2, 3, 3, 0, 3, 3,
                    3, 3, 0, 0, 1, 1, 2, 3, 3, 0, 3, 3,
                    3, 3, 0, 1, 1, 0, 1, 3, 3, 0, 1, 1,
                    3, 3, 0, 0, 0, 0, 1, 3, 3, 0, 2, 1,
                    0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 3, 3, 3, 3, 1, 1, 1, 1, 0, 1, 1,
                    1, 3, 3, 3, 3, 0, 0, 0, 0, 0, 1, 1
                    ];
            break;
            case 4:
                return [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
                    0, 2, 3, 3, 3, 3, 1, 2, 1, 1, 1, 1,
                    0, 1, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3,
                    0, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 2, 0, 0, 0, 1, 2, 1, 0, 0,
                    1, 3, 3, 1, 0, 0, 0, 2, 1, 3, 3, 0,
                    1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 0,
                    1, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 0,
                    0, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                    ];
            break;
            case 5:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    1, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1,
                    0, 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
                    0, 2, 3, 3, 1, 3, 3, 3, 3, 2, 3, 3,
                    0, 1, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3,
                    0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3,
                    0, 1, 3, 3, 1, 0, 1, 1, 1, 1, 3, 3,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 3, 3, 3, 3, 1, 1, 1, 1, 2, 1, 0,
                    0, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 0,
                    0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                    ];
            break;
            case 6:
                return [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0,
                    1, 3, 3, 1, 1, 1, 2, 1, 1, 1, 0, 0,
                    1, 3, 3, 2, 3, 3, 3, 3, 1, 0, 0, 1,
                    1, 3, 3, 1, 3, 3, 3, 3, 0, 0, 1, 1,
                    1, 3, 3, 1, 1, 1, 1, 0, 0, 1, 3, 3,
                    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 3, 3,
                    1, 1, 2, 1, 1, 0, 0, 1, 1, 1, 3, 3,
                    3, 3, 3, 3, 1, 0, 1, 3, 3, 2, 3, 3,
                    3, 3, 3, 3, 1, 0, 1, 3, 3, 1, 1, 1,
                    1, 1, 1, 1, 1, 0, 1, 3, 3, 1, 1, 1,
                    1, 1, 1, 1, 1, 0, 1, 3, 3, 1, 1, 1,
                    1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1
                    ];
            break;
            case 7:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 1, 2, 2, 1, 1, 1, 0, 0, 1,
                    0, 0, 3, 3, 1, 3, 3, 1, 3, 3, 0, 0,
                    0, 2, 3, 3, 1, 3, 3, 2, 3, 3, 1, 0,
                    0, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 0,
                    0, 0, 3, 3, 1, 3, 3, 1, 3, 3, 0, 0,
                    1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    0, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 0,
                    0, 3, 3, 3, 3, 1, 1, 2, 1, 1, 1, 0,
                    0, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 0,
                    0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 0, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
                    ];
            break;
            case 8:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 1,
                    0, 0, 2, 1, 2, 3, 3, 3, 3, 2, 0, 0,
                    0, 1, 3, 3, 1, 3, 3, 3, 3, 1, 1, 0,
                    0, 1, 3, 3, 1, 1, 1, 1, 2, 1, 1, 0,
                    0, 1, 3, 3, 1, 1, 1, 3, 3, 3, 3, 0,
                    0, 0, 3, 3, 1, 0, 1, 3, 3, 3, 3, 0,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    3, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0,
                    3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 1, 0,
                    3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 0, 0,
                    3, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
                    ];
            break;
            case 9:
                return [
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 1,
                    0, 0, 0, 0, 1, 1, 2, 1, 2, 1, 0, 0,
                    0, 1, 1, 0, 0, 1, 3, 3, 3, 3, 1, 0,
                    0, 1, 2, 1, 0, 0, 3, 3, 3, 3, 1, 0,
                    0, 3, 3, 3, 3, 0, 1, 1, 1, 1, 2, 0,
                    0, 3, 3, 3, 3, 0, 1, 1, 1, 3, 3, 0,
                    0, 1, 1, 1, 1, 0, 1, 1, 1, 3, 3, 0,
                    0, 3, 3, 3, 3, 0, 0, 0, 1, 3, 3, 0,
                    0, 3, 3, 3, 3, 1, 2, 0, 0, 3, 3, 0,
                    0, 0, 1, 1, 3, 3, 3, 3, 0, 0, 0, 0,
                    1, 0, 0, 1, 3, 3, 3, 3, 1, 0, 0, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
                    ];
            break;

            default:
                return [
                    1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1,
                    3, 3, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    3, 3, 1, 1, 2, 0, 3, 3, 3, 3, 0, 0,
                    3, 3, 1, 3, 3, 0, 3, 3, 3, 3, 2, 0,
                    3, 3, 1, 3, 3, 0, 1, 1, 2, 1, 1, 0,
                    1, 1, 2, 3, 3, 0, 1, 1, 1, 1, 1, 0,
                    1, 1, 1, 3, 3, 0, 1, 1, 3, 3, 1, 0,
                    1, 1, 1, 1, 1, 0, 1, 1, 3, 3, 1, 0,
                    3, 3, 3, 3, 1, 0, 1, 2, 3, 3, 1, 0,
                    3, 3, 3, 3, 1, 0, 1, 1, 3, 3, 1, 0,
                    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0,
                    0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1
                    ];
            break;
        }
        
    }

    drawText(x, y, text, size){
    return this.add.text(x, y,  text, {
        fontFamily: 'arcade' , color: '#ffffff', fontSize: size
    }).setOrigin(0.5, 0)
    }
}