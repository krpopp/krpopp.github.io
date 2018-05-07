BasicGame.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {

        this.load.atlasJSONHash('sprites', 'turtle.png', 'turtle.json');
        this.load.atlasJSONHash('player', 'player.png', 'player.json');
        this.load.atlasJSONHash('title', 'title.png', 'title.json');
        this.load.atlasJSONHash('scoreStuff', 'scorescreen.png', 'scorescreen.json');
        this.load.image('bg', 'bg.png');
        this.load.bitmapFont('counter', 'countdown.png', 'countdown.fnt');

    },

    create: function () {

        this.state.start('MainMenu');

    }

};
