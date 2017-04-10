import Phaser from 'phaser';

let introSound;
let introBack;
let introMail;
let introBtn;
let btnSound;

export default class extends Phaser.State {
    create () {
        // sounds
        btnSound = this.add.audio('button-sound');
        introSound = this.add.audio('intro-sound');
        introSound.loopFull();
        introSound.volume = 0.1;
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
        introSound.stop();
        this.state.start('Start');
    }
}
