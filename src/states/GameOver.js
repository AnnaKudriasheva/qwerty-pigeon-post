import Phaser from 'phaser';

let gameOverSound;
let level;

export default class extends Phaser.State {
    init (levelNumber) {
        level = levelNumber;
    }
    create () {
        gameOverSound = this.add.audio('game-over-sound');
        gameOverSound.volume = 0.2;
        gameOverSound.play();
        this.add.tileSprite(0, 0, 1000, 560, `parallax-back${level}`);
        this.add.tileSprite(0, 0, 1000, 560, `parallax-front${level}`);
        this.add.button(250, 200,
            'restart-button', this.restartGame, this);
        this.add.button(550, 200,
            'main-menu-button', this.mainMenu, this);
    }

    restartGame () {
        this.state.start('MainGame', true, false, 1);
    }

    mainMenu () {
        location.reload();
    }
}
