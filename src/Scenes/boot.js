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
		
		// this.load.spritesheet('penguin', 'assets/penguin40.png', {frameWidth: 40, frameHeight: 40});
		// this.load.spritesheet('rat', 'assets/rat32.png', {frameWidth: 32, frameHeight: 32});
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