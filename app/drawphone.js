//
// Drawphone
//

var Game = require("./game");

function Drawphone(devModeEnabled) {
	this.games = [];

	//add the dev game
	if (devModeEnabled) {
		this.newGame("ffff");
	}
}

Drawphone.prototype.newGame = function(forceCode) {
	var newCode;
	if (forceCode) {
		newCode = forceCode;
	} else {
		newCode = this.generateCode();
	}

	var self = this;
	var newGame = new Game(newCode, function() {
		//will be ran when this game has 0 players left
		self.removeGame(newCode);
	});
	this.games.push(newGame);
	console.log(newCode + " created");
	return newGame;
};

Drawphone.prototype.findGame = function(code) {
	for (var i = 0; i < this.games.length; i++) {
		if (this.games[i].code === code.toLowerCase()) {
			return this.games[i];
		}
	}
	return false;
};

Drawphone.prototype.generateCode = function() {
	var code;
	do {
		//generate 4 letter code
		code = "";
		var possible = "abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < 4; i++) {
			code += possible.charAt(
				Math.floor(Math.random() * possible.length)
			);
		}
		//make sure the code is not already in use
	} while (this.findGame(code));
	return code;
};

Drawphone.prototype.removeGame = function(code) {
	var game = this.findGame(code);

	var index = this.games.indexOf(game);
	if (index > -1) {
		this.games.splice(index, 1);
		console.log(code + " removed");
	}
};

module.exports = Drawphone;
