// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = randomize(1,5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > blockSizeX * 5) {
        this.x = -blockSizeX * 2;
        //reset the speed randomly every time the bug restarts
        this.speed = randomize(1,5)
    } else {
        this.x = this.x + (blockSizeX * this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(newX, newY) {
    if (typeof newX !== 'undefined' && isPlayerWithinBoundsX(newX)) {
        this.x = newX;
    }
    if (typeof newY !== 'undefined' && isPlayerWithinBoundsY(newY)) {
        this.y = newY;
    }
};

Player.prototype.reset = function() {
    this.update(playerInitPosX, playerInitPosY);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey === 'left') {
        this.update(this.x - blockSizeX, this.y);
    } else if (pressedKey === 'up') {
        this.update(this.x, this.y - blockSizeY);
    } else if (pressedKey === 'right') {
        this.update(this.x + blockSizeX, this.y);
    } else if (pressedKey === 'down') {
        this.update(this.x, this.y + blockSizeY);
    }
};

var randomStartingBlock = function() {
    return randomize(1,4);
};

var randomize = function(start, end) {
    return Math.floor(Math.random() * end) + start;
};

var isPlayerWithinBoundsX = function(x) {
    return x >= playerLowerBoundX && x <= playerUpperBoundX;
};

var isPlayerWithinBoundsY = function(y) {
    return y >= playerLowerBoundY && y <= playerUpperBoundY;
};

var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if ((Math.abs(enemy.x - player.x) < 70) && Math.abs(enemy.y - player.y) < 20) {
            player.reset();
        }
    });
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var blockSizeX = 101;
var blockSizeY = 85;
var blockSizeYOffset = 25;
var enemyLane1 = blockSizeY - blockSizeYOffset,
    enemyLane2 = enemyLane1 + blockSizeY,
    enemyLane3 = enemyLane2 + blockSizeY;

var playerBlockSizeYOffset = 10;
var playerInitPosX = blockSizeX * 2;
var playerInitPosY = (blockSizeY - playerBlockSizeYOffset) + blockSizeY*4;

var playerLowerBoundX = 0;
var playerLowerBoundY = -15;
var playerUpperBoundX = blockSizeX*4;
var playerUpperBoundY = blockSizeY*5;

var allEnemies = [
    new Enemy(-blockSizeX*randomStartingBlock(), enemyLane1),
    new Enemy(blockSizeX*randomStartingBlock(), enemyLane1),
    new Enemy(-blockSizeX*randomStartingBlock(), enemyLane2),
    new Enemy(blockSizeX*randomStartingBlock(), enemyLane2),
    new Enemy(-blockSizeX*randomStartingBlock(), enemyLane3),
    new Enemy(blockSizeX*randomStartingBlock(), enemyLane3)
];

var player = new Player(playerInitPosX, playerInitPosY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
