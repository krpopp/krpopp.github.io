
var socket; // define a global variable called socket 
socket = io.connect(); // send a connection request to the server

//this is just configuring a screen size to fit the game properly
//to the browser
canvas_width = window.innerWidth * window.devicePixelRatio; 
canvas_height = window.innerHeight * window.devicePixelRatio;

//make a phaser game
game = new Phaser.Game(canvas_width,canvas_height, Phaser.CANVAS,
 'gameDiv');

var gameProperties = { 
	//this is the actual game size to determine the boundary of 
	//the world
	gameWidth: 4000, 
	gameHeight: 4000,
};

// this is the main game state
var main = function(game){
};
// add the 
main.prototype = {
	preload: function() {


    },
	//this function is fired once when we load the game
	create: function () {
		console.log("client started");
		//listen to the “connect” message from the server. The server 
		//automatically emit a “connect” message when the cleint connets.When 
		//the client connects, call onsocketConnected.  
		socket.on("connect", onsocketConnected); 

	}
}

// this function is fired when we connect
function onsocketConnected () {
	console.log("connected to server"); 
}

// wrap the game states.
var gameBootstrapper = {
    init: function(gameContainerElementId){
		game.state.add('main', main);
		game.state.start('main'); 
    }
};;

//call the init function in the wrapper and specifiy the division id 
gameBootstrapper.init("gameDiv");
			