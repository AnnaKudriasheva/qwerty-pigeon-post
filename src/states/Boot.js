import Phaser from 'phaser';

export default class extends Phaser.State {
    init () {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    create () {
        this.state.start('Intro');
    }
}
