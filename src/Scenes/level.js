import Tile from "../Board/Tile.js";
import MrDo from "../Entities/MrDo.js";
import Apple from "../Board/Apple.js";
import Ball from "../Entities/ball.js";
import Dino from "../Entities/Dino.js";

export default class Level extends Phaser.Scene {
	constructor(){
		super({ key: 'level' });



	}

    init(data){
        this.score = 0
        this.lives = 3
        this.cherries = 0;
    }

    preload(){

    }

    create(){
        let map = this.loadMap();
        this.mapIndex = []

        // physic groups
        this.mapTilesGrp = this.physics.add.staticGroup()
        let limits = this.physics.add.staticGroup()
        this.ballGrp = this.physics.add.group()
        this.applesGrp = this.physics.add.group()
        this.enemyGrp = this.physics.add.group()

        // player limits
        limits.add(this.add.zone(200, 100, 32, 32 * 13).setOrigin(1,0));                        // left
        limits.add(this.add.zone(200 + 32 * 12, 100, 32, 32 * 13).setOrigin(0,0));              // right
        limits.add(this.add.zone(200, 100, 32 * 12, 32).setOrigin(0,1));                        // top
        limits.add(this.add.zone(200 + 32 * 12, 100 + 32 * 13, 32 * 12, 32).setOrigin(1,0));    // bottom

        // map tiles
        let auxCont = 0;
        for(let i = 0; i < 13; i++){
            for(let o = 0; o < 12; o++){
                this.mapIndex.push(new Tile(this, 216 + 32 * o, 116 + 32 * i, map[auxCont], 0).setScale(2))
                this.mapTilesGrp.add(this.mapIndex[auxCont])
                if(map[auxCont] == 0){
                    this.mapTilesGrp.remove(this.mapIndex[auxCont])
                }
                auxCont++;
            }            
        }

        this.spawnDino()

        // UI
        this.scoreText = this.drawText(this.game.config.width * 0.70, this.game.config.height * 0.88,  "SCORE: " + this.score , 15) .setOrigin(1, 0)
        this.livesText = this.drawText(this.game.config.width * 0.3, this.game.config.height * 0.88,  "x " + this.lives, 15) .setOrigin(0, 0)
        this.add.image(this.game.config.width * 0.26, this.game.config.height * 0.89, 'single_mr_do').setScale(2)

        // player
        this.player = new MrDo(this, 216 + 32 * 5, 116 + 32 * 12).setScale(2).setDepth(2)
        this.physics.add.existing(this.player)


        this.physics.add.collider(this.player, limits)
        this.physics.add.collider(this.applesGrp, this.player)
        this.physics.add.overlap(this.player, this.enemyGrp, (player, enemy) =>{
            this.killPlayer();
        })
        this.physics.add.overlap(this.player, this.mapTilesGrp, (player, sqr) =>{
            sqr.squareAction(player)
        })
        this.physics.add.collider(limits, this.ballGrp, (limit, ball) =>{})
        this.physics.add.overlap(this.player, this.ballGrp, (player, ball) =>{
            player.reload()
            ball.destroy()
        })
        this.physics.add.collider(this.mapTilesGrp, this.ballGrp, (tile, ball) =>{
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
    }

    update(t, dt){
        
    }

    spawnBall(x, y, dir){
        let ball = new Ball(this, x, y, dir).setScale(0.6)
        this.ballGrp.add(ball)
        ball.setDirection(dir)
        ball.body.setBounce(1)
    }

    spawnApple(x, y){
        this.applesGrp.add(new Apple(this, x, y).setDepth(1))
    }

    spawnDino(){
        this.enemyGrp.add(new Dino(this, this.game.config.width * 0.47, this.game.config.height / 2 ).setScale(2))
    }

    updateUI(){
        this.scoreText.setText("SCORE: " + this.score)
        this.livesText.setText("x " + this.lives)
    }

    addScore(points){
        this.score += points
        this.updateUI()
    }

    killPlayer(){
        this.lives -= 1;
        this.updateUI()
        this.player.die()
    }

    // 0 = vacio, 1 = tierra, 2 = manzana, 3 = cereza
    loadMap(){
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
    }

        drawText(x, y, text, size){
        return this.add.text(x, y,  text, {
            fontFamily: 'arcade' , color: '#ffffff', fontSize: size
        }).setOrigin(0.5, 0)
    }
}