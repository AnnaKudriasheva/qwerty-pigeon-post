import Phaser from 'phaser';

let startBtnSound;
let distanceText;
let loadingWidth;
let collectSound;
let eventsMemory = [];
let spaceValue;
let cannonball;
let spacefield;
let firstaids;
let birdSpeed;
let scoreText;
let timerText;
let progress;
let distance;
let emitter;
let cursors;
let grapes;
let weapon;
let apples;
let memory;
let letter;
let plums;
let pears;
let score;
let trees;
let bird;
let keys;
let level;
let factor;
let timer = {};

export default class extends Phaser.State {
    init (levelNumber) {
        level = levelNumber;

        if (level === 1) {
            factor = 1;
            timer.milliseconds = 180 * 1000;
            timer.value = '03:00';
            distance = 500;
            birdSpeed = 4.2;
        } else if (level === 2) {
            factor = 1.5;
            timer.milliseconds = 90 * 1000;
            timer.value = '01:30';
            distance = 1000;
            birdSpeed = 12;
        } else {
            factor = 2;
            timer.milliseconds = 45 * 1000;
            timer.value = '00:45';
            distance = 1500;
            birdSpeed = 27;
        }
    }

    create () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.input.onDown.add(() => this.scale.startFullScreen());
        // audio
        startBtnSound = this.add.audio('wings-sound');
        collectSound = this.add.audio('collect-sound');
        collectSound.volume = 0.2;
        startBtnSound.loopFull();
        // level background
        spacefield = this.add.tileSprite(0, 0, 1000, 560, `parallax-back${level}`);
        trees = this.add.tileSprite(0, 0, 1000, 560, `parallax-front${level}`);

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

        eventsMemory.push(this.time.events.repeat(3000 * level, 100,
            this.fallingSubjects, this, memory));

        if (level === 2) {
            // create rain emitter
            emitter = this.add.emitter(this.world.centerX, 0, 400);
            emitter.width = this.world.width;
            emitter.makeParticles('rain');
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 0);
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.start(false, 1000, 10, 0);
        }

        weapon = this.add.weapon(1, 'bullet');
        this.time.events.add(3000, this.addBulletsToWeapon, this);

        cannonball = this.add.weapon(1, 'cannonball');
        this.time.events.add(5000, this.addBulletsToCannonBall, this);

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

        scoreText = this.add.text(this.world.width - 230, 80, 'score: 0', {
            font: '40px Montserrat',
            fill: 'red'
        });

        spaceValue = false;
        score = 0;

        timerText = this.add.text(250, 25, timer.value, {
            font: '40px Montserrat',
            fill: 'green'
        });

        distanceText = this.add.text(450, 25, `${distance}m`, {
            font: '40px Montserrat',
            fill: 'blue'
        });

        eventsMemory.push(this.time.events.repeat(1000, 200, this.changeTimer,
            this, timer));
        eventsMemory.push(this.time.events.repeat(200, 2000, this.changeDistance,
            this));
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

        // bird.body.velocity.x = 0;
        bird.body.velocity.y = 0;

        bird.animations.play('fly');
        bird.animations.getAnimation('fly').speed = 8 * factor / 1.25;
        spacefield.tilePosition.x -= 1.5 * factor;
        trees.tilePosition.x -= 2.25 * factor;

        for (let key in memory) {
            memory[key].setAll('body.velocity.x', -150 * factor);
        }

        if (cursors.up.isDown) {
            bird.body.velocity.y = -200 * factor;
            bird.animations.getAnimation('fly').speed = 10 * factor;
        }

        if (cursors.down.isDown) {
            bird.body.velocity.y = 200 * factor;
            bird.animations.getAnimation('fly').speed = 6 * factor;
        }

        // if (cursors.left.isDown) {
        //     spacefield.tilePosition.x -= -1 * factor * 0.6;
        //     trees.tilePosition.x -= -1.5 * factor * 0.6;
        //     for (let key in memory) {
        //         memory[key].setAll('body.velocity.x', -100 * factor * 0.5);
        //     }
        // }

        if (cursors.right.isDown) {
            spacefield.tilePosition.x -= 1.8 * factor;
            trees.tilePosition.x -= 2.7 * factor;
            bird.animations.getAnimation('fly').speed = 10 * factor;
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -250 * factor);
            }

            loadingWidth -= 0.01 * 296 / 60;
            distance -= 0.5 * birdSpeed / 60
        }

        weapon.x = (Math.random() * 0.8 * 1000) + 0.2 * 1000;
        cannonball.x = (Math.random() * 0.7 * 1000) + 0.3 * 1000;

        this.loadProgress();

        if (spaceValue) {
            letter.angle += 1;
        }
    }

    pigeonDeath () {
        bird.kill();
        startBtnSound.stop();
        this.state.start('GameOver', true, false , level);
    }

    fallingSubjects (memory) {
        let number = Math.floor(Math.random() * keys.length);
        let example = memory[keys[number]].create((Math.random() * 0.5 * 1000) +
            0.2 * 1200, -2, keys[number]);
        example.body.velocity.y = 100 * factor;
    }

    collectObjects (first, second) {
        second.kill();
        collectSound.play();
        score += 10;
        scoreText.text = 'score: ' + score;
        loadingWidth += 0.05 * 296;
    }

    addBulletsToCannonBall () {
        cannonball.bullets.forEach((bul) => bul.scale.set(0.25));
        cannonball.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        cannonball.bulletSpeed = 600 * factor;
        cannonball.fireRate = 10000 / factor;
        cannonball.fireAngle = 230;
        cannonball.fireFrom.setTo(this.world.width - this.world.width / 3,
            this.world.height);
        cannonball.autofire = true;
        cannonball.bulletGravity.y = 400 * factor;
    }

    addBulletsToWeapon () {
        weapon.bullets.forEach((bul) => bul.scale.set(0.2));
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 500 * factor;
        weapon.fireRate = 5000 / factor;
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

        if (loadingWidth <= 0) {
            this.pigeonDeath();
        }
    }

    changeTimer (timer) {
        timer.milliseconds -= 1000;
        let date = new Date(timer.milliseconds);
        let minutes = date.getMinutes();
        if (String(minutes).length < 2) {
            minutes = '0' + minutes;
        }
        let seconds = date.getSeconds();
        if (String(seconds).length < 2) {
            seconds = '0' + seconds;
        }

        timerText.text = `${minutes}:${seconds}`;

        if (minutes === 0 && seconds === 0) {
            setTimeout(() => alert('Game over'), 500);
        }
    }

    changeDistance () {
        distance -= (birdSpeed / 5);
        distanceText.text = `${parseInt(distance)}m`;
        // letter.body.velocity.y = 0;
        if (distance <= 0 && timer.milliseconds >= 0) {
            bird.body.velocity.x = 200;

            let that = this;
            eventsMemory.forEach((event) => that.time.events.remove(event));
            distanceText.text = '';
            timerText.text = '';
            cannonball.autofire = false;
            weapon.autofire = false;

            spaceValue = true;
            letter.body.gravity.y = 300;
            letter.body.gravity.x = -150;

            setTimeout(() => this.state.start('Puzzle1'), 3000);
        }
    }
}
