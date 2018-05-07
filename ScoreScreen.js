BasicGame.ScoreScreen = function (game) {

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

BasicGame.ScoreScreen.prototype = {

    create: function () {


        this.bg = this.add.sprite(0, 0, 'bg');

        this.road = this.add.sprite(0, this.world.height / 3, 'title', 'road');
        this.road1 = this.add.sprite(0, this.world.height, 'title', 'road');
        this.line = this.add.sprite(this.world.width / 2, this.world.height / 2.8, 'scoreStuff', 'line');
        this.line.anchor.setTo(0.5, 0);

        this.line2 = this.add.sprite(this.world.width / 2, -100, 'scoreStuff', 'line');
        this.line2.anchor.setTo(0.5, 0);

        this.line3 = this.add.sprite(this.world.width / 2, this.world.height - 50, 'scoreStuff', 'line');
        this.line3.anchor.setTo(0.5, 0);

        for (var i = 0; i < 5; i++) {
            this.makeBlood(this.game.rnd.integerInRange(1, 4));
        }

        this.distanceBottom = this.add.sprite((this.world.width / 2) - 1, (this.world.height / 4) + 1, 'scoreStuff', 'distancegreen');
        this.distanceBottom.anchor.setTo(0.5, 0.5);
        this.distanceBottom.scale.setTo(0.5, 0.5);
        this.distanceTop = this.add.sprite(this.world.width / 2, this.world.height / 4, 'scoreStuff', 'distancepink');
        this.distanceTop.anchor.setTo(0.5, 0.5);
        this.distanceTop.scale.setTo(0.5, 0.5);

        this.arrowBottom = this.add.sprite((this.world.width / 3.6) - 1, (this.world.height / 1.9) + 0.3, 'scoreStuff', 'arrowpink');
        this.arrowBottom.anchor.setTo(0.5, 0.5);
        this.arrowBottom.scale.setTo(0.8, 0.8);
        this.arrowTop = this.add.sprite(this.world.width / 3.6, this.world.height / 1.9, 'scoreStuff', 'arrowgreen');
        this.arrowTop.anchor.setTo(0.5, 0.5);
        this.arrowTop.scale.setTo(0.8, 0.8);
        this.arrowTop.inputEnabled = true;
        this.arrowTop.events.onInputDown.add(this.restart, this);

        this.startBottom = this.add.sprite((this.world.width / 4) - 1, (this.world.height / 2) + 0.3, 'scoreStuff', 'traagaingreen');
        this.startBottom.anchor.setTo(0.5, 0.5);
        this.startBottom.scale.setTo(0.8, 0.8);
        this.startTop = this.add.sprite(this.world.width / 4, this.world.height / 2, 'scoreStuff', 'tryagainpink');
        this.startTop.inputEnabled = true;
        this.startTop.events.onInputDown.add(this.restart, this);


        this.startTop.anchor.setTo(0.5, 0.5);
        this.startTop.scale.setTo(0.8, 0.8);


        this.birdBottom = this.add.sprite((this.world.width / 1.2) - 1, (this.world.height / 2) + 1, 'scoreStuff', 'birdgreen');
        this.birdBottom.anchor.setTo(0.5, 0.5);
        this.birdBottom.scale.setTo(0.8, 0.8);
        this.birdTop = this.add.sprite(this.world.width / 1.2, this.world.height / 2, 'scoreStuff', 'birdpink');
        this.birdTop.anchor.setTo(0.5, 0.5);
        this.birdTop.scale.setTo(0.8, 0.8);
        this.tweetBottom = this.add.sprite((this.world.width / 1.4) - 1, (this.world.height / 1.9) + 1, 'scoreStuff', 'tweetpink');
        this.tweetBottom.anchor.setTo(0.5, 0.5);
        this.tweetBottom.scale.setTo(0.8, 0.8);
        this.tweetTop = this.add.sprite(this.world.width / 1.4, this.world.height / 1.9, 'scoreStuff', 'tweetgreen');
        this.tweetTop.anchor.setTo(0.5, 0.5);
        this.tweetTop.scale.setTo(0.8, 0.8);


        this.scoreUI = this.add.bitmapText(this.world.width / 1.8, this.world.height / 3, 'counter', this.game.score + " cm", 20);
        this.scoreUI.anchor.setTo(0.5, 0.5);



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

    },

    restart: function () {
        console.log('uh hey');
        this.state.start('Game');
    },

    makeBlood: function (pickedBlood) {
        var angles = [0, 90, 180];

        this.blood1 = this.add.sprite(this.world.width + (this.game.rnd.integerInRange(-180, 10)), this.world.height + (this.game.rnd.integerInRange(-350, 5)), 'scoreStuff', 'splat' + pickedBlood + 1);
        this.blood1.anchor.setTo(0.5, 0.5);
        this.blood1.angle += angles[this.game.rnd.integerInRange(0, 2)];
        this.blood1.animations.add('bloodAnim', ['splat' + pickedBlood + 5, 'splat' + pickedBlood + 4, 'splat' + pickedBlood + 3, 'splat' + pickedBlood + 2, 'splat' + pickedBlood + 1], 20, false);
        this.blood1.animations.play('bloodAnim');
    },

    update: function () {
        this.filter.update(this.game.input.activePointer);

    }

};
