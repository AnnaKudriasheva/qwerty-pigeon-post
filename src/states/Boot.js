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
        // load fonts
        WebFont.load({
            google: {
                families: ['Montserrat']
            }
        });
        // Intro
        this.load.image('background', './assets/img/intro-back.png');
        this.load.image('mail', './assets/img/intro-mail.png');
        this.load.image('next-btn', './assets/img/next-button.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
        this.load.audio('intro-sound', './assets/sounds/intro.mp3');
        // Start
        this.load.image('start-background', './assets/img/start-back.png');
        this.load.image('description', './assets/img/start.png');
        this.load.image('start', './assets/img/start-btn.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
        // MainGame
        this.load.audio('collect-sound', './assets/sounds/collect-obj.mp3');
        // level 1
        this.load.image(`parallax-back1`, 'assets/img/parallax-back1.png');
        this.load.image(`parallax-front1`, 'assets/img/parallax-front1.png');
        // level 2
        this.load.image(`parallax-back2`, 'assets/img/parallax-back2.png');
        this.load.image(`parallax-front2`, 'assets/img/parallax-front2.png');
        // level 3
        this.load.image(`parallax-back3`, 'assets/img/parallax-back3.png');
        this.load.image(`parallax-front3`, 'assets/img/parallax-front3.png');
        // other resources
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
        this.load.image('restart-button', './assets/img/restart.png');
        this.load.image('main-menu-button', 'assets/img/main-menu.png');
        this.load.audio('game-over-sound', './assets/sounds/game-over.mp3');
        // Puzzle1
        this.load.image('center', './assets/img/center.png');
        this.load.image('1', './assets/img/1.png');
        this.load.image('2', './assets/img/2.png');
        this.load.image('3', './assets/img/3.png');
        this.load.image('4', './assets/img/4.png');
        this.load.image('5', './assets/img/5.png');
        this.load.image('5', './assetsimg/5.png');
        this.load.image('pigeon', './assets/img/pigeon.jpg');
        this.load.image('decipher', './assets/img/decipher.png');
        this.load.bitmapFont('Fira', './assets/fonts/fira-sans.png', 'assets/fonts/fira-sans.fnt');
        this.load.bitmapFont('Playfair', './assets/fonts/playfair.png', 'assets/fonts/playfair.fnt');
    }
    create () {
        this.state.start('Intro');
    }
}
