import Square from "../Board/Square.js";

export default class Level extends Phaser.Scene {
	constructor(){
		super({ key: 'level' });



	}

    init(data){

    }

    preload(){

    }

    create(){
        this.loadMap();

        let auxCont = 0;
        for(let i = 0; i < 13; i++){
            for(let o = 0; o < 12; o++){
                this.physics.add.existing(new Square(this, 200 + 32 * o, 100 + 32 * i, this.currentMap[auxCont]).setScale(2))
                auxCont++;
            }

            
        }
    }

    update(t, dt){


    }

    // 0 = vacio, 1 = tierra, 2 = manzana, 3 = cereza
    loadMap(){
        this.currentMap = [
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