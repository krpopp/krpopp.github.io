BasicGame.Game = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //  the tween manager
    this.state; //	the state manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

        this.game.stage.backgroundColor = '#000000';
        this.isDown = false;
        this.game.score = 0;
        this.physics.setBoundsToWorld(false, true, false, true);
        this.bg = this.add.sprite(-20, -20, 'bg');
        this.skyPieces = this.add.group();
        this.skyPieces.enableBody = true;
        this.skyPieces.physicsBodyType = Phaser.Physics.ARCADE;

        this.starSprite = ['star1', 'star2', 'star3'];
        this.starPieces = this.add.group();
        this.starPieces.enableBody = true;
        this.starPieces.physicsBodyType = Phaser.Physics.ARCADE;

        this.cloudSprite = ['cloud1', 'cloud2'];
        this.cloudPieces = this.add.group();
        this.cloudPieces.enableBody = true;
        this.cloudPieces.physicsBodyType = Phaser.Physics.ARCADE;

        this.mtnSprite = ['mtn1', 'mtn2', 'mtn3', 'mtn4', 'mtn5', 'mtn6', 'mtn7', 'mtn8'];
        this.mtnPieces = this.add.group();
        this.mtnPieces.enableBody = true;
        this.mtnPieces.physicsBodyType = Phaser.Physics.ARCADE;

        this.roadPieces = this.add.group();
        this.roadPieces.enableBody = true;
        this.roadPieces.physicsBodyType = Phaser.Physics.ARCADE;

        this.sunPieces = this.add.group();
        this.sunPieces.enableBody = true;
        this.sunPieces.physicsBodyType = Phaser.Physics.ARCADE;


        this.sky = this.skyPieces.create(0, 0, 'sprites', 'sky');
        this.sky2 = this.skyPieces.create(this.sky.width - 4, 0, 'sprites', 'sky');
        this.sky3 = this.skyPieces.create(-132, 0, 'sprites', 'sky');

        this.upsideDownSky = this.skyPieces.create(0, 1, 'sprites', 'sky');
        this.upsideDownSky.scale.y *= -1;
        this.upsideDownSky2 = this.skyPieces.create(this.sky.width - 2, 1, 'sprites', 'sky');
        this.upsideDownSky2.scale.y *= -1;
        this.upsideDownSky3 = this.skyPieces.create(-134, 1, 'sprites', 'sky');
        this.upsideDownSky3.scale.y *= -1;

        this.sun = this.sunPieces.create(this.game.width / 1.5, this.game.height / 3.3, 'sprites', 'sun');
        this.sunglow = this.sunPieces.create(this.game.width / 1.6, this.game.height / 3.5, 'sprites', 'sunglow');

        this.stars = this.starPieces.create(0, 0, 'sprites', this.starSprite[Math.floor(Math.random() * this.starSprite.length)]);
        this.stars2 = this.starPieces.create(this.stars.width, 0, 'sprites', this.starSprite[Math.floor(Math.random() * this.starSprite.length)]);
        this.stars3 = this.starPieces.create(-this.stars.width, 0, 'sprites', this.starSprite[Math.floor(Math.random() * this.starSprite.length)]);
        this.stars4 = this.starPieces.create(0, -20, 'sprites', this.starSprite[Math.floor(Math.random() * this.starSprite.length)]);

        this.cloud = this.cloudPieces.create(0, this.game.height / 3.4, 'sprites', this.cloudSprite[Math.floor(Math.random() * this.cloudSprite.length)]);
        this.cloud2 = this.cloudPieces.create(this.game.width / 2, this.game.height / 3.4, 'sprites', this.cloudSprite[Math.floor(Math.random() * this.cloudSprite.length)]);
        this.cloud3 = this.cloudPieces.create(-50, this.game.height / 3.4, 'sprites', this.cloudSprite[Math.floor(Math.random() * this.cloudSprite.length)]);
        this.cloud4 = this.cloudPieces.create(-100, this.game.height / 3.4, 'sprites', this.cloudSprite[Math.floor(Math.random() * this.cloudSprite.length)]);

        this.road = this.roadPieces.create(0, this.sky.height, 'sprites', 'road');
        this.road2 = this.roadPieces.create(-this.road.width, this.sky.height, 'sprites', 'road');
        this.road3 = this.roadPieces.create(this.road.width, this.sky.height, 'sprites', 'road');

        this.roadline = this.roadPieces.create(this.game.width / 2, this.sky.height, 'sprites', 'roadline');
        this.roadline2 = this.roadPieces.create(this.game.width / 2, this.sky.height + 150, 'sprites', 'roadline');

        this.mtnline = this.mtnPieces.create(0, this.game.height / 1.72, 'sprites', 'mtnline');
        this.mtnline2 = this.mtnPieces.create(this.mtnline.width, this.game.height / 1.72, 'sprites', 'mtnline');
        this.mtnline3 = this.mtnPieces.create(-this.mtnline.width, this.game.height / 1.72, 'sprites', 'mtnline');

        this.mtn1 = this.mtnPieces.create(0, this.game.height / 1.85, 'sprites', this.mtnSprite[Math.floor(Math.random() * this.mtnSprite.length)]);
        this.mtn4 = this.mtnPieces.create(this.game.width / 2, this.game.height / 1.85, 'sprites', this.mtnSprite[Math.floor(Math.random() * this.mtnSprite.length)]);
        this.mtn3 = this.mtnPieces.create(-50, this.game.height / 1.85, 'sprites', this.mtnSprite[Math.floor(Math.random() * this.mtnSprite.length)]);
        this.mtn2 = this.mtnPieces.create(-100, this.game.height / 1.85, 'sprites', this.mtnSprite[Math.floor(Math.random() * this.mtnSprite.length)]);

        this.roadPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 2;
        }, this);

        this.skyPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 0.5;
            piece.body.velocity.y = 0.2;
        }, this);

        this.sunPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 0.05;
            piece.body.velocity.y = 0.2;
        }, this);

        this.mtnPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 0.5 + Math.random() * 0.5;
        }, this);

        this.starPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 0.2 + Math.random() * 0.5;
            piece.body.velocity.y = 0.2;
        }, this);

        this.cloudPieces.forEach(function (piece) {
            piece.checkWorldBounds = true;
            piece.events.onOutOfBounds.add(this.pieceOut, this);
            piece.body.velocity.x = 0.5 + Math.random() * 0.5;
        }, this);




        this.car = this.add.sprite(50, this.game.height / 1.8, 'sprites', 'car2');
        this.car.animations.add('carAnim', ['car2', 'car1', 'car'], 1, false);
        this.physics.arcade.enable(this.car);
        this.car.visible = false;

        this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(3, 5)), this.carStart, this);

        this.turtle = this.add.sprite(this.game.width / 2, this.road.y - 10, 'player', 'walk1');
        this.physics.arcade.enable(this.turtle);


        this.turtle.animations.add('turtleWalk', ['walk1', 'walk2'], 2, true);
        this.turtle.animations.add('turtleShell', ['shell1', 'shell2', 'shell3', 'shell4'], 10, false);
        this.turtle.animations.add('turtleUnShell', ['shell4', 'shell3', 'shell2', 'shell1'], 10, false);
        this.turtle.animations.play('turtleWalk');

        this.scoreUI = this.add.bitmapText(5, 5, 'counter', 'Dst: ' + this.game.score.toString() + " cm", 8);


        this.time.events.loop(Phaser.Timer.SECOND * 5, this.upScore, this);

        this.fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',


        "float noise(vec2 pos) {",
            "return fract(sin(dot(pos, vec2(12.9898 - time,28.233 + time))) * 43758.5453);",
        "}",

        "void main( void ) {",

            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
            "float pos = (gl_FragCoord.y / resolution.y);",
            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
            "float distortion = clamp(0.8 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",

            "pos -= (distortion * distortion) * 0.2;",

            "float c = sin(pos * 800.0) * 0.6 + 0.4;",
            "c = pow(c, 0.08);",
            "c *= 1.3;",

            "float band_pos = fract(time * 0.2) * 8.0 - 1.0;",
            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",

            "c += distortion * 0.18;",
            "// noise",
            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.19);",

            "gl_FragColor = c * texture2D(uSampler, vTextureCoord);",
        "}"
    ];

        this.filter = new Phaser.Filter(this.game, null, this.fragmentSrc);
        this.filter.setResolution(200, 400);

        this.world.filters = [this.filter];

        this.game.input.onDown.add(this.stopAllPhysics, this);
        this.game.input.onUp.add(this.startAllPhysics, this);

    },

    carStart: function () {
        this.car.visible = true;
        this.car.frame = 0;
        this.car.position.x = this.game.rnd.integerInRange(30, 60);
        this.car.body.velocity.x = this.game.rnd.integerInRange(5, 9);
        this.car.animations.play('carAnim');
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.carEnd, this);
    },

    carEnd: function () {
        this.car.animations.stop();
        this.car.body.velocity.x = 0;
        this.car.visible = false;
        this.game.time.events.add(Phaser.Timer.SECOND * (this.game.rnd.integerInRange(3, 25)), this.carStart, this);
    },

    upScore: function () {
        if (!this.isDown) {
            this.game.score += 1;
            this.scoreUI.text = 'Dst: ' + this.game.score.toString() + " cm";
        }
    },

    pieceOut: function (item) {
        switch (item._frame.name) {
            case 'sky':
                item.reset(-134, item.y);
                item.body.velocity.x = 0.5;
                item.body.velocity.y = 0.2;
                break;
            case 'star1':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), this.game.rnd.integerInRange(-10, 10));
                item.body.velocity.x = 0.2 + Math.random() * 0.5;
                item.body.velocity.y = 0.2;
                break;
            case 'star2':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), this.game.rnd.integerInRange(-10, 10));
                item.body.velocity.x = 0.2 + Math.random() * 0.5;
                item.body.velocity.y = 0.2;
                break;
            case 'star3':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), this.game.rnd.integerInRange(-10, 10));
                item.body.velocity.x = 0.2 + Math.random() * 0.5;
                item.body.velocity.y = 0.2;
                break;
            case 'cloud1':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), this.game.rnd.integerInRange(-10, 150));
                item.body.velocity.x = 0.2 + Math.random() * 0.5;
                break;
            case 'cloud2':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), this.game.rnd.integerInRange(-10, 150));
                item.body.velocity.x = 0.2 + Math.random() * 0.5;
                break;
            case 'road':
                item.reset(-item.width, item.y);
                item.body.velocity.x = 2;
                break;
            case 'roadline':
                item.reset(-item.width, item.y);
                item.body.velocity.x = 2;
                break;
            case 'mtn1':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn2':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn3':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn4':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn5':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn6':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn7':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
            case 'mtn8':
                item.reset(this.game.rnd.integerInRange(-item.width - 20, -item.width - 5), item.y);
                item.body.velocity.x = 0.5 + Math.random() * 0.5;
                break;
        }

        console.log(item._frame.name);
    },

    stopAllPhysics: function () {
        this.turtle.animations.stop();
        this.turtle.animations.play('turtleShell');
        if (this.car.visible) {
            this.car.body.velocity.x = 0;
        }
        this.roadPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);

        this.skyPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);

        this.sunPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);

        this.mtnPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);

        this.starPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);

        this.cloudPieces.forEach(function (piece) {
            piece.body.velocity.x = 0;
        }, this);
    },

    startAgain: function () {
        this.turtle.animations.play('turtleWalk');

        if (this.car.visible) {
            this.car.body.velocity.x = 6;
        }


        this.roadPieces.forEach(function (piece) {

            piece.body.velocity.x = 2;
        }, this);

        this.skyPieces.forEach(function (piece) {

            piece.body.velocity.x = 0.5;
        }, this);

        this.sunPieces.forEach(function (piece) {

            piece.body.velocity.x = 0.05;
        }, this);

        this.mtnPieces.forEach(function (piece) {

            piece.body.velocity.x = 0.5 + Math.random() * 0.5;
        }, this);

        this.starPieces.forEach(function (piece) {

            piece.body.velocity.x = 0.2 + Math.random() * 0.5;
        }, this);

        this.cloudPieces.forEach(function (piece) {

            piece.body.velocity.x = 0.5 + Math.random() * 0.5;
        }, this);
    },

    startAllPhysics: function () {
        //this.turtle.animations.play('turtleWalk');
        this.turtle.animations.play('turtleUnShell');
        this.game.time.events.add(Phaser.Timer.SECOND, this.startAgain, this);
    },

    update: function () {

        if (this.car.visible) {
            if (this.checkOverlap(this.turtle, this.car)) {
                if (!this.isDown) {
                    if (this.car._frame.name == "car") {
                        this.state.start('ScoreScreen');
                        console.log("hit");
                    }
                }
            } else {

            }
        }

        if (this.game.input.activePointer.isDown) {
            //this.turtle.animations.stop();
            this.isDown = true;
        } else {
            this.isDown = false;
            //this.turtle.animations.play('turtleAnim');

        }
        this.filter.update(this.game.input.activePointer);
    },

    checkOverlap: function (spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    }

};
