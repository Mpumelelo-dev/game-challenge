import Phaser from 'phaser';

export class Arrays extends Phaser.Scene {
    constructor() {
        super('Arrays');

        // Python intermediate challenges dataset
        this.challenges = [
            {
                question: "What will the following code output?\n`x = 10\ny = 20\nx, y = y, x\nprint(x, y)`",
                options: ["10 20", "20 10", "None", "Error"],
                answer: "20 10",
                hints: {
                    "10 20": "Hint: The values of `x` and `y` are swapped using tuple unpacking. So, `x` becomes `20` and `y` becomes `10`.",
                    "20 10": "Correct! The tuple unpacking swaps the values of `x` and `y`.",
                    "None": "Hint: The code outputs values, not 'None'. Review the logic behind tuple unpacking.",
                    "Error": "Hint: There's no error in this code. Python allows swapping values with tuple unpacking.",
                }
            },
            {
                question: "Which of the following is used to define a function in Python?",
                options: ["def", "function", "func", "define"],
                answer: "def",
                hints: {
                    "def": "Correct! In Python, functions are defined using the `def` keyword.",
                    "function": "Hint: `function` is not a valid keyword in Python. Try `def`.",
                    "func": "Hint: `func` is not a keyword in Python. The correct keyword is `def`.",
                    "define": "Hint: Python doesn't use `define`. The correct keyword is `def`.",
                }
            },
            {
                question: "What is the output of the following code?\n`my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)`",
                options: ["[1, 2, 3, 4]", "[4, 1, 2, 3]", "[1, 2, 3]", "Error"],
                answer: "[1, 2, 3, 4]",
                hints: {
                    "[1, 2, 3, 4]": "Correct! The `append()` method adds the element `4` at the end of the list.",
                    "[4, 1, 2, 3]": "Hint: `append()` adds elements to the end of the list, not the beginning.",
                    "[1, 2, 3]": "Hint: `append()` modifies the list by adding an element at the end, so the list is now `[1, 2, 3, 4]`.",
                    "Error": "Hint: There's no error in this code. The `append()` method works correctly.",
                }
            },
            {
                question: "What does the `len()` function do in Python?",
                options: [
                    "Returns the number of elements in a sequence",
                    "Returns the sum of all elements in a list",
                    "Returns the largest element in a list",
                    "None of the above",
                ],
                answer: "Returns the number of elements in a sequence",
                hints: {
                    "Returns the number of elements in a sequence": "Correct! `len()` returns the count of elements in a sequence (list, string, etc.).",
                    "Returns the sum of all elements in a list": "Hint: `len()` doesn't sum elements. For summing, use `sum()`.",
                    "Returns the largest element in a list": "Hint: `len()` doesn't return the largest element. For that, you'd use `max()`.",
                    "None of the above": "Hint: One of the other answers is correct. Review the purpose of `len()`.",
                }
            },
            {
                question: "What will the following code output?\n`x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)`",
                options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "Error"],
                answer: "[1, 2, 3, 4]",
                hints: {
                    "[1, 2, 3, 4]": "Correct! Since `y` is a reference to `x`, both lists are modified when `append(4)` is called.",
                    "[1, 2, 3]": "Hint: `x` and `y` are referencing the same list, so changes to `y` also affect `x`.",
                    "[4, 1, 2, 3]": "Hint: The list is appended to, but it is added at the end, not at the beginning.",
                    "Error": "Hint: There's no error. The code modifies the list that `x` and `y` both refer to.",
                }
            },
            {
                question: "What is the correct way to open a file for writing in Python?",
                options: ["open('file.txt', 'w')", "open('file.txt', 'r')", "open('file.txt', 'a')", "open('file.txt')"],
                answer: "open('file.txt', 'w')",
                hints: {
                    "open('file.txt', 'w')": "Correct! The `'w'` mode opens the file for writing, creating it if it doesn't exist.",
                    "open('file.txt', 'r')": "Hint: `'r'` mode is for reading, not writing.",
                    "open('file.txt', 'a')": "Hint: `'a'` mode is for appending, not for writing from the beginning.",
                    "open('file.txt')": "Hint: The default mode is `'r'`, which is for reading, not writing.",
                }
            }
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
        // Add background and title
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background').setAlpha(0.7);
        const bubble = this.add.graphics();
        bubble.fillStyle(0x99d8e6, 0.8);
        bubble.fillRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        bubble.lineStyle(5, 0xffffff, 1);
        bubble.strokeRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        this.add.text(this.scale.width / 2, 90, '<Hack/> Tac-Toe: Intermediate Challenge', {
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
        const blueCircle = this.add.circle(this.scale.width / 2 - 100, 300, buttonRadius, 0x4285f4).setInteractive({ useHandCursor: true }); // Blue for "Blue"
        const orangeCircle = this.add.circle(this.scale.width / 2 + 100, 300, buttonRadius, 0xf57c00).setInteractive({ useHandCursor: true }); // Orange for "Orange"

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
        this.playerSymbol = symbol === 'Blue' ? 'Blue' : 'Orange'; // Assign playerSymbol as "Blue" or "Orange"
        this.computerSymbol = symbol === 'Blue' ? 'Orange' : 'Blue'; // Computer gets the opposite symbol
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
            const popupWidth = this.scale.width * 0.9;
            const popupHeight = this.scale.height * 0.6;
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
                    popupX + 20, popupY + 150 + index * 40,
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
    