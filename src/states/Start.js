import Phaser from 'phaser';
import { loadingPage } from '../utils';

let startDescription;
let startBackground;
let startBtnSound;
let startWidth;
let startBtn;

export default class extends Phaser.State {
    preload () {
        loadingPage(this);
        this.load.image('background', './assets/img/start-back.png');
        this.load.image('description', './assets/img/start.png');
        this.load.image('start', './assets/img/start-btn.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
    }
    create () {
        startBtnSound = this.add.audio('button-sound');
        startBackground = this.add.sprite(0, 0, 'background');
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
        this.state.start('MainGame');
    }
}
