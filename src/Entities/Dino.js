import Character from "./Character.js";

const DINO_SPEED = 80;

export default class Dino extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'dino')
        this.speed = DINO_SPEED;
         
        this.currentDirection = 0
        this.setDinoVel(0)
        this.play('dinoWalk')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
        this.body.setVelocity(0, -this.speed)

        Math.floor(Math.random() * 4)
    }

    relocateToCenter(){
        this.x = this.getClosestSquareCenterX()
        this.y = this.getClosestSquareCenterY()
    }

    setDinoVel(direc){
        switch(direc){
            case 0: // arriba
                this.body.setVelocity(0, -this.speed)
                this.currentDirection = 0
            break;
            case 1: // derecha
                this.body.setVelocity(this.speed, 0)
                this.currentDirection = 1
            break;
            case 2: // abajo
                this.body.setVelocity(0, this.speed)
                this.currentDirection = 2
            break;
            case 3: // izquierda
                this.body.setVelocity(-this.speed, 0)
                this.currentDirection = 3
            break;
        }

    }

    die(type){
        super.die(type)
    }
}