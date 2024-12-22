import Phaser from 'phaser';

export class Loops extends Phaser.Scene {
    constructor() {
        super('Loops');

        // Python Advanced challenges dataset (loops)
        this.challenges = [
            {
                question: "What is the output of the following code?\n```python\ndef greet():\n    print('Hello')\ngreet()```",
                options: [
                    "Hello",
                    "Error",
                    "Hello World",
                    "None",
                ],
                answer: "Hello",
                hints: {
                    "Hello": "Correct! The `greet()` function simply prints 'Hello'.",
                    "Error": "Hint: There's no syntax error in the code. The function executes successfully.",
                    "Hello World": "Hint: The code only prints 'Hello', not 'Hello World'.",
                    "None": "Hint: The function actually prints something. Review the function's behavior.",
                }
            },
            {
                question: "What does the `yield` keyword do in Python?",
                options: [
                    "Stops execution of the function",
                    "Returns a value and pauses the function, allowing it to be resumed",
                    "Defines a generator function",
                    "Both B and C",
                ],
                answer: "Both B and C",
                hints: {
                    "Stops execution of the function": "Hint: `yield` doesn't stop the function permanently. It pauses and can resume.",
                    "Returns a value and pauses the function, allowing it to be resumed": "Correct! `yield` allows a function to pause and return a value.",
                    "Defines a generator function": "Hint: `yield` is used in generator functions to produce values on the fly.",
                    "Both B and C": "Correct! `yield` both defines a generator and allows pausing the function.",
                }
            },
            {
                question: "What is the output of the following code?\n```python\nmy_dict = {x: x*x for x in range(3)}\nprint(my_dict)\n```",
                options: [
                    "{0: 0, 1: 1, 2: 4}",
                    "{0: 0, 1: 1, 2: 2}",
                    "{0: 0, 1: 2, 2: 4}",
                    "Error",
                ],
                answer: "{0: 0, 1: 1, 2: 4}",
                hints: {
                    "{0: 0, 1: 1, 2: 4}": "Correct! The dictionary comprehension squares the values from 0 to 2.",
                    "{0: 0, 1: 1, 2: 2}": "Hint: The values are squares of numbers, so 2 squared is 4, not 2.",
                    "{0: 0, 1: 2, 2: 4}": "Hint: The first value is correct, but the others are off. Review the math for each square.",
                    "Error": "Hint: There's no error in the code. It's a valid Python expression.",
                }
            },
            {
                question: "Which statement is true about Python's `with` statement?",
                options: [
                    "It is used to handle exceptions",
                    "It is used to manage resources like file streams",
                    "It is used to create a generator",
                    "None of the above",
                ],
                answer: "It is used to manage resources like file streams",
                hints: {
                    "It is used to handle exceptions": "Hint: `with` doesn't handle exceptions directly. It's used for resource management.",
                    "It is used to manage resources like file streams": "Correct! `with` is used for managing resources such as file streams, automatically closing them when done.",
                    "It is used to create a generator": "Hint: Generators are defined using `yield`, not `with`.",
                    "None of the above": "Hint: One of the other options is correct. Review the purpose of `with`.",
                }
            },
            {
                question: "What is the output of the following code?\n```python\ndef func(a, b, *args, **kwargs):\n    print(a, b, args, kwargs)\nfunc(1, 2, 3, 4, x=5, y=6)\n```",
                options: [
                    "1 2 (3, 4) {'x': 5, 'y': 6}",
                    "1 2 [3, 4] {'x': 5, 'y': 6}",
                    "1 2 () {}",
                    "Error",
                ],
                answer: "1 2 (3, 4) {'x': 5, 'y': 6}",
                hints: {
                    "1 2 (3, 4) {'x': 5, 'y': 6}": "Correct! The function prints the positional arguments and keyword arguments.",
                    "1 2 [3, 4] {'x': 5, 'y': 6}": "Hint: `args` are passed as a tuple, not a list. Review how *args works.",
                    "1 2 () {}": "Hint: There are additional arguments passed to the function, so both `args` and `kwargs` will contain values.",
                    "Error": "Hint: The code is valid. It prints the function's arguments correctly.",
                }
            },
            {
                question: "What does the following code do?\n```python\nfrom collections import Counter\nc = Counter(['a', 'b', 'a', 'c', 'b', 'a'])\nprint(c)\n```",
                options: [
                    "Counts the occurrences of each element in the list",
                    "Sorts the list alphabetically",
                    "Groups elements by their frequency",
                    "None of the above",
                ],
                answer: "Counts the occurrences of each element in the list",
                hints: {
                    "Counts the occurrences of each element in the list": "Correct! `Counter` counts the occurrences of each element.",
                    "Sorts the list alphabetically": "Hint: `Counter` does not sort the list. It counts frequencies.",
                    "Groups elements by their frequency": "Hint: While `Counter` groups elements, it does so by counting them, not grouping by frequency.",
                    "None of the above": "Hint: One of the other options is correct. Review the behavior of `Counter`.",
                }
            },
            {
                question: "What will the following code output?nclass Test:\n    def __init__(self):       self.value = 42\n    def __call__(self):       return self.value\nobj = Test()\nprint(obj())\n```",
                options: [
                    "42",
                    "Error",
                    "<__main__.Test object at ...>",
                    "None",
                ],
                answer: "42",
                hints: {
                    "42": "Correct! The `__call__` method allows the object to be called like a function, returning `self.value`.",
                    "Error": "Hint: There's no error in the code. The class is defined and called properly.",
                    "<__main__.Test object at ...>": "Hint: This is the default output when a class doesn't define `__call__`. The code does define it correctly.",
                    "None": "Hint: The code prints the `value` attribute, not `None`.",
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
        // Add background and title
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background').setAlpha(0.7);
        const bubble = this.add.graphics();
        bubble.fillStyle(0x99d8e6, 0.8);
        bubble.fillRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        bubble.lineStyle(5, 0xffffff, 1);
        bubble.strokeRoundedRect(50, 50, this.scale.width * 0.8, 80, 20);
        this.add.text(this.scale.width / 2, 90, '<Hack/> Tac-Toe: Advanced Challenge', {
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
                backgroundColor :"#fff",
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
                backgroundColor :"#fff",
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
           const popupHeight = this.scale.height * 0.65;
           const popupX = (this.scale.width - popupWidth) / 2;
           const popupY = (this.scale.height - popupHeight) / 2;
   
           const popup = this.add.graphics();
           popup.fillStyle(0xffffff, 1);
           popup.fillRoundedRect(popupX, popupY, popupWidth, popupHeight, 20);
   
           const questionText = this.add.text(popupX + 50, popupY + 20, challenge.question, {
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
                   popupX + 40, popupY + 150 + index * 40,
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
   