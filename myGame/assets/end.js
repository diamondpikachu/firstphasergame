/* global game phaser game_state */
/*global Phaser*/

game_state.end = function() {};
game_state.end.prototype = {
    
    preload: function() {
	    game.load.image("sky", "assets/sky.png");
	    game.load.image("ground", "assets/platform.png");
	    game.load.spritesheet("dude", "assets/betterDude.png", 128, 120);
    },
    
    create: function() {
        game.add.sprite(0, 0, "sky");
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(32, 420, "dude");
        game.physics.arcade.enable(this.player);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.endText = game.add.text(16, 16, "Hello World!", {
        fontSize: "32px",
        fill: "#000"
        });
        
        this.score = 0;
    },
    
    update: function() {
        if (this.cursors.right.isDown) {
            game.state.start("main");
        }
    }
    
};

game.state.add("end", game_state.end);