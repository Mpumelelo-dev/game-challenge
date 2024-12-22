import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.audio('clickSound', 'assets/click.mp3');
    }

    create() {
        // Set the background
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setAlpha(0.9);

        // Add parallax effect to the background
        this.input.on('pointermove', (pointer) => {
            this.background.x = this.scale.width / 2 + (pointer.x - this.scale.width / 2) * 0.02;
            this.background.y = this.scale.height / 2 + (pointer.y - this.scale.height / 2) * 0.02;
        });

        // Title text
        this.titleText = this.add.text(
            this.scale.width / 2,
            this.scale.height * 0.12,
            'Hack-Tac-Toe\nRestore the Magical World!',
            {
                fontFamily: 'Comic Sans MS, sans-serif',
                fontSize: `${Math.max(this.scale.width * 0.04, 20)}px`,
                color: '#00d1ff',
                stroke: '#ffffff',
                strokeThickness: 6,
                align: 'center',
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: this.titleText,
            scale: { from: 1, to: 1.05 },
            yoyo: true,
            repeat: -1,
            duration: 1000,
            ease: 'Sine.easeInOut',
        });

        // Create instructions box
        this.createInstructionsBox();

        // Responsive "Start Game" button
        this.createStartButton();

        // Handle screen resizing
        this.scale.on('resize', this.resize, this);
    }

    createInstructionsBox() {
        const instructionsWidth = this.scale.width * 0.8; // Box is 80% of screen width
        const instructionsHeight = this.scale.height * 0.2; // Box is 20% of screen height
        const instructionsX = (this.scale.width - instructionsWidth) / 2;
        const instructionsY = this.scale.height * 0.7;

        // Create and style the instructions box
        if (!this.instructionsBox) {
            this.instructionsBox = this.add.graphics();
        }
        this.instructionsBox.clear();
        this.instructionsBox.fillStyle(0x0a0a0a, 0.8);
        this.instructionsBox.fillRoundedRect(instructionsX, instructionsY, instructionsWidth, instructionsHeight, 20);
        this.instructionsBox.lineStyle(3, 0x00d1ff);
        this.instructionsBox.strokeRoundedRect(instructionsX, instructionsY, instructionsWidth, instructionsHeight, 20);

        // Add or update the instructions text
        const fontSize = `${Math.max(this.scale.width * 0.018, 14)}px`;
        if (!this.instructionsText) {
            this.instructionsText = this.add.text(0, 0, '', {
                fontFamily: 'Arial, sans-serif',
                fontSize: fontSize,
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: instructionsWidth - 40 },
            }).setOrigin(0.5);
        }

        this.instructionsText.setText(
            `Hack-Tac-Toe is a game played on a 3x3 grid. A player takes turns to make a move. 
The first to align three blocks wins! Solve coding challenges to unlock your moves. 
Good luck and have fun!`
        );

        this.instructionsText.setFontSize(fontSize);
        this.instructionsText.setWordWrapWidth(instructionsWidth - 40);
        this.instructionsText.setPosition(this.scale.width / 2, instructionsY + instructionsHeight / 2);
    }

    createStartButton() {
        const buttonWidth = this.scale.width * 0.25; // 25% of the screen width
        const buttonHeight = this.scale.height * 0.1; // 10% of the screen height
        const buttonX = this.scale.width / 2;
        const buttonY = this.scale.height * 0.5;

        // Create the button background
        if (!this.startButtonBackground) {
            this.startButtonBackground = this.add.rectangle(
                buttonX,
                buttonY,
                buttonWidth,
                buttonHeight,
                0xff0000
            ).setOrigin(0.5).setInteractive();
        }
        this.startButtonBackground.setSize(buttonWidth, buttonHeight);
        this.startButtonBackground.setPosition(buttonX, buttonY);

        // Create or update the button text
        const fontSize = `${Math.max(this.scale.width * 0.03, 16)}px`; // Responsive font size
        if (!this.startButtonText) {
            this.startButtonText = this.add.text(
                buttonX,
                buttonY,
                'Start Game',
                {
                    fontFamily: 'Verdana, sans-serif',
                    fontSize: fontSize,
                    color: '#ffffff',
                    align: 'center',
                }
            ).setOrigin(0.5);
        }
        this.startButtonText.setFontSize(fontSize);
        this.startButtonText.setPosition(buttonX, buttonY);

        // Button interactivity
        this.startButtonBackground.on('pointerover', () => {
            this.startButtonBackground.setFillStyle(0xff6666); // Lighter red
            this.startButtonText.setStyle({ color: '#000000' }); // Black text
        });

        this.startButtonBackground.on('pointerout', () => {
            this.startButtonBackground.setFillStyle(0xff0000); // Original red
            this.startButtonText.setStyle({ color: '#ffffff' }); // White text
        });

        this.startButtonBackground.on('pointerdown', () => {
            // Play sound at 50% volume
            this.sound.play('clickSound', { volume: 0.2 });
            this.scene.start('EndGame'); // Change to 'EndGame' scene
        });
    }

    resize(gameSize) {
        const { width, height } = gameSize;

        // Resize the background
        this.background.setDisplaySize(width, height);
        this.background.setPosition(width / 2, height / 2);

        // Reposition the title
        this.titleText.setPosition(width / 2, height * 0.12);
        this.titleText.setStyle({ fontSize: `${Math.max(width * 0.04, 20)}px` });

        // Recreate instructions box
        this.createInstructionsBox();

        // Recreate the "Start Game" button
        this.createStartButton();
    }
}
