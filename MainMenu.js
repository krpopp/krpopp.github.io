BasicGame.MainMenu = function (game) {

    this.bg;
    this.spriteTopLeft;
    this.spriteTopRight;
    this.spriteBottomLeft;
    this.spriteBottomRight;

};

BasicGame.MainMenu.prototype = {

    create: function () {
        //this.state.start('Game');
        this.sky = this.add.sprite(0, 0, 'title', 'sky');
        this.sun = this.add.sprite(this.world.width / 2, this.world.height / 4, 'title', 'sun');
        this.sun.anchor.setTo(0.5, 0.5);
        this.road = this.add.sprite(0, this.world.height / 3, 'title', 'road');
        this.road1 = this.add.sprite(0, this.world.height, 'title', 'road');
        this.line = this.add.sprite(this.world.width / 2, this.world.height / 2.8, 'title', 'line');
        this.line.anchor.setTo(0.5, 0);
        this.turtle = this.add.sprite(this.world.width / 2, this.world.height / 2.9, 'title', 'turtle');
        this.turtle.anchor.setTo(0.7, 1.0);

        this.titleBottom = this.add.sprite(this.world.width / 2.02, this.world.height / 1.39, 'title', 'title_green');
        this.titleBottom.anchor.setTo(0.5, 0.5);
        this.titleTop = this.add.sprite(this.world.width / 2, this.world.height / 1.4, 'title', 'title_pink');
        this.titleTop.anchor.setTo(0.5, 0.5);

        this.startBottom = this.add.sprite(this.world.width / 2.05, this.world.height / 2.48, 'title', 'start_orange');
        this.startBottom.anchor.setTo(0.5, 0.5);
        this.startTop = this.add.sprite(this.world.width / 2, this.world.height / 2.5, 'title', 'start_green');
        this.startTop.anchor.setTo(0.5, 0.5);

        this.name = this.add.sprite(this.world.width / 1.7, this.world.height / 1.05, 'title', 'name');
        this.name.anchor.setTo(0.5, 0.5);
        this.game.input.onDown.add(this.tweenTitles, this);


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

    update: function () {
        this.filter.update(this.game.input.activePointer);

        //	Do some nice funky main menu effect here

    },


    tweenTitles: function () {

        this.sunTween = this.add.tween(this.sun).to({
            y: -1000
        }, 6000, Phaser.Easing.Linear.In, true);

        this.add.tween(this.titleBottom).to({
            x: -500
        }, 4000, Phaser.Easing.Linear.In, true);
        this.add.tween(this.titleTop).to({
            x: 500
        }, 4000, Phaser.Easing.Linear.In, true);

        this.add.tween(this.startBottom).to({
            x: 500
        }, 3000, Phaser.Easing.Linear.In, true);
        this.add.tween(this.startTop).to({
            x: -500
        }, 3000, Phaser.Easing.Linear.In, true);

        this.add.tween(this.road).to({
            y: 0
        }, 3000, Phaser.Easing.Linear.In, true);
        this.add.tween(this.road1).to({
            y: 150
        }, 3000, Phaser.Easing.Linear.In, true);
        this.add.tween(this.line).to({
            y: -100
        }, 6000, Phaser.Easing.Linear.In, true);

        this.add.tween(this.turtle).to({
            y: -100
        }, 6000, Phaser.Easing.Linear.In, true);

        this.add.tween(this.name).to({
            y: 800
        }, 1000, Phaser.Easing.Linear.In, true)

        this.sunTween.onComplete.add(this.startGame, this);

    },

    startGame: function () {
        this.state.start('Game')
    },


    resize: function (width, height) {

        //	If the game container is resized this function will be called automatically.
        //	You can use it to align sprites that should be fixed in place and other responsive display things.

        this.bg.width = width;
        this.bg.height = height;

        this.spriteMiddle.x = this.game.world.centerX;
        this.spriteMiddle.y = this.game.world.centerY;

        this.spriteTopRight.x = this.game.width;
        this.spriteBottomLeft.y = this.game.height;

        this.spriteBottomRight.x = this.game.width;
        this.spriteBottomRight.y = this.game.height;

    }

};
