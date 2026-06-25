import Character from "./Character.js";

const DINO_SPEED = 80;

export default class Dino extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'dino')
        this.speed = DINO_SPEED;
         

        this.play('dinoWalk')
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
        this.body.setVelocity(0, this.speed)

    }

    relocateToCenter(){
        this.x = this.getClosestSquareCenterX()
        this.y = this.getClosestSquareCenterY()
    }

    move(){


    }

    die(type){
        super.die(type)
    }
}