import { Scene } from 'phaser';

export class Functions extends Scene {
    constructor() {
        super('Functions');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.audio('winSound', 'assets/win.mp3');
    }

    create() {
        const background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setDisplaySize(this.scale.width, this.scale.height);

        const title = this.add.text(
            this.scale.width / 2,
            100,
            'Functions Challenge!',
            {
                fontFamily: 'Comic Sans MS, sans-serif',
                fontSize: 36,
                color: '#00d1ff',
                stroke: '#ffffff',
                strokeThickness: 6,
                align: 'center',
            }
        ).setOrigin(0.5);

        const instructions = this.add.text(
            this.scale.width / 2,
            200,
            'Solve this coding challenge about functions to place your mark!',
            {
                fontFamily: 'Arial, sans-serif',
                fontSize: 22,
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: this.scale.width * 0.8 },
            }
        ).setOrigin(0.5);

        // Simulate challenge completion
        const completeButton = this.createButton(
            this.scale.width / 2,
            this.scale.height / 2,
            'Complete Challenge',
            '#00d1ff',
            '#ffffff'
        );

        completeButton.on('pointerdown', () => {
            this.sound.play('winSound');
            this.scene.start('EndGame'); // Transition to the end game scene
        });
    }

    createButton(x, y, text, bgColor, textColor) {
        const button = this.add.text(x, y, text, {
            fontFamily: 'Verdana, sans-serif',
            fontSize: 28,
            backgroundColor: bgColor,
            color: textColor,
            padding: { x: 15, y: 8 },
            align: 'center',
        }).setOrigin(0.5).setInteractive();

        button.on('pointerover', () => {
            button.setStyle({ backgroundColor: '#00ffcc', color: '#000000' });
        });

        button.on('pointerout', () => {
            button.setStyle({ backgroundColor: bgColor, color: textColor });
        });

        return button;
    }
}
