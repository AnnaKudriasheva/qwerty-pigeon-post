import Phaser from 'phaser';

let startBtnSound;
let intro;
let title;
let textarea;
let introText;
let introSound;

export default class extends Phaser.State {
    create () {
        startBtnSound = this.add.audio('button-sound');
        introSound = this.add.audio('intro-1-sound');
        introSound.play();
        introSound.volume = 0.1;
        this.stage.backgroundColor = '#f95732';
        this.add.sprite(this.world.width - 450, 0, 'pigeon-right');
        this.add.sprite(this.world.width - 450, this.world.height - 300, 'map');

        title = this.add.bitmapText(10, 10, 'Fira', 'WAR PIGEONS', 50);
        title.tint = 0x000000;

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(10, 80, 450, 250);
        textarea.endFill();

        intro = 'During the First and Second World Wars, pigeons were used to ' +
            'transport messages.\nA carrier pigeon\'s job was dangerous.' +
            ' Nearby enemy soldiers often tried to shoot them down, knowing ' +
            'that birds were carrying important messages.';
        introText = this.add.bitmapText(15, 85, 'Playfair', intro, 24);
        introText.maxWidth = 420;
        introText.tint = 0x000000;

        this.add.button(322, 350, 'next-button', this.startInstructions, this);
    }
    startInstructions () {
        introSound.stop();
        startBtnSound.play();
        this.state.start('HowToPlay');
    }
}
