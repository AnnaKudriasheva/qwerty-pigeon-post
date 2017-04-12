import Phaser from 'phaser';

let intro;
let title;
let textarea;
let introText;
let credits;
let menu;
let btnSound;
let winGameSound;

export default class extends Phaser.State {
    create () {
        winGameSound = this.add.audio('win-game');
        winGameSound.volume = 0.2;
        winGameSound.play();
        btnSound = this.add.audio('button-sound');
        this.stage.backgroundColor = '#f95732';
        this.add.sprite(0, this.world.height - 400, 'flowers');

        title = this.add.bitmapText(this.world.centerX, 50, 'Fira',
            'YOU DID IT!', 50);
        title.tint = 0x000000;
        title.anchor.setTo(0.5, 0.5);

        textarea = this.add.graphics(0, 0);
        textarea.beginFill(0xffffff);
        textarea.drawRect(this.world.centerX - 300, 80, 600, 280);
        textarea.endFill();

        intro = 'Cher Ami became the hero of the war.\nWhile delivering Lost' +
            ' Batallion’s message, she was shot down but managed to take' +
            ' flight again. She arrived back at her loft at division ' +
            'headquarters 40 km to the rear in just 25 minutes, helping ' +
            'to save the lives of the 194 survivors.\nThe pigeon was awarded' +
            ' the Croix de Guerre Medal with a palm Oak Leaf Cluster for her' +
            ' heroic service.';
        introText = this.add.bitmapText(this.world.centerX - 285, 85,
            'Playfair', intro, 24);
        introText.maxWidth = 580;
        introText.tint = 0x000000;

        credits = this.add.button(this.world.centerX - 105,
            this.world.height - 100, 'watch-credits', this.watchCredits, this,
            2, 1, 0);
        menu = this.add.button(this.world.centerX + 105,
            this.world.height - 100, 'to-menu', this.mainMenu, this, 2, 1, 0);
        credits.anchor.setTo(0.5, 0.5);
        menu.anchor.setTo(0.5, 0.5);
    }
    watchCredits () {
        btnSound.play();
        this.state.start('GameCredits');
    }
    mainMenu () {
        btnSound.play();
        this.state.start('Intro');
    }
}
