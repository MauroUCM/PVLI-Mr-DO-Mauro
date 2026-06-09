export default class Square extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type, level){
        let textOffset = level * 18
        switch(type){
            case 0: // vacio
                super(scene, x, y, 'ground', 17 + textOffset)
                this.squareType = type
            break;
            case 1: // tierra
                super(scene, x, y, 'ground', 15 + textOffset)
                this.squareType = type
            break;
            case 2: // manzana
                super(scene, x, y, 'ground', 15 + textOffset)
                this.squareType = 1;
            break;
            case 3: // cereza
                super(scene, x, y, 'ground', 16 + textOffset)
                this.squareType = type
            break;
            default:
            break;
        }


        this.setOrigin(0,0)
        this.scene.add.existing(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

    }

    squareAction(player){
        switch(this.squareType){
            case 1: // tierra
                player.slowMrDo()
                console.log("tierra")
            break;
            case 2: // manzana
                console.log("manzana")
            break;
            case 3: // cereza
                console.log("cereza")
            break;
            default:
                console.log("nada")
            break;
        }
    }

}