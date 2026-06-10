export default class Apple extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'full_apple', 0)

        this.setScale(1.9)
        this.scene.add.existing(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

        this.body.setVelocity(0)
    }
}
