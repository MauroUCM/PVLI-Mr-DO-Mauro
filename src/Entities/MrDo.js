import Character from "./Character.js";

const PLAYER_SPEED = 100;
const LOW_RATIO = 0.8

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do');
            
        this.setupKeys()
        this.speedRatio = 1
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

        this.manageInput()
    }

    setupKeys(){
        this.wKey = this.scene.input.keyboard.addKey("w")
        this.aKey = this.scene.input.keyboard.addKey("a")
        this.sKey = this.scene.input.keyboard.addKey("s")
        this.dKey = this.scene.input.keyboard.addKey("d")
        this.spaceKey = this.scene.input.keyboard.addKey("space")

        this.spaceKey.on('down', ()=>{
            this.throwBall()
        })
    }

    manageInput(){
        let speed = PLAYER_SPEED * this.speedRatio

        if(this.wKey.isDown){   // up
            this.body.setVelocity(0, -speed)
        }
        else if (this.sKey.isDown){ // down
            this.body.setVelocity(0, speed)
        }
        else if (this.aKey.isDown){ // left
            this.body.setVelocity(-speed, 0)
        }
        else if (this.dKey.isDown){ // right
            this.body.setVelocity(speed, 0)
        }
        else this.body.setVelocity(0, 0)

        this.speedRatio = 1
    }

    slowMrDo(){
        this.speedRatio = LOW_RATIO
    }

    throwBall(){

    }
}

