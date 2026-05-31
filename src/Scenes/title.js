const timeBetwActivation = 500


export default class Title extends Phaser.Scene {
	constructor(){
		super({ key: 'title' });
	}

    init(){
        this.sinceLastActivation = 0;
        this.blinkSpace = true;
    }

    preload(){

    }

    create(){
        this.scrollPattern = this.add.image(this.game.config.width/2, 160, 'scroll_pattern').setOrigin(0.5, 0.5).setScale(2.7, 3);
        this.add.image(this.game.config.width/2, 160, 'title').setOrigin(0.5, 0.5).setScale(3);
        this.pressSpace = this.drawText(this.game.config.width / 2, this.game.config.height * 0.7,  'Press space to start!', 20)

        this.spaceKey = this.input.keyboard.addKey("space")
        this.spaceKey.on('down', ()=>{
            //cambiar escena
            this.blinkSpace = false
            this.pressSpace.setVisible(false)
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
    }

    drawText(x, y, text, size){
        return this.add.text(x, y,  text, {
            fontFamily: 'arcade' , color: '#ffffff', fontSize: size
        }).setOrigin(0.5, 0)

    }
}