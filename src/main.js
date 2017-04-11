import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Intro from './states/Intro';
import IntroLVL1 from './states/IntroLVL1';
import IntroLVL2 from './states/IntroLVL2';
import IntroLVL3 from './states/IntroLVL3';
import HowToPlay from './states/HowToPlay';
import MainGame from './states/MainGame';
import GameOver from './states/GameOver';
import Puzzle1 from './states/Puzzle1';
import Puzzle2 from './states/Puzzle2';
import Puzzle3 from './states/Puzzle3';

class Game extends Phaser.Game {
    constructor () {
        super(1000, 560, Phaser.AUTO, '', null);
        this.state.add('Boot', Boot, false);
        this.state.add('Intro', Intro, false);
        this.state.add('IntroLVL1', IntroLVL1, false);
        this.state.add('IntroLVL2', IntroLVL2, false);
        this.state.add('IntroLVL3', IntroLVL3, false);
        this.state.add('HowToPlay', HowToPlay, false);
        this.state.add('MainGame', MainGame, false);
        this.state.add('GameOver', GameOver, false);
        this.state.add('Puzzle1', Puzzle1, false);
        this.state.add('Puzzle2', Puzzle2, false);
        this.state.add('Puzzle3', Puzzle3, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
