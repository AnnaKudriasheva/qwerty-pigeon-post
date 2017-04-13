import Phaser from 'phaser';

let intro;
let title;
let textarea;
let introSound;
let startBtnSound;

export default class extends Phaser.State {
    create () {
        startBtnSound = this.add.audio('button-sound');
        introSound = this.add.audio('intro-1-sound');
        introSound.play();

        this.stage.backgroundColor = '#f95732';

        this.add.sprite(350, 10, 'cher-ami');

        title = this.add.bitmapText(10, 10, 'Fira', 'CHER AMI', 50);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 80, 540, 300);
        textarea.endFill();

        intro = 'Cher Ami is a little pigeon trained as war messenger.' +
            ' Her task for today is to deliver a message from the main quarters' +
            ' of American Expeditionary Force to 77th batallion located in' +
            ' the Argon forest.';
        intro = this.add.bitmapText(15, 85, 'Playfair', intro, 24);
        intro.maxWidth = 530;
        intro.tint = 0x000000;
        this.add.button(322, 350, 'next-button', this.startLVL2, this);
    }

    startLVL2 () {
        introSound.stop();
        startBtnSound.play();
        this.state.start('MainGame', true, false, 2);
    }
}
