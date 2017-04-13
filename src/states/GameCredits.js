import Phaser from 'phaser';

let menu;
let tween;
let credits;
let btnSound;
let creditSound;

export default class extends Phaser.State {
    create () {
        creditSound = this.add.audio('intro-sound');
        creditSound.loopFull();
        creditSound.volume = 0.1;
        btnSound = this.add.audio('button-sound');

        this.stage.backgroundColor = '#f95732';
        this.add.sprite(0, this.world.height - 600, 'cher-ami');
        credits = this.add.sprite(this.world.centerX, this.world.height + 550,
            'credits');
        credits.anchor.setTo(0.5, 0.5);
        tween = this.add.tween(credits);
        tween.to({ y: -1300 }, 20000, 'Linear', true, 0);

        menu = this.add.button(this.world.width - 150, this.world.height - 100,
            'to-menu', this.mainMenu, this, 2, 1, 0);
        menu.anchor.setTo(0.5, 0.5);
    }

    mainMenu () {
        btnSound.play();
        creditSound.stop();
        this.state.start('Intro');
    }
}
