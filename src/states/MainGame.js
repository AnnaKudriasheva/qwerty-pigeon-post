import Phaser from 'phaser';

let startBtnSound;
let loadingWidth;
let loadingBar;
let spaceValue = false;
let cannonball;
let spacefield;
let firstaids;
let scoreText;
let progress;
let emitter;
let cursors;
let grapes;
let weapon;
let apples;
let memory;
let letter;
let plums;
let pears;
let score = 0;
let trees;
let bird;
let keys;

export default class extends Phaser.State {
    preload () {
        loadingBar = this.add.sprite(this.game.world.centerX,
            this.game.world.centerY, 'progress-bar');
        loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(loadingBar);

        this.load.image('parallax-back', 'assets/img/parallax-back.png');
        this.load.image('parallax-front', 'assets/img/parallax-front.png');
        this.load.image('message', 'assets/img/letter.png');
        this.load.image('firstaids', 'assets/img/firstaid.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('cannonball', 'assets/img/core.png');
        this.load.image('apples', 'assets/img/apple.png');
        this.load.image('pears', 'assets/img/pear.png');
        this.load.image('plums', 'assets/img/plum.png');
        this.load.image('grapes', 'assets/img/grape.png');
        this.load.spritesheet('rain', 'assets/img/rain.png');
        this.load.spritesheet('bird', 'assets/img/pigeon.png', 211, 211);
        this.load.audio('wings-sound', './assets/sounds/wings-sound.mp3');
    }

    create () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.input.onDown.add(() => this.scale.startFullScreen());
        // add audio
        startBtnSound = this.add.audio('wings-sound');
        startBtnSound.loopFull();

        spacefield = this.add.tileSprite(0, 0, 1000, 560, 'parallax-back');
        trees = this.add.tileSprite(0, 0, 1000, 560, 'parallax-front');

        letter = this.add.sprite(170, 65, 'message');
        this.physics.arcade.enable(letter);
        letter.scale.set(0.4);

        bird = this.add.sprite(50, 672 / 4, 'bird');
        bird.scale.set(0.5);
        this.physics.arcade.enable(bird);
        bird.animations.add('fly', [0, 1, 2, 3], 8, true);
        bird.body.collideWorldBounds = true;
        bird.addChild(letter);

        firstaids = this.add.group();
        apples = this.add.group();
        pears = this.add.group();
        plums = this.add.group();
        grapes = this.add.group();

        memory = {
            pears,
            apples,
            grapes,
            firstaids,
            plums
        };

        keys = Object.keys(memory);

        for (let key in memory) {
            memory[key].enableBody = true;
        }

        this.time.events.repeat(Phaser.Timer.SECOND * 5, 100,
            this.fallingSubjects, this, memory);
        // create rain emitter
        emitter = this.add.emitter(this.world.centerX, 0, 400);
        emitter.width = this.world.width;
        emitter.makeParticles('rain');
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.3;
        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 1600, 5, 0);

        weapon = this.add.weapon(1, 'bullet');
        this.time.events.add(Phaser.Timer.SECOND * 2,
            this.addBulletsToWeapon, this);

        cannonball = this.add.weapon(1, 'cannonball');
        this.time.events.add(Phaser.Timer.SECOND * 5,
            this.addBulletsToCannonBall, this);

        cursors = this.input.keyboard.createCursorKeys();
        cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // add progress bar
        progress = this.add.graphics(0, 0);
        progress.lineStyle(4, '0x00ff06');
        progress.drawRoundedRect(this.world.width - 330, 30, 300, 30, 9);
        loadingWidth = 296;

        progress.lineStyle(0);
        progress.beginFill('0xf6ff00');
        progress.drawRoundedRect(this.world.width - 328, 32, loadingWidth, 26, 9);
        progress.endFill();

        this.time.events.repeat(Phaser.Timer.SECOND * 0.5, 300,
            this.loadProgress, this);

        scoreText = this.add.text(this.world.width - 230, 80, 'score: 0', {
            font: '40px Helvetica',
            fill: 'red'
        });

