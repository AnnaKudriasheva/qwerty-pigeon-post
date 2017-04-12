import Phaser from 'phaser';

let startBtnSound;
let distanceText;
let loadingWidth;
let collectSound;
let eventsMemory = [];
let bulletSound;
let spaceValue;
let spacefield;
let firstaids;
let hawkSound;
let birdSpeed;
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
let hawks;
let heart;
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
            timer.milliseconds = 90 * 1000;
            timer.value = '01:30';
            distance = 250;
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
        bulletSound = this.add.audio('bullet-sound');
        bulletSound.volume = 0.2;
        startBtnSound = this.add.audio('wings-sound');
        startBtnSound.loopFull();
        collectSound = this.add.audio('collect-sound');
        collectSound.volume = 0.2;
        hawkSound = this.add.audio('hawk-sound');
        hawkSound.volume = 0.2;
        // level background
        spacefield = this.add.tileSprite(0, 0, 1000, 560, `parallax-back${level}`);
        trees = this.add.tileSprite(0, 0, 1000, 560, `parallax-front${level}`);

        letter = this.add.sprite(607, 140, 'message');
        this.physics.arcade.enable(letter);

        bird = this.add.sprite(50, 672 / 4, 'bird');
        bird.scale.set(0.2);
        this.physics.arcade.enable(bird);
        bird.animations.add('fly', [0, 1, 2, 3], 8, true);
        bird.body.collideWorldBounds = true;
        bird.addChild(letter);
        bird.body.immovable = true;

        hawks = this.add.group();
        hawks.enableBody = true;

        eventsMemory.push(this.time.events.repeat(9000 / level, 200,
            this.emitHawks, this));

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
        cursors = this.input.keyboard.createCursorKeys();
        cursors.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors.W = this.input.keyboard.addKey(Phaser.Keyboard.W);
        cursors.D = this.input.keyboard.addKey(Phaser.Keyboard.D);
        cursors.S = this.input.keyboard.addKey(Phaser.Keyboard.S);

        heart = this.add.sprite(this.world.width - 275, 33, 'heart');
        heart.scale.set(0.06);

        // add progress bar
        progress = this.add.graphics(0, 0);
        progress.lineStyle(2, '0xffffff');
        progress.drawRoundedRect(this.world.width - 229, 38, 198, 20, 9);
        loadingWidth = 196;
        progress.lineStyle(0);
        progress.beginFill('0xf95731');
        progress.drawRoundedRect(this.world.width - 228, 40, loadingWidth, 16, 9);
        progress.endFill();

        spaceValue = false;

        timerText = this.add.text(350, 25, timer.value, {
            font: '40px Montserrat',
            fill: '#fb8f6b'
        });

        distanceText = this.add.text(525, 25, `${distance}m`, {
            font: '40px Montserrat',
            fill: '#85983c'
        });

        eventsMemory.push(this.time.events.repeat(1000, 200, this.changeTimer, this, timer));
        eventsMemory.push(this.time.events.repeat(200, 2000, this.changeDistance, this));
    }

    update () {
        for (let key in memory) {
            this.physics.arcade.overlap(bird, memory[key], this.collectObjects);
            this.physics.arcade.collide(weapon.bullets, memory[key],
                (first, second) => second.kill());
            this.physics.arcade.collide(hawks, memory[key],
                (first, second) => second.kill());
        }

        this.physics.arcade.collide(bird, weapon.bullets, (first, second) => {
            second.kill();
            bulletSound.play();
            if ((loadingWidth - 0.3 * 196) < 10) {
                loadingWidth = 15;
            } else {
                loadingWidth -= 0.3 * 196;
            }
        });

        this.physics.arcade.collide(hawks, weapon.bullets,
            (first, second) => first.kill());
        this.physics.arcade.collide(bird, hawks, (first, second) => {
            loadingWidth = 0;
        });
        bird.body.velocity.y = 0;

        bird.animations.play('fly');
        bird.animations.getAnimation('fly').speed = 8 * factor / 1.25;
        spacefield.tilePosition.x -= 1.5 * factor;
        trees.tilePosition.x -= 2.25 * factor;

        hawks.callAll('play', null, 'flyHawk');
        hawks.setAll('body.velocity.x', -250 * factor);

        for (let key in memory) {
            memory[key].setAll('body.velocity.x', -150 * factor);
        }

        if (cursors.up.isDown || cursors.W.isDown) {
            bird.body.velocity.y = -200 * factor;
            bird.animations.getAnimation('fly').speed = 10 * factor;
        }

        if (cursors.down.isDown || cursors.S.isDown) {
            bird.body.velocity.y = 200 * factor;
            bird.animations.getAnimation('fly').speed = 6 * factor;
        }

        if (cursors.right.isDown || cursors.D.isDown) {
            spacefield.tilePosition.x -= 1.5 * factor;
            trees.tilePosition.x -= 2.25 * factor;
            bird.animations.getAnimation('fly').speed = 10 * factor;
            hawks.setAll('body.velocity.x', -500 * factor);
            for (let key in memory) {
                memory[key].setAll('body.velocity.x', -250 * factor);
            }

            loadingWidth -= 0.01 * 196 / 60;
            distance -= birdSpeed / 60;
        }

        weapon.x = (Math.random() * 0.6 * 1000) + 0.4 * 1000;
        this.loadProgress();
        if (spaceValue) {
            letter.angle += 1;
        }
    }

    pigeonDeath () {
        bird.kill();
        startBtnSound.stop();
        if (!spaceValue) {
            this.state.start('GameOver', true, false, level);
        }
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
        if ((loadingWidth + 0.15 * 196) > 196) {
            loadingWidth = 196;
        } else {
            loadingWidth += 0.15 * 196;
        }
    }

    addBulletsToWeapon () {
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletSpeed = 450 * factor;
        weapon.fireRate = 5000 / factor;
        weapon.fireAngle = 210;
        weapon.bulletAngleOffset = 95;
        weapon.fireFrom.setTo(0, this.world.height);
        weapon.autofire = true;
    }

    loadProgress () {
        progress.clear();

        progress.lineStyle(2, '0xffffff');
        progress.drawRoundedRect(this.world.width - 229, 38, 198, 20, 9);

        progress.lineStyle(0);
        progress.beginFill('0xf95731');
        progress.drawRoundedRect(this.world.width - 228, 40, loadingWidth, 16, 9);
        progress.endFill();

        loadingWidth -= 0.01 * 196 / 60;

        if (loadingWidth > 196) {
            loadingWidth = 196;
        }

        if (loadingWidth <= 15) {
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
            this.pigeonDeath();
        }
    }

    changeDistance () {
        distance -= (birdSpeed / 5);
        distanceText.text = `${parseInt(distance)}m`;
        if (distance <= 0 && timer.milliseconds >= 0) {
            bird.body.velocity.x = 200;

            let that = this;
            eventsMemory.forEach((event) => that.time.events.remove(event));
            loadingWidth = 196;
            distanceText.text = '';
            timerText.text = '';
            weapon.autofire = false;
            spaceValue = true;
            letter.body.gravity.y = 900;
            letter.body.gravity.x = -700;
            setTimeout(() => {
                if (level === 1) {
                    this.state.start('Puzzle1');
                } else if (level === 2) {
                    this.state.start('Puzzle2');
                } else {
                    this.state.start('Puzzle3');
                }
                startBtnSound.stop();
            }, 3000);
        }
    }

    emitHawks () {
        hawkSound.play();
        let hawk = hawks.create(this.world.width, (Math.random() * 0.6 *
            this.world.height) + 0.2 * this.world.height, 'hawk');
        hawk.body.velocity.x = -250 * factor;
        hawk.animations.add('flyHawk', [0, 1, 2, 3, 4, 5, 6], 10 * factor, true);
    }
}
