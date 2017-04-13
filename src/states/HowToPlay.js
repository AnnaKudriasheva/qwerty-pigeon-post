import Phaser from 'phaser';

let intro;
let title;
let textarea;
let introText;
let startBtnSound;

export default class extends Phaser.State {
    create () {
        startBtnSound = this.add.audio('button-sound');

        this.stage.backgroundColor = '#f95732';
        this.add.sprite(this.world.width - 450, 0, 'pigeon-right');
        this.add.sprite(this.world.width - 450, this.world.height - 300, 'map');

        title = this.add.bitmapText(10, 10, 'Fira', 'HOW TO PLAY', 50);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 80, 540, 300);
        textarea.endFill();

        intro = 'Your task is to deliver a message over given time. \n' +
            'Use arrow keys or «W A S D» to control the bird. To increase ' +
            'pigeon’s speed, hold «D», but look out - acceleration reduces ' +
            'your power. If power is low, pigeon will get tired and unable ' +
            'to deliver a message. Collect fruits and first aid kits to regain' +
            ' it.\n Avoid bullets and war hawks - a little pigeon can’t survive' +
            ' serious damage.';
        introText = this.add.bitmapText(15, 85, 'Playfair', intro, 24);
        introText.maxWidth = 530;
        introText.tint = 0x000000;

        this.add.button(322, 350, 'next-button', this.startGame, this);
    }

    startGame () {
        startBtnSound.play();
        this.state.start('MainGame', true, false, 1);
    }
}
