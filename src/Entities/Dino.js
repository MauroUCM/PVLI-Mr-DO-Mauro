import Character from "./Character.js";

const DINO_SPEED = 75;

export default class Dino extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'dino')
        this.speed = DINO_SPEED;
         

        this.currentDirection = 0
        this.move(0)
        this.play('dinoWalk')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
        this.move(this.currentDirection)
    }

    relocateToCenter(){
        this.x = this.getClosestSquareCenterX()
        this.y = this.getClosestSquareCenterY()
    }

    move(){
        switch(this.currentDirection){
            case 0: // arriba
                this.body.setVelocity(0, -this.speed)
            break;
            case 1: // derecha
                this.body.setVelocity(this.speed, 0)
            break;
            case 2: // abajo
                this.body.setVelocity(0, this.speed)
            break;
            case 3: // izquierda
                this.body.setVelocity(-this.speed, 0)
            break;
        }

    }

    changeDirection(newDir){
        this.currentDirection= newDir
    }

    die(type){
        super.die(type)
    }
}