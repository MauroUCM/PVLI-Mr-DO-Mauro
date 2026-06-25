import Character from "./Character.js";

const PLAYER_SPEED = 80;
const SLOWED_RATIO = 0.7

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do', 4);
            
        this.body.setCircle(5, 2.5, 2.5)
        this._speedRatio = 1
        this.ball = true;
        this.setupKeys()

        this.OGPosition = { x: x, y: y };

        this.play('mrDoWalkBall')

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
            this.activateWalkAnim()
        })
        this.aKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
            this.setRotation(0)
            this.setFlipX(true)
            this.activateWalkAnim()
        })
        this.sKey.on('down', () =>{
            this.setX(this.getClosestSquareCenterX());
            this.setRotation(-90)
            this.setFlipX(true)
            this.activateWalkAnim()
        })
        this.dKey.on('down', () =>{
            this.setY(this.getClosestSquareCenterY())
            this.setRotation(0)
            this.setFlipX(false)
            this.activateWalkAnim()
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
            this.stop()
        }

        if(this._shadow != null){
            this._shadow.setPosition(this.x, this.y)
        }

        this._speedRatio = 1
    }

    activateWalkAnim(){
        if(this.ball){
            this.play('mrDoWalkBall')
        }
        else this.play('mrDoWalk')
    }

    slowMrDo(){
        this._speedRatio = SLOWED_RATIO
    }

    reload(){
        this.ball = true;
        this.play('mrDoWalkBall')
    }

    resetOGPosition(){
        this.setPosition(this.OGPosition.x, this.OGPosition.y)
    }

    throwBall(){
        if(this.ball){
            // Direcciones: NE = 0, SE = 1, SW = 2, NW = 3
            if(this.rotation == 0){
                if(this.flipX){
                    this.scene.spawnBall(this.x - 20, this.y, 2)
                }
                else this.scene.spawnBall(this.x + 20, this.y, 1)
            }
            else{
                if(this.flipX){
                    this.scene.spawnBall(this.x, this.y + 20, 1)
                }
                else this.scene.spawnBall(this.x , this.y - 20, 0)
            }

            this.ball = false
            this.play('mrDoWalk')
        }
    }
}

