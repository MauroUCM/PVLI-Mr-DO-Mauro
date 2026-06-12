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
		this.load.spritesheet('dead_mr_do', 'assets/characters/dead_mr_do_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('dino', 'assets/characters/dino_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('dead_dino', 'assets/characters/dead_dino_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('muncher', 'assets/characters/muncher_spritesheet.png', {frameWidth: 16, frameHeight: 16});
		this.load.spritesheet('alphamonster', 'assets/characters/alphamonster_spritesheet.png', {frameWidth: 16, frameHeight: 14});
		this.load.image('mr_do_shadow', 'assets/characters/mr_do_shadow.png');
		this.load.image('ball', 'assets/characters/ball.png');

		// escenery
		this.load.spritesheet('full_apple', 'assets/scenery/full_apple_spritesheet.png', {frameWidth: 16, frameHeight: 15});
		this.load.spritesheet('broken_apple', 'assets/scenery/broken_apple_spritesheet.png', {frameWidth: 16, frameHeight: 15});
		this.load.spritesheet('diamond', 'assets/scenery/diamond_spritesheet.png', {frameWidth: 16, frameHeight: 9});
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
		this.anims.create({
			key: 'mrDoWalk',
			frames: this.anims.generateFrameNumbers('mr_do', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});

		this.anims.create({
			key: 'mrDoWalkBall',
			frames: this.anims.generateFrameNumbers('mr_do', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
	}

	// Animaciones de la Rata
	createCreepAnimations(){

	}
}