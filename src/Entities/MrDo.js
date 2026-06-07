import Character from "./Character.js";

const PLAYER_SPEED = 100;

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do');
            
        this.setupKeys()
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
        if(this.wKey.isDown){   // up
            this.body.setVelocity(0, -PLAYER_SPEED)
        }
        else if (this.sKey.isDown){ // down
            this.body.setVelocity(0, PLAYER_SPEED)
        }
        else if (this.aKey.isDown){ // left
            this.body.setVelocity(-PLAYER_SPEED, 0)
        }
        else if (this.dKey.isDown){ // right
            this.body.setVelocity(PLAYER_SPEED, 0)
        }
        else this.body.setVelocity(0, 0)
    }

    throwBall(){

    }
}

