import Boot from "./Scenes/boot.js";
import Menu from "./Scenes/menu.js"

let config = {
	type: Phaser.AUTO,
	pixelArt: true,
	width: 800,
	height: 600,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
			width: 800,
			height: 600
		},
		max: {
			width: 1200,
			height: 1000
		},
		zoom: 1
	},
	scene: [Boot, Menu],
	physics: { 
		default: 'arcade', 
		arcade: { 
			gravity: { y: 0 }, 
			debug: true 
		},
		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}
	},
	title: "Mr. Do!",
	version: "1.0.0.",
	transparent: false
};

new Phaser.Game(config);