import Character from "./Character.js";

const PLAYER_SPEED = 80;
const SLOWED_RATIO = 0.7

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do');
            
        this.body.setCircle(5, 2.5, 2.5)
        this._speedRatio = 1
        this.setupKeys()

        // mr Do "shadow"
        this._shadow = new Phaser.GameObjects.Sprite(scene, x, y, 'mr_do_shadow').setScale(2).setDepth(1)
        this.scene.add.existing(this._shadow)
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
            this.setRotation(-90)
            this.setFlipX(false)
        })
        this.aKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
            this.setRotation(0)
            this.setFlipX(true)

        })
        this.sKey.on('down', () =>{
            this.setX(this.getClosestSquareCenterX());
            this.setRotation(-90)
            this.setFlipX(true)
        })
        this.dKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
            this.setRotation(0)
            this.setFlipX(false)
        })
    }

    manageInput(){
        let speed = PLAYER_SPEED * this._speedRatio

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
        else{ 
            this.body.setVelocity(0, 0)
        }

        if(this._shadow != null){
            this._shadow.setPosition(this.x, this.y)
        }

        this._speedRatio = 1
    }

    slowMrDo(){
        this._speedRatio = SLOWED_RATIO
    }

    throwBall(){

    }
}

