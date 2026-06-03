export default class Boot extends Phaser.Scene {
	/**
	 * Constructor de la escena
	 */
	constructor() {
		super({ key: 'boot' });
	}

	// Carga de recursos
	preload(){
		this.load.image('title', 'assets/UI/mainTitle.png');
		this.load.image('scroll_pattern', 'assets/UI/titleScrollPattern.png');
		this.load.image('single_mr_do', 'assets/UI/mrDoSingleSprite.png');

		this.load.spritesheet('mr_do', 'assets/characters/mr_do_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		//this.load.spritesheet('mr_do', 'assets/characters/mr_do_spritesheet.png', {frameWidth: 16, frameHeight: 16});
	}

	// Creación de la escena.
	create() {
		this.createPenguinAnimations()
		this.createRatAnimations()
		this.scene.start('menu');
	}

	// Animaciones del Pingüino
	createPenguinAnimations(){

	}

	// Animaciones de la Rata
	createRatAnimations(){

	}
}