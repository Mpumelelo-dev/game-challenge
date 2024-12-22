import { Scene } from 'phaser';

export class EndGame extends Scene {
    constructor() {
        super('EndGame');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.audio('clickSound', 'assets/click.mp3');
    }

    create() {
        // Set the background with parallax effect
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setAlpha(0.8);

        this.input.on('pointermove', (pointer) => {
            this.background.x = this.scale.width / 2 + (pointer.x - this.scale.width / 2) * 0.02;
            this.background.y = this.scale.height / 2 + (pointer.y - this.scale.height / 2) * 0.02;
        });

        // Title text with responsive font size
        this.titleText = this.add.text(
            this.scale.width / 2,
            this.scale.height * 0.12,
            '\nChoose Your Difficulty!',
            {
                fontFamily: 'Comic Sans MS, sans-serif',
                fontSize: `${Math.max(this.scale.width * 0.05, 28)}px`,
                color: '#ff6347',
                stroke: '#ffffff',
                strokeThickness: 6,
                align: 'center',
            }
        ).setOrigin(0.5);

        // Title animation (scaling effect)
        this.tweens.add({
            targets: this.titleText,
            scale: { from: 1, to: 1.1 },
            yoyo: true,
            repeat: -1,
            duration: 1000,
            ease: 'Sine.easeInOut',
        });

        // Create difficulty level buttons horizontally
        this.createDifficultyButtons();

        // Handle screen resizing
        this.scale.on('resize', this.resize, this);
    }

    createDifficultyButtons() {
        const buttonWidth = this.scale.width * 0.25; // Button width as 25% of screen width
        const buttonHeight = this.scale.height * 0.1; // Button height as 10% of screen height
        const buttonY = this.scale.height * 0.45; // Y position for buttons
        const horizontalSpacing = this.scale.width * 0.05; // Space between buttons (5% of screen width)
        
        // Calculate positions for the buttons to be horizontally aligned
        const buttonXStart = this.scale.width / 2 - (buttonWidth + horizontalSpacing) * 1; // Starting point for the first button
        const buttonXMiddle = this.scale.width / 2; // Middle button position
        const buttonXEnd = this.scale.width / 2 + (buttonWidth + horizontalSpacing) * 1; // Ending point for the third button

        // Create the Beginner button
        this.createDifficultyButton('Beginner', buttonWidth, buttonHeight, buttonXStart, buttonY, 'Variables');

        // Create the Intermediate button
        this.createDifficultyButton('Intermediate', buttonWidth, buttonHeight, buttonXMiddle, buttonY, 'Arrays');

        // Create the Advanced button
       this.createDifficultyButton('Advanced', buttonWidth, buttonHeight, buttonXEnd, buttonY, 'Loops');
    }

    createDifficultyButton(label, buttonWidth, buttonHeight, buttonX, buttonY, sceneKey) {
        // Create the button background
        const buttonBackground = this.add.rectangle(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            0x4285f4
        ).setOrigin(0.5).setInteractive();

        // Create the button text with responsive font size
        const fontSize = `${Math.max(this.scale.width * 0.03, 16)}px`;
        const buttonText = this.add.text(
            buttonX,
            buttonY,
            label,
            {
                fontFamily: 'Verdana, sans-serif',
                fontSize: fontSize,
                color: '#ffffff',
                align: 'center',
            }
        ).setOrigin(0.5);

        // Button hover and click effects
        buttonBackground.on('pointerover', () => {
            buttonBackground.setFillStyle(0x64b5f6); // Lighter blue
            buttonText.setStyle({ color: '#000000' }); // Black text
        });

        buttonBackground.on('pointerout', () => {
            buttonBackground.setFillStyle(0x4285f4); // Original blue
            buttonText.setStyle({ color: '#ffffff' }); // White text
        });

        buttonBackground.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.scene.start(sceneKey); // Start the corresponding scene based on the button
        });
    }

    resize(gameSize) {
        const { width, height } = gameSize;

        // Resize the background to fit the new screen size
        this.background.setDisplaySize(width, height);
        this.background.setPosition(width / 2, height / 2);

        // Reposition and resize the title text
        this.titleText.setPosition(width / 2, height * 0.12);
        this.titleText.setStyle({ fontSize: `${Math.max(width * 0.05, 28)}px` });

        // Recreate difficulty buttons to adjust positioning and size
        this.createDifficultyButtons();
    }
}
