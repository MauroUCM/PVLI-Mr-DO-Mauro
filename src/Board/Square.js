export default class Square extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){
        switch(type){
            case 0:
                super(scene, x, y, 'ground', 17)
                break;
            case 1:
                super(scene, x, y, 'ground', 15)
                break;
            case 2:
                super(scene, x, y, 'ground', 15)
                break;
            case 3:
                super(scene, x, y, 'ground', 16)
                break;
        }


        this.setOrigin(0,0)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt)

    }

}