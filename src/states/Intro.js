import Phaser from 'phaser';

let introBack;
let introMail;
let introBtn;
let btnSound;
let loadingBar;

export default class extends Phaser.State {
    preload () {
        loadingBar = this.add.sprite(this.game.world.centerX,
            this.game.world.centerY, 'progress-bar');
        loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(loadingBar);

        this.load.image('background', './assets/img/intro-back.png');
        this.load.image('mail', './assets/img/intro-mail.png');
        this.load.image('next-btn', './assets/img/next-button.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
    }
    create () {
        btnSound = this.add.audio('button-sound');
        // left side
        introMail = this.add.sprite(0, 0, 'mail');
        introMail.width = this.world.width * 0.43;
        introMail.height = this.world.height;
        // right side
        introBack = this.add.sprite(introMail.width, 0, 'background');
        introBack.width = this.world.width * 0.57;
        introBack.height = this.world.height;
        // next button
        introBtn = this.add.button(introMail.width / 2 -
            ((introMail.width * 0.45) / 2),
            introMail.height - introMail.height * 0.35, 'next-btn',
            this.startMainPage, this);
        introBtn.width = introMail.width * 0.45;
        introBtn.height = (introMail.width * 0.45) * 0.24;
    }
    startMainPage () {
        btnSound.play();
        this.state.start('Start');
    }
}
