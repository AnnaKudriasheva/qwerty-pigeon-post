import Phaser from 'phaser';
import { loadingPage } from '../utils';

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#eff4dd';
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
        this.load.image('intro-center', './assets/img/intro-img/center.png');
        this.load.image('left-corner', './assets/img/intro-img/left-corner.png');
        this.load.image('right-corner', './assets/img/intro-img/right-corner.png');
        this.load.image('play-button', './assets/img/intro-img/play-button.png');
        this.load.audio('intro-sound', './assets/sounds/intro.mp3');
        // Intro LVL 1
        this.load.image('pigeon-right',
            './assets/img/intro-1-img/pigeons-right-corner.png');
        this.load.image('map', './assets/img/intro-1-img/map.png');
        this.load.image('next-button', './assets/img/intro-1-img/next-button.png');
        this.load.audio('button-sound', './assets/sounds/button-sound.mp3');
        // Intro LVL 2
        this.load.image('cher-ami', './assets/img/intro-2-img/cher-ami.png');
        // Intro LVL 3
        this.load.image('lost', './assets/img/intro-3-img/lost.png');
        // MainGame
        this.load.audio('collect-sound', './assets/sounds/collect-obj.mp3');
        // level 1
        this.load.image(`parallax-back1`, './assets/img/parallax-back1.png');
        this.load.image(`parallax-front1`, './assets/img/parallax-front1.png');
        // level 2
        this.load.image(`parallax-back2`, './assets/img/parallax-back2.png');
        this.load.image(`parallax-front2`, './assets/img/parallax-front2.png');
        // level 3
        this.load.image(`parallax-back3`, './assets/img/parallax-back3.png');
        this.load.image(`parallax-front3`, './assets/img/parallax-front3.png');
        // other resources
        this.load.image('message', './assets/img/letter.png');
        this.load.image('firstaids', './assets/img/firstaid.png');
        this.load.image('bullet', './assets/img/bullet.png');
        this.load.image('cannonball', './assets/img/core.png');
        this.load.image('apples', './assets/img/apple.png');
        this.load.image('pears', './assets/img/pear.png');
        this.load.image('plums', './assets/img/plum.png');
        this.load.image('grapes', './assets/img/grape.png');
        this.load.spritesheet('rain', './assets/img/rain-drop.png');
        this.load.spritesheet('bird', './assets/img/bird.png', 632, 552);
        this.load.spritesheet('hawk', './assets/img/hawk.png', 131, 144);
        this.load.image('heart', './assets/img/heart.png');
        this.load.audio('wings-sound', './assets/sounds/wings-sound.mp3');
        this.load.audio('hawk-sound', './assets/sounds/hawk.mp3');
        this.load.audio('bullet-sound', './assets/sounds/bullet-sound.mp3');
        // GameOver
        this.load.image('forest', './assets/img/game-over-img/forest.jpg');
        this.load.image('play-again',
            './assets/img/game-over-img/play-again.png');
        this.load.image('to-menu', './assets/img/game-over-img/to-menu.png');
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
        // Puzzle2
        // Puzzle3
        // GameVictory
        this.load.image('flowers', './assets/img/victory-img/flowers.jpg');
        this.load.image('watch-credits',
            './assets/img/victory-img/watch-credits.png');
        this.load.image('to-menu', './assets/img/victory-img/to-menu.png');
        // GameCredits
        this.load.image('flowers', './assets/img/credits-img/flowers.jpg');
        this.load.image('credits', './assets/img/credits-img/credits.png');
        this.load.image('cher-ami', './assets/img/credits-img/flower-cher-ami.jpg');
        this.load.image('to-menu', './assets/img/credits-img/to-menu.png');
        // Fonts
        this.load.bitmapFont('Fira', './assets/fonts/fira-sans.png',
            'assets/fonts/fira-sans.fnt');
        this.load.bitmapFont('Playfair', './assets/fonts/playfair.png',
            'assets/fonts/playfair.fnt');
    }
    create () {
        this.state.start('Intro');
    }
}
