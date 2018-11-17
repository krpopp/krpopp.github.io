var BasicGame = {};

BasicGame.game = function (game) {

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


BasicGame.game.prototype = {
    
       init: function () {

        this.game.scale.pageAlignHorizontally = true;

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setUserScale(10, 10);
//        this.game.renderer.renderSession.roundPixels = true;
//        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    },
    
     preload: function (){
        this.load.spritesheet('butt', 'cod.png', 258, 200);
        this.load.spritesheet('light', 'light.png', 500, 400);

    },
    
    

    create: function (){
        this.game.stage.backgroundColor = '#ffffff';
        this.light = this.game.add.sprite(this.game.world.centerX, this.game.world.height/4, 'light', 1);
        this.light.anchor.setTo(0.5, 0.5);
        this.body = this.game.add.sprite(this.game.world.centerX, this.game.world.height/1.8, 'butt', 1);
        this.body.anchor.setTo(0.5, 0.5);
        this.hole = this.game.add.sprite(this.game.world.centerX, this.body.y+45, 'butt', 0);
        this.hole.anchor.setTo(0.5, 0.5);
        this.body.inputEnabled = true;
        this.body.events.onInputDown.add(function(){
            this.body.y += 10;
            this.light.frame = 0;
        }, this);
        
        this.body.events.onInputUp.add(function(){
            this.body.y = this.game.world.height/1.8;   
            this.light.frame = 1;
        }, this);
        this.body.events.onInputOver.add( function(){
            this.body.y += 3;         
        }, this);
        this.body.events.onInputOut.add(function(){
            this.body.y = this.game.world.height/1.8;        
        }, this);
        
    
    }
    
    
    
    
}