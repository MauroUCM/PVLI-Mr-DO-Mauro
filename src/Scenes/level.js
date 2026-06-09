import Square from "../Board/Square.js";
import MrDo from "../Entities/MrDo.js";
import Apple from "../Board/Apple.js";

export default class Level extends Phaser.Scene {
	constructor(){
		super({ key: 'level' });



	}

    init(data){
        this.score = 0
    }

    preload(){

    }

    create(){
        let map = this.loadMap();
        this.mapIndex = []

        // physic groups
        this.mapPhysicsGrp = this.physics.add.staticGroup()
        this.applesGrp = this.physics.add.group()
        let limits = this.physics.add.staticGroup()

        let auxCont = 0;
        for(let i = 0; i < 13; i++){
            for(let o = 0; o < 12; o++){
                this.mapIndex.push(new Square(this, 216 + 32 * o, 116 + 32 * i, map[auxCont], 0).setScale(2))
                this.mapPhysicsGrp.add(this.mapIndex[auxCont])
                auxCont++;
            }            
        }

        // player limits
        limits.add(this.add.zone(200, 100, 32, 32 * 13).setOrigin(1,0));                        // left
        limits.add(this.add.zone(200 + 32 * 12, 100, 32, 32 * 13).setOrigin(0,0));              // right
        limits.add(this.add.zone(200, 100, 32 * 12, 32).setOrigin(0,1));                        // top
        limits.add(this.add.zone(200 + 32 * 12, 100 + 32 * 13, 32 * 12, 32).setOrigin(1,0));    // bottom

        this.player = new MrDo(this, 216 + 32 * 5, 116 + 32 * 12).setScale(2).setDepth(2)
        this.physics.add.existing(this.player)

        this.physics.add.collider(this.player, limits)
        this.physics.add.overlap(this.player, this.mapPhysicsGrp, (player, sqr) =>{
            sqr.squareAction(player)
        })

        this.physics.add.collider(this.applesGrp, this.player, () =>{

        })

    }

    update(t, dt){

    }

    spawnApple(x, y){
        this.applesGrp.add(new Apple(this, x, y).setScale(2).setDepth(1))
    }

    addScore(points){
        this.score += points
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
}