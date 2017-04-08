import Phaser from 'phaser';

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#f2f2f2';
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    preload () {
        this.load.image('progress-bar', './assets/img/loading-bar.gif');
    }
    create () {
        this.state.start('Intro');
    }
}
