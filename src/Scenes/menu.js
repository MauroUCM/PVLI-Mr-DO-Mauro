const timeBetwActivation = 500

export default class Menu extends Phaser.Scene {
	constructor(){
		super({ key: 'menu' });
	}

    init(){
        this.sinceLastActivation = 0;
        this.blinkSpaceState = true;
        this.menuState = 0;
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
        this.mrDoPointer = this.add.image(this.game.config.width / 2.8, this.game.config.height * 0.65, 'single_mr_do').setOrigin(0.5, 0.5).setScale(3).setVisible(false)

        // keys
        this.setUpKeys()
    }

    update(t, dt){
        if(this.menuState == 0){
            if(this.sinceLastActivation >= timeBetwActivation){
                this.pressSpace.setVisible(!this.pressSpace.visible)
                this.sinceLastActivation = 0
            }
            else this.sinceLastActivation += dt
        }
        this.scrollPattern.setTilePosition(this.scrollPattern.tilePositionX - 0.5);

    }

    setUpKeys(){
        this.spaceKey = this.input.keyboard.addKey("space")
        this.spaceKey.on('down', ()=>{
            if(this.menuState == 0){
            //cambiar escena
            this.menuState = 1
            this.pressSpace.setVisible(false)
            this.newGameButton.setVisible(true)
            this.continueButton.setVisible(true)
            this.mrDoPointer.setVisible(true)
            }
            else if (this.menuState == 1){
                this.chooseSelectedOption()
            }
        })

        this.upKey = this.input.keyboard.addKey("up")
        this.upKey.on('down', ()=>{
            if(this.menuState > 1){
                this.menuState = this.menuState - 1
                this.updateMrDo()
            }
        })

        this.downkey = this.input.keyboard.addKey("down")
        this.downkey.on('down', ()=>{
            if(this.menuState < 2){
                this.menuState = this.menuState + 1
                this.updateMrDo()
            }
        })
    }

    updateMrDo(){
        switch(this.menuState){
            case 1:
                this.mrDoPointer.setPosition(this.continueButton.x - 120, this.continueButton.y)
                break;
            case 2:
                this.mrDoPointer.setPosition(this.newGameButton.x - 120, this.newGameButton.y)
                break;
            default:
                console.log("ERROR: Unexpected menu state when updating Mr Do")
                break;
        }
    }

    chooseSelectedOption(){
        switch(this.menuState){
            case 1:
                console.log("Continue")
                break;
            case 2:
                console.log("New game")
                break;
            default:
                console.log("ERROR: Unexpected menu state when selecting")
                break;
        }
    }

    drawText(x, y, text, size){
        return this.add.text(x, y,  text, {
            fontFamily: 'arcade' , color: '#ffffff', fontSize: size
        }).setOrigin(0.5, 0)
    }
}