import Character from "./Character.js";

const PLAYER_SPEED = 100;
const SLOWED_RATIO = 0.7

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do');
            
        this.body.setCircle(5, 2.5, 2.5)
        this.speedRatio = 1

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

        this.wKey.on('down', () =>{
            this.setX(this.getClosestSquareCenterX());
        })
        this.aKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
        })
        this.sKey.on('down', () =>{
            this.setX(this.getClosestSquareCenterX());
        })
        this.dKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
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
        this.speedRatio = SLOWED_RATIO
    }

    throwBall(){

    }
}

