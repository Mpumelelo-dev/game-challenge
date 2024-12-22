import Phaser from 'phaser';

export class Variables extends Phaser.Scene {
    constructor() {
        super('Variables');
        this.challenges = []; // Initially empty
        // Python beginner challenges dataset
        this.challenges = [
            {
                question: "What is the output of `print(type(42))` in Python?",
                options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'list'>"],
                answer: "<class 'int'>",
                hints: {
                    "<class 'int'>": "Correct! The number 42 is an integer, which means it has the 'int' type.",
                    "<class 'float'>": "Hint: A float is a number with a decimal point. 42 doesn't have a decimal.",
                    "<class 'str'>": "Hint: A string is for text, but 42 is a number, not text.",
                    "<class 'list'>": "Hint: A list is a collection, but 42 is just a single number, not a collection.",
                }
            },
            {
                question: "What does the `len()` function do in Python?",
                options: [
                    "Returns the size of a data type",
                    "Returns the length of an object",
                    "Calculates the sum of elements in a list",
                    "None of the above",
                ],
                answer: "Returns the length of an object",
                hints: {
                    "Returns the size of a data type": "Hint: `len()` works with the number of elements, not the size of the data type.",
                    "Returns the length of an object": "Correct! `len()` returns the number of elements in an object, like a list or string.",
                    "Calculates the sum of elements in a list": "Hint: `len()` doesn't sum elements. For that, you'd use `sum()`.",
                    "None of the above": "Hint: One of the options is correct. Review the purpose of `len()`.",
                }
            },
            {
                question: "What is the correct way to define a function in Python?",
                options: [
                    "function myFunc():",
                    "def myFunc():",
                    "fun myFunc():",
                    "define myFunc():",
                ],
                answer: "def myFunc():",
                hints: {
                    "function myFunc():": "Hint: In Python, functions are defined using the `def` keyword, not `function`.",
                    "def myFunc():": "Correct! Functions are defined with the `def` keyword in Python.",
                    "fun myFunc():": "Hint: `fun` is not a valid keyword in Python for defining functions.",
                    "define myFunc():": "Hint: The keyword is `def`, not `define`.",
                }
            },
            {
                question: "Which of these is a mutable data type in Python?",
                options: ["tuple", "string", "list", "int"],
                answer: "list",
                hints: {
                    "tuple": "Hint: Tuples are immutable, meaning they can't be changed once created.",
                    "string": "Hint: Strings are immutable in Python, meaning you can't modify them directly.",
                    "list": "Correct! Lists are mutable, meaning their content can be changed.",
                    "int": "Hint: Integers are immutable in Python; once set, their value cannot be changed directly.",
                }
            },
            {
                question: "What is the output of `print(3 ** 2)`?",
                options: ["6", "9", "8", "None of the above"],
                answer: "9",
                hints: {
                    "6": "Hint: `3 ** 2` means '3 raised to the power of 2', which is 9, not 6.",
                    "9": "Correct! `3 ** 2` equals 9, as it's 3 squared.",
                    "8": "Hint: 8 is not the result of `3 ** 2`. Try squaring 3 again.",
                    "None of the above": "Hint: One of the other answers is correct. Review the calculation.",
                }
            },
        ];
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.audio('clickSound', 'assets/click.mp3');
        this.load.audio('correctSound', 'assets/answer.mp3');
        this.load.audio('wrongSound', 'assets/wrong.mp3');
        this.load.audio('winSound', 'assets/answer.mp3');
        this.load.audio('lossSound', 'assets/loss.mp3');
    }

    create() {
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background').setAlpha(0.7);
        const bubble = this.add.graphics();
        bubble.fillStyle(0x99d8e6, 0.8);
        bubble.fillRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        bubble.lineStyle(5, 0xffffff, 1);
        bubble.strokeRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        this.add.text(this.scale.width / 2, 90, '<Hack/> Tac-Toe: Beginner Challenge', {
            fontFamily: 'Roboto, sans-serif',
            fontSize: Math.min(28, this.scale.width / 20),
            color: '#1c1e21',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.createSymbolSelection();
    }

    createSymbolSelection() {
        const instructionText = this.add.text(
            this.scale.width / 2, 200,
            'Choose Your Color:', {
                fontFamily: 'Roboto, sans-serif',
                fontSize: 28,
                color: '#000',
                fontStyle: 'italic',
                align: 'center',
                backgroundColor: "#fff",
            }
        ).setOrigin(0.5);

        const buttonRadius = Math.min(80, this.scale.width / 8);
        const blueCircle = this.add.circle(this.scale.width / 2 - 100, 300, buttonRadius, 0x4285f4).setInteractive({ useHandCursor: true });
        const orangeCircle = this.add.circle(this.scale.width / 2 + 100, 300, buttonRadius, 0xf57c00).setInteractive({ useHandCursor: true });

        blueCircle.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.symbolChosen('Blue', instructionText, blueCircle, orangeCircle);
        });

        orangeCircle.on('pointerdown', () => {
            this.sound.play('clickSound');
            this.symbolChosen('Orange', instructionText, blueCircle, orangeCircle);
        });
    }

