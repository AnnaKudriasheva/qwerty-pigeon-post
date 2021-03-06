import Phaser from 'phaser';

let title;
let center;
let circle1;
let circle2;
let circle3;
let circle4;
let circle5;
let textarea;
let puzzleSound;
let cipheredText;
let puzzleSuccess;
let decipheredText;
let cipheredMessage;
let decipheredMessage;

export default class extends Phaser.State {
    create () {
        puzzleSound = this.add.audio('level-win');
        puzzleSound.volume = 0.1;
        puzzleSound.play();
        puzzleSuccess = this.add.audio('puzzle-success');
        puzzleSuccess.volume = 0.2;

        this.stage.backgroundColor = '#f95732';
        title = this.add.bitmapText(10, 10, 'Fira', 'CIPHERED MESSAGE', 50);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 100, 420, this.world.height * 0.75);
        textarea.endFill();

        this.add.sprite(200, 300, 'pigeon');

        cipheredMessage = 'Oauxoausw oeoine onls wdgsaaahsrirnstldtapdF' +
            'rdotryvth rpiosgeadnreke yoyb elno oept u aonaawnealaier ' +
            'vulgchplroi sroterlte etsftirrt';
        cipheredText = this.add.bitmapText(15, 105, 'Playfair',
            cipheredMessage, 24);
        cipheredText.maxWidth = 400;
        cipheredText.tint = 0x000000;

        decipheredMessage = 'We are along the road paralell to 276.4. Our ' +
            'own artillery is dropping a barrage directly on us. ' +
            'For heavens sake stop it.';
        decipheredText = this.add.bitmapText(15, 105, 'Playfair',
            decipheredMessage, 24);
        decipheredText.maxWidth = 400;
        decipheredText.tint = 0x000000;
        decipheredText.alpha = 0;

        circle1 = this.createCircle('e1');
        circle2 = this.createCircle('e2');
        circle3 = this.createCircle('e3');
        circle4 = this.createCircle('e4');
        circle5 = this.createCircle('e5');
        center = this.createCircle('e-center');
    }

    createCircle (name) {
        let circle = this.add.sprite(this.world.centerX * 1.43,
            this.world.centerY, name);
        circle.anchor.setTo(0.5, 0.5);
        circle.inputEnabled = true;
        if (name !== 'e-center') {
            circle.angle = this.getRandomAngle();
            circle.tint = 0x7b7b7b;
            if (name !== '1' && name !== '2') {
                circle.events.onInputDown.add(this.rotateCircle, this);
                circle.events.onInputOver.add(this.mouseOver, this);
                circle.events.onInputOut.add(this.mouseOut, this);
            }
            if (name === '1') {
                circle.events.onInputDown.add(this.rotateCircle1, this);
                circle.events.onInputOver.add(this.mouseOver1, this);
                circle.events.onInputOut.add(this.mouseOut1, this);
            }
            if (name === '2') {
                circle.events.onInputDown.add(this.rotateCircle2, this);
                circle.events.onInputOver.add(this.mouseOver2, this);
                circle.events.onInputOut.add(this.mouseOut2, this);
            }
        }
        return circle;
    }

    getRandomAngle () {
        let possiblePositions = [30, 60, 90, 120, 150, -180,
            -150, -120, -90, -60, -30];
        let randomPosition = Math.floor(Math.random() * possiblePositions.length);
        return possiblePositions[randomPosition];
    }

    isFinished () {
        if (circle1.angle === 0 && circle2.angle === 0 &&
            circle3.angle === 0 && circle4.angle === 0 && circle5.angle === 0) {
            this.add.tween(decipheredMessage).to({alpha: 1}, 2000,
                Phaser.Easing.Linear.None, true);
            this.add.tween(cipheredText).to({alpha: 0}, 2000,
                Phaser.Easing.Linear.None, true);
            this.add.tween(decipheredText).to({alpha: 1}, 2000,
                Phaser.Easing.Linear.None, true);
            puzzleSuccess.play();
            setTimeout(() => {
                this.state.start('GameVictory');
            }, 9000);
        }
        return (circle1.angle === 0 && circle2.angle === 0 &&
        circle3.angle === 0 && circle4.angle === 0 && circle5.angle === 0);
    }

    rotateCircle (circle) {
        if (!this.isFinished()) {
            this.input.mouse.capture = true;
            if (this.input.activePointer.leftButton.isDown === true) {
                circle.angle = Math.round(circle.angle + 30);
            } else {
                circle.angle = Math.round(circle.angle - 30);
            }
            this.isFinished();
        }
    }

    rotateCircle1 (circle) {
        if (!this.isFinished()) {
            this.input.mouse.capture = true;
            if (this.input.activePointer.leftButton.isDown) {
                circle1.angle = Math.round(circle1.angle + 30);
                circle3.angle = Math.round(circle3.angle - 30);
            } else {
                circle1.angle = Math.round(circle1.angle - 30);
                circle3.angle = Math.round(circle3.angle + 30);
            }
            this.isFinished();
        }
    }

    rotateCircle2 (circle) {
        if (!this.isFinished()) {
            this.input.mouse.capture = true;
            if (this.input.activePointer.leftButton.isDown) {
                circle2.angle = Math.round(circle2.angle + 30);
                circle5.angle = Math.round(circle5.angle - 30);
            } else {
                circle2.angle = Math.round(circle2.angle - 30);
                circle5.angle = Math.round(circle5.angle + 30);
            }
            this.isFinished();
        }
    }

    mouseOver (sprite) {
        sprite.tint = 0xffffff;
    }

    mouseOver1 () {
        circle1.tint = 0xffffff;
        circle3.tint = 0xffffff;
    }

    mouseOver2 () {
        circle2.tint = 0xffffff;
        circle5.tint = 0xffffff;
    }

    mouseOut (sprite) {
        sprite.tint = 0x7b7b7b;
    }

    mouseOut1 () {
        circle1.tint = 0x7b7b7b;
        circle3.tint = 0x7b7b7b;
    }

    mouseOut2 () {
        circle2.tint = 0x7b7b7b;
        circle5.tint = 0x7b7b7b;
    }
}
