export default class Boot extends Phaser.Scene {
	/**
	 * Constructor de la escena
	 */
	constructor() {
		super({ key: 'boot' });
	}

	// Carga de recursos
	preload(){
		// menu
		this.load.image('title', 'assets/UI/main_title.png');
		this.load.image('scroll_pattern', 'assets/UI/title_scroll_pattern.png');
		this.load.image('single_mr_do', 'assets/UI/mr_Do_single_sprite.png');

		// characters
		this.load.spritesheet('mr_do', 'assets/characters/mr_do_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('creep', 'assets/characters/creep_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('muncher', 'assets/characters/muncher_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('alphamonster', 'assets/characters/alphamonster_spritesheet.png', {frameWidth: 16, frameHeight: 14});

		// escenery
		this.load.spritesheet('full_apple', 'assets/characters/full_apple_spritesheet.png', {frameWidth: 16, frameHeight: 15});
		this.load.spritesheet('broken_apple', 'assets/characters/broken_apple_spritesheet.png', {frameWidth: 16, frameHeight: 15});
		this.load.spritesheet('diamond', 'assets/characters/diamond_spritesheet.png', {frameWidth: 16, frameHeight: 9});
		this.load.spritesheet('ground', 'assets/scenery/ground.png', {frameWidth: 16, frameHeight: 16});
	}

	// Creación de la escena.
	create() {
		this.createMrDoAnimations()
		this.createCreepAnimations()
<		this.scene.start('menu')
	}

	// Animaciones del Pingüino
	createMrDoAnimations(){

	}

	// Animaciones de la Rata
	createCreepAnimations(){

	}
}