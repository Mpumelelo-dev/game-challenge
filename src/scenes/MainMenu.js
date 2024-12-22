import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load assets for background and logo
        this.load.image('background', 'assets/background.png'); // Replace with your actual path
        this.load.image('logo', 'assets/logo.png'); // Replace with your actual path
    }

    create() {
        // Add a full-screen responsive background image
        const background = this.add.image(0, 0, 'background')
            .setOrigin(0, 0) // Align to top-left corner
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height); // Scale to fill the screen

        // Add a logo centered on the screen
        const logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'logo')
            .setOrigin(0.5, 0.5) // Center the logo
            .setScale(0.5); // Optional: Adjust the logo size as needed

        // Add a "Main Menu" text below the logo
        const menuText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Main Menu', {
            fontFamily: 'Arial Black',
            fontSize: '38px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5);

        // Add interactivity for starting the game
        this.input.once('pointerdown', () => {
            this.scene.start('Game'); // Replace 'Game' with your desired next scene
        });

        // Handle resizing
        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize) {
        const { width, height } = gameSize;

        // Adjust background to fit the new screen size
        const background = this.children.list.find(child => child.texture && child.texture.key === 'background');
        if (background) {
            background.setDisplaySize(width, height);
        }

        // Adjust logo and text positions
        const logo = this.children.list.find(child => child.texture && child.texture.key === 'logo');
        if (logo) {
            logo.setPosition(width / 2, height / 2 - 50);
        }

        const menuText = this.children.list.find(child => child instanceof Phaser.GameObjects.Text);
        if (menuText) {
            menuText.setPosition(width / 2, height / 2 + 100);
        }
    }
}
