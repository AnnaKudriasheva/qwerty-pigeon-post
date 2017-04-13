import Phaser from 'phaser';

let title;
let textarea;
let ciphered;
let boardRows;
let pieceWidth = 110;
let pieceHeight = 110;
let deciphered;
let piecesGroup;
let puzzleSound;
let boardColumns;
let piecesAmount;
let cipheredText;
let puzzleSuccess;
let decipheredText;
let shuffledIndexArray;

export default class extends Phaser.State {
    create () {
        puzzleSound = this.add.audio('level-win');
        puzzleSound.volume = 0.1;
        puzzleSound.play();
        puzzleSuccess = this.add.audio('puzzle-success');
        puzzleSuccess.volume = 0.2;

        this.stage.backgroundColor = '#f95732';
        title = this.add.bitmapText(10, 10, 'Fira', 'CIPHERED MESSAGE', 47);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 100, 420, 450);
        textarea.endFill();

        this.add.sprite(200, 350, 'pigeon');

        ciphered = 'U v rrvsrtscnl deiewowsgydepraapi rsdpee ldrrrefaoia ' +
            'geosoro o rsidaduesro na';
        cipheredText = this.add.bitmapText(15, 105, 'Playfair', ciphered, 24);
        cipheredText.maxWidth = 400;
        cipheredText.tint = 0x000000;

        deciphered = 'Rearguard\'s roads are overcrowded provisions supplies' +
            ' are lingered for five days';
        decipheredText = this.add.bitmapText(15, 105, 'Playfair', deciphered, 24);
        decipheredText.maxWidth = 400;
        decipheredText.tint = 0x000000;
        decipheredText.alpha = 0;
        this.prepareBoard();
    }

    prepareBoard () {
        let piecesIndex = 0;
        let i;
        let j;
        let piece;
        boardColumns = 5;
        boardRows = 5;
        piecesAmount = boardColumns * boardRows;
        shuffledIndexArray = this.createIndexArray();

        piecesGroup = this.add.group();

        for (i = 0; i < boardRows; i++) {
            for (j = 0; j < boardColumns; j++) {
                piece = piecesGroup.create(j * pieceWidth +
                    this.world.width - 500, i * pieceHeight + 60,
                    'background', shuffledIndexArray[piecesIndex]);
                piece.inputEnabled = true;
                piece.tint = 0xdddddd;
                piece.events.onInputDown.add(this.rotatePiece, this);
                piece.events.onInputOver.add(this.mouseOver, this);
                piece.events.onInputOut.add(this.mouseOut, this);
                piece.anchor.setTo(0.5, 0.5);
                piece.angle = this.getRandomAngle();
                piecesIndex++;
            }
        }
    }

    createIndexArray () {
        let indexArray = [];
        for (let i = 0; i < piecesAmount; i++)  {
            indexArray.push(i);
        }
        return indexArray;
    }

    getRandomAngle () {
        let possiblePositions = [0, 90, -180, -90];
        let randomPosition = Math.floor(Math.random() *
            possiblePositions.length);
        return possiblePositions[randomPosition];
    }

    rotatePiece (piece) {
        if (!this.isFinished()) {
            piece.angle = Math.round(piece.angle + 90);
            this.isFinished();
        }
    }

    isFinished () {
        let isFinished = true;
        piecesGroup.children.forEach((piece) => {
            if (piece.angle !== 0) {
                isFinished = false;
                return false;
            }
        });
        if (isFinished) {
            this.add.tween(cipheredText).to({ alpha: 0 }, 2000,
                Phaser.Easing.Linear.None, true);
            this.add.tween(decipheredText).to({ alpha: 1 }, 2000,
                Phaser.Easing.Linear.None, true);
            piecesGroup.children.forEach((piece) => piece.tint = 0xffffff);
            puzzleSuccess.play();
            setTimeout(() => {
                this.state.start('IntroLVL3');
            }, 7000);
        }
        return isFinished;
    }

    mouseOver (sprite) {
        sprite.tint = 0xffffff;
    }

    mouseOut (sprite) {
        sprite.tint = 0xdddddd;
    }
}
