export default class End extends Phaser.Scene {
	/**
	 * Constructor de la escena
	 */
	constructor() {
		super({ key: 'end' });
	}

	// Carga de recursos
	init(data){
        this.level = data.level
        this.score = data.score
        this.lives = data.lives
        this.victory = data.victory
	}

	// Creación de la escena.
	create() {

        if(this.victory){
            this.drawText(this.game.config.width / 2, this.game.config.height * 0.3,  'Level ' + this.level + ' beaten!', 20).setAlign('center')
            this.drawText(this.game.config.width / 2, this.game.config.height * 0.5,  'Score: ' + this.score, 20).setAlign('center')
            this.drawText(this.game.config.width / 2, this.game.config.height * 0.6,  'Lives: ' + this.lives, 20).setAlign('center')

        this.input.keyboard.addKey("space").on('down', ()=>{
            this.scene.start('level', {
                    level: this.level + 1,
                    score: this.score,
                    lives: this.lives
                })
            })
        }
        else{
            this.drawText(this.game.config.width / 2, this.game.config.height * 0.3,  'You died in level ' + this.level + '!', 20).setAlign('center')
            this.drawText(this.game.config.width / 2, this.game.config.height * 0.5,  'Score: ' + this.score, 20).setAlign('center')
            
            this.input.keyboard.addKey("space").on('down', ()=>{
                this.scene.start('menu')
            })
        }


    }

    drawText(x, y, text, size){
        return this.add.text(x, y,  text, {
            fontFamily: 'arcade' , color: '#ffffff', fontSize: size
        }).setOrigin(0.5, 0.5)
    }
}