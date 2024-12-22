import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // Add the background image and stretch it to cover the entire screen
        this.background = this.add.image(0, 0, 'background')
       
           

        // Add a progress bar to show loading progress
        const barWidth = this.cameras.main.width * 0.8;  // 80% of the screen width
        const barHeight = 32;
        this.add.rectangle(this.cameras.main.width / 2, this.cameras.main.height / 2, barWidth, barHeight)
            .setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(this.cameras.main.width / 2 - barWidth / 2, this.cameras.main.height / 2, 4, 28, 0xffffff);
        this.load.on('progress', (progress) => {
            bar.width = barWidth * progress; // Update progress bar width based on progress
        });
    }

    preload() {
        // Load the assets (background image, logo, etc.)
        this.load.setPath('assets');
        this.load.image('background', 'bg.png'); // Make sure this path is correct
        this.load.image('logo', 'logo.png');
    }

    create() {
        // Start the MainMenu scene after preload is complete
        this.scene.start('MainMenu');
    }
}
