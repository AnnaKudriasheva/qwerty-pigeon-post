import Phaser from 'phaser';

let mainMenuBtn;
let restartBtn;

export default class extends Phaser.State {
    preload () {
        this.load.image('parallax-back', 'assets/img/parallax-back.png');
        this.load.image('parallax-front', 'assets/img/parallax-front.png');
        this.load.image('restart-button', 'assets/img/restart.png');
        this.load.image('main-menu-button', 'assets/img/main-menu.png');
    }

    create () {
        this.add.tileSprite(0, 0, 1200, 672, 'parallax-back');
        this.add.tileSprite(0, 0, 1200, 672, 'parallax-front');
        restartBtn = this.add.button(250, 200,
            'restart-button', this.restartGame, this);
        mainMenuBtn = this.add.button(550, 200,
            'main-menu-button', this.mainMenu, this);
    }

    restartGame () {
        this.state.start('MainGame');
    }

    mainMenu () {
        location.reload();
    }
}