    symbolChosen(symbol, instructionText, blueCircle, orangeCircle) {
        this.playerSymbol = symbol === 'Blue' ? 'Blue' : 'Orange';
        this.computerSymbol = symbol === 'Blue' ? 'Orange' : 'Blue';
        blueCircle.destroy();
        orangeCircle.destroy();
        instructionText.destroy();

        const symbolChosenText = this.add.text(
            this.scale.width / 2, 300,
            `You chose: ${this.playerSymbol}`,
            {
                fontFamily: 'Roboto, sans-serif',
                fontSize: 28,
                color: '#1c1e21',
                fontStyle: 'bold',
                backgroundColor: "#fff",
            }
        ).setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            symbolChosenText.destroy();
            this.startGame();
        });
    }

    startGame() {
        const gridSize = 3;
        const cellSize = Math.min(this.scale.width / 5, this.scale.height / 5);
        const offsetX = (this.scale.width - cellSize * gridSize) / 2;
        const offsetY = (this.scale.height - cellSize * gridSize) / 2;

        this.board = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = offsetX + col * cellSize;
                const y = offsetY + row * cellSize;

                const cell = this.add.rectangle(x, y, cellSize - 10, cellSize - 10, 0xe0e0e0)
                    .setOrigin(0)
                    .setInteractive({ useHandCursor: true });

                cell.on('pointerdown', () => {
                    if (!cell.filled && this.currentPlayer === 'player') {
                        this.handlePlayerMove(cell, row, col);
                    }
                });

                cell.filled = false;
                cell.symbol = null;
            }
        }
        this.currentPlayer = 'player';
    }

    handlePlayerMove(cell, row, col) {
        this.showChallenge(() => {
            cell.setFillStyle(this.playerSymbol === 'Blue' ? 0x4285f4 : 0xf57c00);
            cell.filled = true;
            cell.symbol = this.playerSymbol;
            this.board[row][col] = this.playerSymbol;

            if (this.checkWin(this.playerSymbol)) {
                this.sound.play('winSound');
                this.showEndMessage(`${this.playerSymbol} Wins!`);
                return;
            }

            if (this.board.flat().every(cell => cell)) {
                this.sound.play('lossSound');
                this.showEndMessage("It's a Draw!");
                return;
            }

            this.currentPlayer = 'computer';
            this.computerMove();
        });
    }

    computerMove() {
        const emptyCells = [];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!this.board[row][col]) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomMove = Phaser.Utils.Array.GetRandom(emptyCells);
            const { row, col } = randomMove;
            const cell = this.getCellByPosition(row, col);

            cell.setFillStyle(this.computerSymbol === 'Blue' ? 0x4285f4 : 0xf57c00);
            cell.filled = true;
            cell.symbol = this.computerSymbol;
            this.board[row][col] = this.computerSymbol;

            if (this.checkWin(this.computerSymbol)) {
                this.sound.play('winSound');
                this.showEndMessage(`${this.computerSymbol} Wins!`);
                return;
            }
        }

        if (this.board.flat().every(cell => cell)) {
            this.sound.play('lossSound');
            this.showEndMessage("It's a Draw!");
            return;
        }

        this.currentPlayer = 'player';
    }

    getCellByPosition(row, col) {
        const cellSize = Math.min(this.scale.width / 5, this.scale.height / 5);
        const offsetX = (this.scale.width - cellSize * 3) / 2;
        const offsetY = (this.scale.height - cellSize * 3) / 2;
        const x = offsetX + col * cellSize;
        const y = offsetY + row * cellSize;
        return this.children.getAll().find(child => child.x === x && child.y === y);
    }

    checkWin(symbol) {
        const winPatterns = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        return winPatterns.some(pattern =>
            pattern.every(([row, col]) => this.board[row][col] === symbol)
        );
    }

    showChallenge(onComplete) {
        const challenge = Phaser.Utils.Array.GetRandom(this.challenges);
        const popupWidth = this.scale.width * 0.8;
        const popupHeight = this.scale.height * 0.5;
        const popupX = (this.scale.width - popupWidth) / 2;
        const popupY = (this.scale.height - popupHeight) / 2;

        const popup = this.add.graphics();
        popup.fillStyle(0xffffff, 1);
        popup.fillRoundedRect(popupX, popupY, popupWidth, popupHeight, 20);

        const questionText = this.add.text(popupX + 20, popupY + 20, challenge.question, {
            fontFamily: 'Roboto, sans-serif',
            fontSize: 20,
            color: '#000',
            wordWrap: { width: popupWidth - 40 },
        });

        const options = [];
        let selectedOption = null;
        let hintText = null;

        challenge.options.forEach((option, index) => {
            const optionText = this.add.text(
                popupX + 20, popupY + 100 + index * 40,
                `${index + 1}. ${option}`, {
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: 18,
                    color: '#007bff',
                }
            ).setInteractive();

            optionText.on('pointerdown', () => {
                // Clear previous hint if a new option is selected
                if (hintText) {
                    hintText.destroy();
                }

                if (option === challenge.answer) {
                    this.sound.play('correctSound');
                    popup.destroy();
                    questionText.destroy();
                    options.forEach(opt => opt.destroy());
                    onComplete();
                } else {
                    this.sound.play('wrongSound');
                    optionText.setColor('#ff0000');
                    selectedOption = option; // Track selected option

                    // Provide the hint for the selected option
                    hintText = this.add.text(popupX + 20, popupY + popupHeight - 50, challenge.hints[option], {
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: 22,
                        color: '#ff0000',
                        fontStyle: 'bold',
                    });
                }
            });

            options.push(optionText);
        });
    }

    showEndMessage(message) {
        const endText = this.add.text(this.scale.width / 2, this.scale.height / 2, message, {
            fontFamily: 'Roboto, sans-serif',
            fontSize: 40,
            color: '#000',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            endText.destroy();
            this.scene.start('EndGame'); // Transition to the EndGame scene
        });
    }
}
