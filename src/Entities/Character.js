export default class Character extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture, 0)
        this.setOrigin(0,0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)
    }
    
}