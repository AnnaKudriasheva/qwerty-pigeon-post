import Phaser from 'phaser';

let title;
let arrow;
let playButton;
let circleOuter;
let circleMiddle;
let circleInner;
let imageCenter;
let btnSound;
let introSound;

export default class extends Phaser.State {
    create () {
        // sounds
        btnSound = this.add.audio('button-sound');
        introSound = this.add.audio('intro-sound');
        introSound.loopFull();
        introSound.volume = 0.1;
        this.stage.backgroundColor = '#f95732';
        this.add.sprite(this.world.width - 400, 0, 'right-corner');
        this.add.sprite(0, this.world.height - 226, 'left-corner');

        // add title and button
        title = this.add.bitmapText(270, 40, 'Fira', 'PIGEON EXPRESS', 45);
        arrow = this.add.graphics(0, 0);
        arrow.beginFill(0xffffff);
        arrow.drawRect(270, 100, 5, 200);
        arrow.endFill();

        playButton = this.add.button(270, this.world.centerY + 100, 'play-button',
            this.startMainPage, this);
        playButton.anchor.setTo(0.5, 0.5);

        // add center circles
        circleOuter = this.add.graphics(0, 0);
        circleOuter.beginFill(0x618a8c, 1);
        circleOuter.drawCircle(this.world.centerX, this.world.centerY,
            this.world.height * 0.64);

        circleMiddle = this.add.graphics(0, 0);
        circleMiddle.beginFill(0xeff4dd, 1);
        circleMiddle.drawCircle(this.world.centerX, this.world.centerY,
            this.world.height * 0.475);

        imageCenter = this.add.sprite(this.world.centerX - 25,
            this.world.centerY, 'intro-center');
        imageCenter.anchor.setTo(0.5, 0.5);
        circleInner = this.add.graphics(0, 0);
        circleInner.beginFill(0xeff4dd, 1);
        circleInner.drawCircle(this.world.centerX, this.world.centerY, 170);
        imageCenter.mask = circleInner;
    }
    startMainPage () {
        btnSound.play();
        introSound.stop();
        this.state.start('IntroLVL1');
    }
}
