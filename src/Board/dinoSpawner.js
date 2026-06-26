const SPAWN_COOLDOWN = 3000

export default class DinoSpawner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, enemies){
        super(scene, x, y, 'dino_spawner')

        this.enemiesLeft = enemies
        this.timeElapsedSpawn = 0
    }

    preUpdate(t,dt){
        super.preUpdate(t, dt)
        this.timeElapsedSpawn += dt

        if(this.timeElapsedSpawn > SPAWN_COOLDOWN){
            this.spawnDino()
            this.timeElapsedSpawn = 0
        }
        
    }

    spawnDino(){
        this.scene.spawnDino(this.x, this.y);
        this.enemiesLeft--

        if(this.enemiesLeft <= 0){
            this.killSpawner()
        }
    }

    killSpawner(){
        this.scene.spawnBonus(this.x, this.y)
        this.destroy()
    }

}