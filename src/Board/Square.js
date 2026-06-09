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
                scene.spawnApple(x, y)
                this.squareType = 1;
            break;
            case 3: // cereza
                super(scene, x, y, 'ground', 16 + textOffset)
                this.squareType = type
            break;
            default:
            break;
        }

        this.textOffset = textOffset
        this.scene.add.existing(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

    }

    squareAction(player){
        switch(this.squareType){
            case 1: // tierra
                player.slowMrDo()
                if(Math.abs(player.x - this.x) < 5 && Math.abs(player.y - this.y) < 5){
                    this.emptySquare()
                }
            break;
            case 3: // cereza
                if(Math.abs(player.x - this.x) < 5 && Math.abs(player.y - this.y) < 5){
                    this.emptySquare()
                    this.scene.addScore(200)
                }
            break;
            default:
                console.log("nada")
            break;
        }
    }

    emptySquare(){
        this.setFrame(17 + this.textOffset)
        this.squareType = 0
    }
}