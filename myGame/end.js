/* global game phaser game_state */
/*global Phaser*/


game_state.end = function() {};
game_state.end.prototype = {
    
    
    preload: function() {
	    game.load.image("sky", "assets/sky.png");
	    game.load.image("ground", "assets/platform.png");
	    game.load.image("star", "assets/pikachu.png");
	    game.load.spritesheet("dude", "assets/penguin.png", 72, 108);
	    game.load.spritesheet("evilDude", "assets/evilPenguin.png", 72, 108);
    },

    
    create: function() {
        game.add.sprite(0, 0, "sky");
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        this.player = game.add.sprite(32, 428, "dude");
        game.physics.arcade.enable(this.player);
        
        this.player.frame = 4;
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.stories = ["Hehe!\nGotta catch 'em all, right?\nPress Up!", "You've been fooled!\nI will conquer the world now!\nPress Up!", "Game Over!\nYou Lost!\nPress Up!", "I am a Pikachu!\nHelp me save the day!\nRapidly press Space!", "Pikachu Mass Attack!\nPress Up!"];
        this.storyIndex = 0;
        this.endText = game.add.text(16, 16, this.stories[this.storyIndex], {
        fontSize: "32px",
        fill: "#000"
        });
        
        this.cursors.up.onDown.add(function(){
        if (this.storyIndex < 3) {
        this.storyIndex++;
        }
        if (this.storyIndex === 4) {
            this.endTextTwo.text = "Congratulations!\nYou beat the game!";
        }
        }, this);
        
        this.spaceKey.onDown.add(function(){
        if (this.storyIndex === 3) {
        this.counter++;
        }
        }, this);
        
        this.counter = 0;
        this.counterTwo = 0;
        this.counterThree = 0;
    },
    
    
    update: function() {
        this.endText.text = this.stories[this.storyIndex];
        if (this.storyIndex === 1) {
            this.evilPenguin = game.add.sprite(32, 428, "evilDude");
            this.evilPenguin.frame = 4;
        } else if (this.storyIndex === 3 && this.counter === 0) {
            this.stars = game.add.group();
            this.stars.enableBody = true;
            var star = this.stars.create(640, 479, "star");
            star.scale.setTo(1.5, 1.5);
            this.counter++;
        }
        if (this.counter >= 11 && this.counterTwo === 0) {
            this.storyIndex = 4;
            this.counterTwo++;
        }
        
        if (this.storyIndex === 4 && this.counterThree === 0) {
            game.add.sprite(0, 0, "sky");
            this.platforms = game.add.group();
            this.platforms.enableBody = true;
            var ground = this.platforms.create(0, game.world.height - 64, "ground");
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;
            this.endTextTwo = game.add.text(16, 16, this.stories[this.storyIndex], {
            fontSize: "32px",
            fill: "#000"
            });
            this.stars = game.add.group();
            this.stars.enableBody = true;
            for (var i = 0; i < 12; i++) {
                star = this.stars.create(i * 70, 498, "star");
                this.counterThree++;
            }
        }
    }
};

game.state.add("end", game_state.end);