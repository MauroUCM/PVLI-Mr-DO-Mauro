import Character from "./Character.js";

export default class Dino extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'dino')
        this.speed = 70;
         

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

        
    }

    relocateToCenter(){
        this.x = this.getClosestSquareCenterX()
        this.y = this.getClosestSquareCenterY()
    }

    die(type){

        
        super.die(type)
    }
}