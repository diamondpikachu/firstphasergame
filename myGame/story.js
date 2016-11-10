/* global game phaser game_state */
/*global Phaser*/


game_state.story = function() {};
game_state.story.prototype = {
    
    
    preload: function() {
	    game.load.image("sky", "assets/sky.png");
	    game.load.image("ground", "assets/platform.png");
	    game.load.image("star", "assets/pikachu.png");
	    game.load.spritesheet("dude", "assets/penguin.png", 72, 108);
	    game.load.spritesheet("pc", "assets/pc.png", 72, 104);
    },
    
    
    create: function() {
        game.add.sprite(0, 0, "sky");
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        var star = this.stars.create(640, 479, "star");
        star.scale.setTo(1.5, 1.5);
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, 428, "dude");
        game.physics.arcade.enable(this.player);
        
        this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        this.player.animations.add("right", [5, 6, 7, 8], 10, true);
        
        this.cursors = game.input.keyboard.createCursorKeys();

        this.storyText = game.add.text(16, 16, "Hello World!\nHelp me catch this Pikachu!\nHold Right!", {
        fontSize: "32px",
        fill: "#000"
        });
        
        this.score = 0;
        this.appear = 0;
    },
    
    
    update: function() {
        this.player.body.velocity.x = 0;
        
        if (this.cursors.left.isDown && this.player.body.x > 115 && this.score === 1) {
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        } else if (this.cursors.right.isDown && this.player.body.x < 570 && this.score === 0) {
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        } else {
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
        if (this.player.body.x < 116 && this.score === 1) {
            this.score = 2;
        }
        
        if (this.score === 1) {
            this.storyText.text = "Good Job!\nLet's return to my PC!\nHold Left!";
        }
        
        if (this.score === 1 && this.appear === 1) {
            this.pc = game.add.sprite(32, 432, "pc");
            this.appear = 0;
        }
        
        if (this.score === 2) {
            this.pc.frame = 1;
            this.storyText.text = "That's Strange!\nMy PC doesn't seem to be working properly!\nPress Up to reboot!";
        }
        
        if (this.score === 2 && this.cursors.up.isDown) {
            this.storyText.text = "Oh No!\nThis is bad!\nAll my Pokémon are being released!\nHelp me catch them again!\nThere should be 100!\nPress Down!";
            this.score = 3;
        }
        
        if (this.cursors.down.isDown && this.score === 3) {
            game.state.start("main");
        }
                
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    },
    
    
    collectStar: function(player, star) {
        star.kill();
        this.score = 1;
        this.appear = 1;
    }
};

game.state.add("story", game_state.story);
game.state.start("story");