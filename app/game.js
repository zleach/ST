const screenWith = 1280/1.3
const screenHeight = 800/1.3

var game = new Phaser.Game(screenWith, screenHeight, Phaser.WEBGL, 'screen', {
    gameObjects : [],
    preload : function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.renderer.renderSession.roundPixels = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.load.image('planet-1', 'assets/planet-1.png');
        this.load.image('moon-1', 'assets/moon-1.png');
    
        this.load.image('bullet', 'default_assets/bullets/bullet11.png');
        this.load.image('blasterBullet', 'default_assets/bullets/bullet13.png');
        this.load.image('laser', 'default_assets/bullets/bullet05.png');
        this.load.image('laser-sparkle', 'default_assets/particles/red.png');
        this.load.image('stars', 'assets/stars_new.gif');
        this.load.image('blue_flame', 'assets/engines/blue_flame.png');
        this.load.image('cloud', 'default_assets/particles/cloud.png');
        
        // Roids
        this.load.image('asteroid-flake-1', 'assets/asteroid-flake-a.png');
        this.load.image('asteroid-flake-2', 'assets/asteroid-flake-b.png');
        this.load.image('asteroid-flake-3', 'assets/asteroid-flake-c.png');
        this.load.image('asteroid-large', 'assets/asteroid-large.png');
        this.load.image('asteroid-medium', 'assets/asteroid-medium.png');
        this.load.image('asteroid-small', 'assets/asteroid-small.png');

        // Ships
        this.load.image('mining_ship', 'assets/ships/miner.png');
        this.load.image('fuelTanker', 'assets/ships/fuelTanker.png');

        this.load.bitmapFont(
            'pixelmix_normal',
            'assets/fonts/pixelmix_normal1.png',
            'assets/fonts/pixelmix_normal1.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_bold',
            'assets/fonts/pixelmix_bold1.png',
            'assets/fonts/pixelmix_bold1.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_normal2x',
            'assets/fonts/pixelmix_normal2.png',
            'assets/fonts/pixelmix_normal2.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_bold2x',
            'assets/fonts/pixelmix_bold2.png',
            'assets/fonts/pixelmix_bold2.fnt'
        );

        // Hud
        this.load.image('minimap-bg', 'assets/minimap-bg.png');
        this.load.image('minimap-dot', 'assets/map-dot.png');
        this.load.image('minimap-mask', 'assets/minimap-mask.png');
    },
    register : function(object){
        this.gameObjects.push(object);
    },
    unregister : function(object){
        var index = this.gameObjects.indexOf(object);
        if(index !== -1) {
          this.gameObjects.splice(index, 1);
        }
    },
    create : function(){
        this.game.world.setBounds(0, 0, 50000, 50000);
        
        //  Tiled scrolling background
        this.stars = this.game.add.tileSprite(0, 0, screenWith, screenHeight, 'stars');
        this.stars.fixedToCamera = true;
        
        // System
        var planet = new BasicPlanet(this,this.game.world.centerX-100,this.game.world.centerY-200);
        var moon = new BasicMoon(this,this.game.world.centerX+2600,this.game.world.centerY+400);
        var asteroidField = new AsteroidField(this,ASTEROID_FIELD_SIZE.medium,-800,4000);
        var asteroidField2 = new AsteroidField(this,ASTEROID_FIELD_SIZE.small,700,-2000);
        
        // Player
        this.ships = this.game.add.physicsGroup(Phaser.Physics.ARCADE);

        var fuelTanker2 = new FuelTanker(this);
        fuelTanker2.sprite.x = fuelTanker2.sprite.x+10;
        fuelTanker2.sprite.y = fuelTanker2.sprite.y-200;
        //fuelTanker2.sprite.angle = 32;
        //fuelTanker2.deadSlowAhead();
        
        this.player = new Player(this); 

        // Camera
        this.game.camera.follow(this.player.sprite);
        this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        this.game.camera.focusOnXY(this.game.world.centerX,this.game.world.centerY);
        var fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fKey.onDown.add(this.fullScreen, this);
        
        // HUD
        this.hud = new HUD(this);
        this.hud.title("Eta Blerreon System","June 12th, 2310");
    },
    update : function(){
        //this.game.physics.arcade.collide(this.ships, this.ships);

        // Update all registered objects
        this.gameObjects.forEach(function(gameObject) {
            gameObject.update();
        });
        
        // Move stars
        this.stars.tilePosition.x = -this.game.camera.x*0.8;
        this.stars.tilePosition.y = -this.game.camera.y*0.8;
        
        // Update minimap
        this.hud.update();
    },
    fullScreen : function(){
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    },
    render : function(){
        //this.game.debug.body(this.player.sprite);
        //this.game.debug.bodyInfo(this.player.sprite,32,32);

/*
        this.player.weapons.forEach(function(weapon) {
            weapon.weapon.debug(32,32,true);
        }, this);
*/

/*
        this.asteroids.forEach(function(asteroid) {
            this.game.debug.body(asteroid);
        }, this);
*/

        this.ships.forEach(function(ship) {
            this.game.debug.body(ship);
            //ship.angle += 5;
        }, this);
    },
});