/* global game phaser game_state */
/*global Phaser*/

game_state.story = function() {};
game_state.story.prototype = {
    
    preload: function() {
	    game.load.image("sky", "assets/sky.png");
	    game.load.image("ground", "assets/platform.png");
	    game.load.image("star", "assets/pikachu.png");
	    game.load.spritesheet("dude", "assets/betterDude.png", 128, 120);
    },
    
    create: function() {
        game.add.sprite(0, 0, "sky");
        game.add.sprite(640, 432, "star");
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, 420, "dude");
        game.physics.arcade.enable(this.player);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.storyText = game.add.text(16, 16, "Hello World!\nHelp me catch this Pikachu!\nHold Right!", {
        fontSize: "32px",
        fill: "#000"
        });
        
        this.score = 0;
    },
    
    update: function() {
        if (this.cursors.left.isDown) {
            game.state.start("main");
        }
        if (this.cursors.right.isDown && this.player.x < 568) {
            this.player.x += 5;
        }
    }
    
};

game.state.add("story", game_state.story);
game.state.start("story");