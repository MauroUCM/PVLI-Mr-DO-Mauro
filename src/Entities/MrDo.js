import Character from "./Character.js";

export default class MrDo extends Character{
    constructor(scene, x, y){
        super(scene, x, y, 'mr_do');

        this.aKey = this.scene.input.keyboard.addKey("a")
        this.dKey = this.scene.input.keyboard.addKey("d")
        this.spaceKey = this.scene.input.keyboard.addKey("space")
            
    }



}

