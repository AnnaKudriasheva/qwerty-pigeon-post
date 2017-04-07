import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Intro from './states/Intro';
import Start from './states/Start';
import MainGame from './states/MainGame';
import GameOver from './states/GameOver';

class Game extends Phaser.Game {
    constructor () {
        super(1000, 560, Phaser.AUTO, '', null);
        this.state.add('Boot', Boot, false);
        this.state.add('Intro', Intro, false);
        this.state.add('Start', Start, false);
        this.state.add('MainGame', MainGame, false);
        this.state.add('GameOver', GameOver, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
