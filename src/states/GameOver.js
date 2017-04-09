import Phaser from 'phaser';

let mainMenuBtn;
let restartBtn;

export default class extends Phaser.State {
    create () {
        this.add.tileSprite(0, 0, 1200, 672, 'parallax-back');
        this.add.tileSprite(0, 0, 1200, 672, 'parallax-front');
        restartBtn = this.add.button(250, 200,
            'restart-button', this.restartGame, this);
        mainMenuBtn = this.add.button(550, 200,
            'main-menu-button', this.mainMenu, this);
    }

    restartGame () {
        this.state.start('MainGame', true, false, 1);
    }

    mainMenu () {
        location.reload();
    }
}
