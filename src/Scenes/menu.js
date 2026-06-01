const timeBetwActivation = 500


export default class Menu extends Phaser.Scene {
	constructor(){
		super({ key: 'menu' });
	}

    init(){
        this.sinceLastActivation = 0;
        this.blinkSpace = true;
    }

    preload(){
        
    }

    create(){
        // titulo
        this.scrollPattern = this.add.tileSprite(this.game.config.width/2, 160, 156, 53, 'scroll_pattern')
            .setOrigin(0.5)
            .setScrollFactor(0, 1)
            .setScale(3);
        this.add.image(this.game.config.width/2, 160, 'title').setOrigin(0.5, 0.5).setScale(3);
        
        // textos
        this.pressSpace = this.drawText(this.game.config.width / 2, this.game.config.height * 0.7,  'Press space to start!', 20)
        this.newGameButton = this.drawText(this.game.config.width / 2, this.game.config.height * 0.75,  'New Game', 20).setVisible(false)
        this.continueButton = this.drawText(this.game.config.width / 2, this.game.config.height * 0.65,  'Continue', 20).setVisible(false)

        // keys
        this.spaceKey = this.input.keyboard.addKey("space")
        this.spaceKey.on('down', ()=>{
            //cambiar escena
            this.blinkSpace = false
            this.pressSpace.setVisible(false)
            this.newGameButton.setVisible(true)
            this.continueButton.setVisible(true)
        })
    }

    update(t, dt){
        if(this.blinkSpace){
            if(this.sinceLastActivation >= timeBetwActivation){
                this.pressSpace.setVisible(!this.pressSpace.visible)
                this.sinceLastActivation = 0
            }
            else this.sinceLastActivation += dt
        }
        this.scrollPattern.setTilePosition(this.scrollPattern.tilePositionX - 0.5);

    }

    drawText(x, y, text, size){
        return this.add.text(x, y,  text, {
            fontFamily: 'arcade' , color: '#ffffff', fontSize: size
        }).setOrigin(0.5, 0)
    }
}