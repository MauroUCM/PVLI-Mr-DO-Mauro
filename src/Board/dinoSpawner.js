export default class Dino extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, enemies){
        super(scene, x, y, 'dino_spawner')

        this.enemies = enemies
    }

    preUpdate(t,dt){
        super.preUpdate(t, dt)

        
    }

}