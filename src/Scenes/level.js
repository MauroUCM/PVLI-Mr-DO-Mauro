import Square from "../Board/Square.js";
import MrDo from "../Entities/MrDo.js";

export default class Level extends Phaser.Scene {
	constructor(){
		super({ key: 'level' });



	}

    init(data){

    }

    preload(){

    }

    create(){
        let map = this.loadMap();
        this.mapIndex = []
        this.mapPhysicsGrp = this.physics.add.staticGroup();

        let auxCont = 0;
        for(let i = 0; i < 13; i++){
            for(let o = 0; o < 12; o++){
                this.mapIndex.push(new Square(this, 200 + 32 * o, 100 + 32 * i, map[auxCont]).setScale(2))
                this.mapPhysicsGrp.add(this.mapIndex[auxCont])
                auxCont++;
            }            
        }
        
        // player limits
        let limits = this.physics.add.staticGroup();
        limits.add(this.add.zone(200, 100, 32, 32 * 13).setOrigin(1,0));                        // left
        limits.add(this.add.zone(200 + 32 * 12, 100, 32, 32 * 13).setOrigin(0,0));              // right
        limits.add(this.add.zone(200, 100, 32 * 12, 32).setOrigin(0,1));                        // top
        limits.add(this.add.zone(200 + 32 * 12, 100 + 32 * 13, 32 * 12, 32).setOrigin(1,0));    // bottom

        this.player = new MrDo(this, 200 + 32 * 5, 100 + 32 * 12).setScale(2)
        this.player.body.setCircle(7, 1, 1)
        this.physics.add.existing(this.player)

        this.physics.add.collider(this.player, limits)
        this.physics.add.overlap(this.player, this.mapPhysicsGrp, (player, sqr) =>{
            sqr.squareAction(player)
        })

    }

    update(t, dt){


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