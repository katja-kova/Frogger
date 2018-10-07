// Enemies our player must avoid

//possible values of bugs
var locateBug = [50, 130, 210];
var counter = 0;


var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    // random bug location
    this.y = locateBug[Math.floor(Math.random() * 3)];
    // random bug speed
    this.speed = Math.floor(100 + (Math.random() * 200));
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when enemy disappears from the playground
    if (this.x > 500) {
        this.x = -101;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * 200));

        if (this.y > 200) {
            this.y = 50;
        }
    }

    // collision between player and enemies
    checkCollision(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
  return this;
};

Player.prototype.update = function() {
    // player moves
    if (this.ctrlKey === 'left' && this.x !== 0) {
        this.x = this.x - 100;
    } else if (this.ctrlKey === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (this.ctrlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctrlKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }

    this.ctrlKey = null;

    // start again
    if (this.y < 60) {
        alert('You Won!');
        player.reset();
    }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function(key){
    this.ctrlKey = key;
};

// resetting Players location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

var checkCollision = function(bug, character) {
    // checking collision and its number
    if (!(bug.y + 83 < character.y ||
        bug.y > character.y + 83 ||
        bug.x + 100 < character.x ||
        bug.x > character.x + 100)) {
            counter = counter + 1;
            if(counter >= 3) {
                alert('You Lost!');
                counter = 0;
            }
            character.reset();
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let numberOfEnemies = 3;

for (var i = 0; i < numberOfEnemies; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();

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
