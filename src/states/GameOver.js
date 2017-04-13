import Phaser from 'phaser';

let play;
let menu;
let level;
let title;
let btnSound;
let gameOverSound;

export default class extends Phaser.State {
    init (levelNumber) {
        level = levelNumber;
    }

    create () {
        btnSound = this.add.audio('button-sound');
        gameOverSound = this.add.audio('game-over-sound');
        gameOverSound.volume = 0.2;
        gameOverSound.play();

        this.stage.backgroundColor = '#f95732';
        this.add.sprite(0, 0, 'forest');
        title = this.add.bitmapText(this.world.centerX, this.world.centerY - 120,
            'Playfair', 'Oh, no! Messenger died. Try again?', 35);
        title.anchor.setTo(0.5, 0.5);

        play = this.add.button(this.world.centerX - 105, this.world.centerY,
            'play-again', this.restartGame, this, 2, 1, 0);
        menu = this.add.button(this.world.centerX + 105, this.world.centerY,
            'to-menu', this.mainMenu, this, 2, 1, 0);
        play.anchor.setTo(0.5, 0.5);
        menu.anchor.setTo(0.5, 0.5);
    }

    restartGame () {
        btnSound.play();
        this.state.start('MainGame', true, false, level);
    }

    mainMenu () {
        btnSound.play();
        location.reload();
    }
}
