import Phaser from 'phaser';
import { loadingPage } from '../utils';

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#f2f2f2';
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    preload () {
        loadingPage(this);
        // Intro
        this.load.image('background', './assets/img/intro-back.png');
        this.load.image('mail', './assets/img/intro-mail.png');
        this.load.image('next-btn', './assets/img/next-button.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
        // Start
        this.load.image('start-background', './assets/img/start-back.png');
        this.load.image('description', './assets/img/start.png');
        this.load.image('start', './assets/img/start-btn.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
        // MainGame
        this.load.image('parallax-back', 'assets/img/parallax-back.png');
        this.load.image('parallax-front', 'assets/img/parallax-front.png');
        this.load.image('message', 'assets/img/letter.png');
        this.load.image('firstaids', 'assets/img/firstaid.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('cannonball', 'assets/img/core.png');
        this.load.image('apples', 'assets/img/apple.png');
        this.load.image('pears', 'assets/img/pear.png');
        this.load.image('plums', 'assets/img/plum.png');
        this.load.image('grapes', 'assets/img/grape.png');
        this.load.spritesheet('rain', 'assets/img/rain-drop.png');
        this.load.spritesheet('bird', 'assets/img/pigeon.png', 211, 211);
        this.load.audio('wings-sound', './assets/sounds/wings-sound.mp3');
        // GameOver
        this.load.image('restart-button', 'assets/img/restart.png');
        this.load.image('main-menu-button', 'assets/img/main-menu.png');
    }
    create () {
        this.state.start('Intro');
    }
}
