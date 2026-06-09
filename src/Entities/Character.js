export default class Character extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture, 0)
        this.setOrigin(0,0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }

    getClosestSquareCenterX(){
        let aux = Math.round((this.x - 200) / 32)
        return (aux * 32 + 200)
    }

    getClosestSquareCenterY(){
        let aux = Math.round((this.y - 100) / 32)
        return (aux * 32 + 100)
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
    }
    
}