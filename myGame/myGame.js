/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};


game_state.main = function () {};
game_state.main.prototype = {


	preload: function () {
	    game.load.image("sky", "assets/sky.png");
	    game.load.image("ground", "assets/platform.png");
	    game.load.image("star", "assets/pikachu.png");
	    game.load.image("diamond", "assets/squirtle.png");
	    game.load.spritesheet("dude", "assets/penguin.png", 72, 108);
    },


    create: function () {
        game.add.sprite(0, 0, "sky");
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 64, "ground");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        var ledge = this.platforms.create(222, 400, "ground");
        var ledge2 = this.platforms.create(-150, 250, "ground");
        var ledge3 = this.platforms.create(594, 250, "ground");
        var ledge4 = this.platforms.create(222, 100, "ground");
        ledge.body.immovable = true;
        ledge2.body.immovable = true;
        ledge3.body.immovable = true;
        ledge4.body.immovable = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.player = game.add.sprite(400, 480, "dude");
        game.physics.arcade.enable(this.player);
        
        this.player.body.bounce.y = 0.25;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add("left", [0, 1, 2, 3], 10, true);
        this.player.animations.add("right", [5, 6, 7, 8], 10, true);
        
        this.player.scale.setTo(0.5, 0.5);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, "star");
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        this.diamonds = game.add.group();
        this.diamonds.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var diamond = this.diamonds.create(i * 70, 300, "diamond");
            diamond.body.gravity.y = 300;
            diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        this.scoreText = game.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            fill: "#000"
        });
        
        this.score = 0;
    },


    update: function () {
        game.physics.arcade.collide(this.player, this.platforms);
        
        this.player.body.velocity.x = 0;
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play("left");
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play("right");
        } else {
            this.player.animations.stop();
            this.player.frame = 4;
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        
        game.physics.arcade.collide(this.stars, this.platforms);
        
        game.physics.arcade.collide(this.diamonds, this.platforms);
        
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        game.physics.arcade.overlap(this.player, this.diamonds, this.collectDiamond, null, this);
        
        if (this.score >= 100) {
            game.state.start("end");
        }
    },
    
    
    collectStar: function(player, star) {
        star.kill();
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;
        star = this.stars.create(Math.random() * 800, 0, "star");
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    },
        
        
    collectDiamond: function(player, diamond) {
        diamond.kill();
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;
        diamond = this.diamonds.create(Math.random() * 800, 300, "diamond");
        diamond.body.gravity.y = 300;
        diamond.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
};

game.state.add("main", game_state.main);                                                                                                                                       