        spaceValue = false;
        score = 0;
        // this.time.events.add(Phaser.Timer.SECOND * 10, this.pigeonDeath, this);
    }

    update () {
        for (let key in memory) {
            this.physics.arcade.overlap(bird, memory[key], this.collectObjects);
            this.physics.arcade.collide(weapon.bullets, memory[key],
                (first, second) => second.kill());
            this.physics.arcade.collide(cannonball.bullets, memory[key],
                (first, second) => second.kill());
        }

        this.physics.arcade.collide(bird, weapon.bullets, (first, second) => {
            second.kill();
            loadingWidth -= 0.1 * 296;
        });

        this.physics.arcade.collide(bird, cannonball.bullets,
            (first, second) => loadingWidth = 0);

        this.physics.arcade.collide(weapon.bullets, cannonball.bullets,
            (weapon, cannonball) => weapon.kill());

        // if (spaceValue) {
        //  letter.body.gravity.y = 5000;
        //  letter.body.velocity.x = -30;
        //  letter.angle += 1;
        // } else {
        //  letter.body.velocity.x = 0;
        // }

        // letter.body.velocity.y = 0;

        bird.body.velocity.x = 0;
        bird.body.velocity.y = 0;
        bird.animations.play('fly');
        bird.animations.getAnimation('fly').speed = 8;
        spacefield.tilePosition.x -= 1.5;
        trees.tilePosition.x -= 2.25;

        for (let key in memory) {
            memory[key].setAll('body.velocity.x', -200);
        }
        if (cursors.up.isDown) {
            bird.body.velocity.y = -300;
            bird.animations.getAnimation('fly').speed = 12;
        }
        if (cursors.down.isDown) {
            bird.body.velocity.y = 300;
            bird.animations.getAnimation('fly').speed = 6;
        }
        if (cursors.left.isDown) {
            spacefield.tilePosition.x -= -1;
            trees.tilePosition.x -= -1.5;
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -120);
            }
        }
        if (cursors.right.isDown) {
            spacefield.tilePosition.x -= 2;
            trees.tilePosition.x -= 3;
            bird.animations.getAnimation('fly').speed = 12;
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -280);
            }

            loadingWidth -= 0.01 * 296 / 60;
        }
        if (cursors.space.isDown) {
            spaceValue = true;
        }

        weapon.x = (Math.random() * 0.8 * 1000) + 0.2 * 1000;
        cannonball.x = (Math.random() * 0.7 * 1000) + 0.3 * 1000;

        this.loadProgress();
    }

    pigeonDeath () {
        bird.kill();
        startBtnSound.stop();
        this.state.start('GameOver');
    }

    fallingSubjects (memory) {
        let number = Math.floor(Math.random() * keys.length);
        let example = memory[keys[number]].create((Math.random() * 0.5 * 1000) +
            0.2 * 1200, -2, keys[number]);
        example.body.velocity.y = 150;
    }

    collectObjects (first, second) {
        second.kill();
        score += 10;
        scoreText.text = 'score: ' + score;
        loadingWidth += 0.05 * 296;
    }

    addBulletsToCannonBall () {
        cannonball.bullets.forEach((bul) => bul.scale.set(0.25));
        cannonball.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        cannonball.bulletSpeed = 700;
        cannonball.fireRate = 5000;
        cannonball.fireAngle = 230;
        cannonball.fireFrom.setTo(this.world.width - this.world.width / 3,
            this.world.height);
        cannonball.autofire = true;
        cannonball.bulletGravity.y = 300;
    }

    addBulletsToWeapon () {
        weapon.bullets.forEach((bul) => bul.scale.set(0.2));
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 700;
        weapon.fireRate = 1500;
        weapon.fireAngle = 210;
        weapon.bulletAngleOffset = 160;
        weapon.fireFrom.setTo(0, this.world.height);
        weapon.autofire = true;
    }

    loadProgress () {
        progress.clear();

        progress.lineStyle(4, '0x00ff06');
        progress.drawRoundedRect(this.world.width - 330, 30, 300, 30, 9);

        progress.lineStyle(0);
        progress.beginFill('0xf6ff00');
        progress.drawRoundedRect(this.world.width - 328, 32, loadingWidth, 26, 9);
        progress.endFill();

        loadingWidth -= 0.01 * 296 / 60;

        if (loadingWidth > 296) {
            loadingWidth = 296;
        }

        if (loadingWidth < 0) {
            this.pigeonDeath();
        }
    }
}
