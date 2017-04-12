import Phaser from 'phaser';

let intro;
let title;
let textarea;
let startBtnSound;
let introSound;

export default class extends Phaser.State {
    create () {
        startBtnSound = this.add.audio('button-sound');
        introSound = this.add.audio('intro-1-sound');
        introSound.play();
        this.stage.backgroundColor = '#f95732';
        this.add.sprite(540, 50, 'lost');

        title = this.add.bitmapText(10, 10, 'Fira', 'LOST BATALLION', 50);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 80, 540, 300);
        textarea.endFill();

        intro = 'Oh, no! The 77th batallion Cher Ami served have trapped in the Argon forest behind enemy lines without food and ammunition. Moreover, they are starting to receive friendly fire from allied troops who did not know their location.\n77th batallion have already sent two pigeons, but all messengers were shooted, and now Cher Ami is their last hope to receive help.';
        intro = this.add.bitmapText(15, 85, 'Playfair', intro, 24);
        intro.maxWidth = 530;
        intro.tint = 0x000000;
        this.add.button(420, 390, 'next-button', this.startLVL3, this);
    }
    startLVL3 () {
        introSound.stop();
        startBtnSound.play();
        this.state.start('MainGame', true, false, 3);
    }
}
