import Phaser from 'phaser';

let startDescription;
let startBackground;
let startBtnSound;
let startWidth;
let startBtn;

export default class extends Phaser.State {
    create () {
        startBtnSound = this.add.audio('button-sound');
        startBackground = this.add.sprite(0, 0, 'start-background');
        startBackground.width = this.world.width;
        startBackground.height = this.world.height;
        // description post
        startDescription = this.add.sprite(window.innerWidth * 0.12,
            window.innerHeight * 0.02, 'description');
        startWidth = this.world.width * 0.35;
        startDescription.width = this.world.width * 0.35;
        startDescription.height = startWidth * 1.45;
        // start game button
        startBtn = this.add.button(startDescription.x + 70, startDescription.y +
            startDescription.height - 90, 'start', this.startGame, this);
        startBtn.width = startDescription.width * 0.6;
        startBtn.height = (startDescription.width * 0.6) * 0.27;
    }
    startGame () {
        startBtnSound.play();
        this.state.start('MainGame', true, false, 1);
    }
}
