export default class Character extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture, 0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }

    getClosestSquareCenterX(){
        let aux = Math.round((this.x - 216) / 32)
        return (aux * 32 + 216)
    }

    getClosestSquareCenterY(){
        let aux = Math.round((this.y - 116) / 32)
        return (aux * 32 + 116)
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
    }
    
}