const screenWidth = 1600/2
const screenHeight = 1000/2

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.WEBGL, 'screen', {
    gameObjects : [],
    preload : function(){
        this.time.advancedTiming = true
        
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.renderer.renderSession.roundPixels = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST
        
        //this.load.shader('stars', 'assets/stars.frag');

        this.load.image('planet-1', 'assets/planet-1.png');
        this.load.image('moon-1', 'assets/moon-1.png');
    
        this.load.image('bullet', 'default_assets/bullets/bullet11.png');
        this.load.image('null', 'assets/FFFFFF-0.png');
        this.load.image('blasterBullet', 'default_assets/bullets/bullet13.png');
        this.load.image('laser', 'default_assets/bullets/bullet05.png');
        this.load.image('laser-sparkle', 'default_assets/particles/red.png');
        this.load.image('stars', 'assets/stars_new.gif');
        this.load.image('blue_flame', 'assets/engines/blue_flame.png');
        this.load.image('rcs_flame', 'assets/engines/rcs.png');
        this.load.image('cloud', 'default_assets/particles/cloud.png');
        this.load.image('1x1', 'default_assets/particlestorm/particles/1x1.png');
        this.load.image('white', 'default_assets/particlestorm/particles/white.png');
        this.load.image('white-smooth', 'assets/white-smooth.png');
        this.load.image('smoke-trail', 'default_assets/particlestorm/particles/white-smoke.png');
        this.load.image('dot', 'assets/map-dot.png');
        this.load.image('minimap-ship', 'assets/minimap-ship.png');
        this.load.image('dock-arrow', 'assets/dock-indicator.png');
        this.load.image('nav-arrow', 'assets/nav-arrow.png');

        // Planet Stuff
        this.load.image('planet-arrival-1', 'assets/planet-arrival-1.png');
        
    
        // Roids
        this.load.image('asteroid-flake-1', 'assets/asteroid-flake-a.png');
        this.load.image('asteroid-flake-2', 'assets/asteroid-flake-b.png');
        this.load.image('asteroid-flake-3', 'assets/asteroid-flake-c.png');
        this.load.image('asteroid-large', 'assets/asteroid-large.png');
        this.load.image('asteroid-medium', 'assets/asteroid-medium.png');
        this.load.image('asteroid-small', 'assets/asteroid-small.png');
        this.load.image('asteroid-tiny', 'assets/asteroid-flake-a.png');

        // Ships
        this.load.image('mining_ship', 'assets/ships/miner.png');
        this.load.image('fuelTanker', 'assets/ships/fuelTanker.png');
        this.load.image('fuelTanker2', 'assets/ships/fuelTanker2.png');
        this.load.image('shuttle', 'assets/ships/shuttle.png');
        this.load.spritesheet('buoy', 'assets/ships/buoy.png', 21, 55);

        this.load.bitmapFont(
            'pixelmix_5',
            'assets/fonts/pixelmix0.png',
            'assets/fonts/pixelmix0.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_8',
            'assets/fonts/pixelmix1.png',
            'assets/fonts/pixelmix1.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_10',
            'assets/fonts/pixelmix2.png',
            'assets/fonts/pixelmix2.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_11',
            'assets/fonts/pixelmix3.png',
            'assets/fonts/pixelmix3.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_12',
            'assets/fonts/pixelmix_12.png',
            'assets/fonts/pixelmix_12.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_14',
            'assets/fonts/pixelmix4.png',
            'assets/fonts/pixelmix4.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_15',
            'assets/fonts/pixelmix5.png',
            'assets/fonts/pixelmix5.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_20',
            'assets/fonts/pixelmix6.png',
            'assets/fonts/pixelmix6.fnt'
        );
        
        // Hud
        this.load.image('minimap-bg', 'assets/minimap-bg.png');
        this.load.image('minimap-dot', 'assets/map-dot.png');
        this.load.image('minimap-mask', 'assets/minimap-mask.png');

        // Audio
        this.load.audio('gui_click', 'assets/audio/Button 3.m4a');
        this.load.audio('gui_click_soft', 'assets/audio/Button 5.m4a');
        this.load.audio('success', 'assets/audio/Success 3.m4a');
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
        this.cache.getBitmapFont('pixelmix_8').font.lineHeight = 12;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.05;
        this.game.physics.p2.setPostBroadphaseCallback(this.broadphaseCallback, this);
        this.game.world.setBounds(0, 0, 1000000, 1000000);
        
        this.ps = this.game.plugins.add(Phaser.ParticleStorm);
        this.game.physics.p2.setImpactEvents(true);
        
        // Sounds
        this.game.soundFX = {};
        this.game.soundFX.click = game.add.audio('gui_click_soft');
        
        
        //  Tiled scrolling background
        this.bgGroup = this.game.add.group();
        
        this.stars = this.game.add.tileSprite(0,0, screenWidth, screenHeight, 'stars');
        this.stars.fixedToCamera = true;

        this.economy = new Economy(this);
        this.system = new StarSystem(this);

        this.planets = this.game.add.group();
        this.asteroids = this.game.add.group();
        this.ships = this.game.add.group();

        var asteroidField = new AsteroidField(this,ASTEROID_FIELD_SIZE.large,this.game.world.centerX,this.game.world.centerY);
        var planet = new BasicPlanet(this,this.game.world.centerX,this.game.world.centerY);
        var moon = new BasicMoon(this,this.game.world.centerX+7000,this.game.world.centerY+1000);

        var ft = new FuelTanker(this,this.game.world.centerX+200,this.game.world.centerY-200);
        ft.sprite.body.angle = 270;
        //ft.navigationMode = NAVIGATION_MODE.followWaypoints;

        this.game.world.bringToTop(this.asteroids);
        this.game.world.bringToTop(this.ships);
        this.player = new Player(this);

        // Date
        this.starDate = moment("22841207", "YYYYMMDD");
        game.time.events.loop(Phaser.Timer.SECOND * 5, this.tickTime, this);
        
        // Camera
        this.game.camera.follow(this.player.sprite);
        
        var deadzonePadding = 100;
        
        this.game.camera.deadzone = new Phaser.Rectangle(
            deadzonePadding,
            deadzonePadding,
            screenWidth-350,
            screenHeight-deadzonePadding*2
        );

        this.game.camera.focusOnXY(this.game.world.centerX,this.game.world.centerY);
        var fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fKey.onDown.add(this.fullScreen, this);
        
        // HUD
        this.hudGroup = this.game.add.group();
        this.hud = new HUD(this);
        this.hud.showSystemInfo();
        
        // GUI
        this.guiGroup = this.game.add.group();
        this.arrivalScreen = new ArrivalScreen(this,this.guiGroup);
        
        // DEBUG ////////
        planet.addItemsToInventory(1, InventoryObject.make('meteoric_iron'));
        planet.addItemsToInventory(1, InventoryObject.make('meteoric_iron'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        
/*
        this.arrivalScreen.destination = planet;
        this.arrivalScreen.show();
*/
        //

        // Very top layer
        this.notificationGroup = this.game.add.group(); 
        this.notificationGroup.fixedToCamera = true;       
    },
    tickTime : function(){
        // Tick Tock
        this.starDate = moment(this.starDate).add(1, 'minute');
    },
    skipTime : function(amount,unit){
        this.starDate = moment(this.starDate).add(amount, unit);        
    },
    broadphaseCallback : function(body1, body2){
        if(body1.sprite.parentObject == this.player.ship || body2.sprite.parentObject == this.player.ship){
            var ship;
            if(body1.sprite.parentObject == this.player.ship){
                ship = body1.sprite.parentObject;
                thing = body2.sprite.parentObject
            } else {
                ship = body2.sprite.parentObject;                
                thing = body1.sprite.parentObject
            }
            
            var shakeAmount = (Math.abs(ship.speed-thing.speed)/1000)*thing.sprite.body.mass/100;
            var damageAmount = shakeAmount*100
            if(shakeAmount>.001){
                if(shakeAmount>.01){
                    game.camera.shake(.01, 100);
                } else {
                    game.camera.shake(shakeAmount, 100);                    
                }

                if(damageAmount>1){
                    ship.inflictDamage(damageAmount);
                }


            } else {
                // No shake
            }
        }    
        return true;
    },

    log(){
        this.logValue = '';
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(element) {
            this.logValue = this.logValue + '[' + element + ']' 
        }, this);
    },
    
    update : function(){
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
        if(this.logValue!=undefined){
            this.game.debug.text(this.logValue, 32, 32) 
        }
        //this.game.debug.text(game.time.fps +' fps', 32, 32) 
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

/*
        this.ships.forEach(function(ship) {
            this.game.debug.body(ship);
            //ship.angle += 5;
        }, this);
*/
    },
});

Number.prototype.between = function(a, b, inclusive) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return inclusive ? this >= min && this <= max : this > min && this < max;
};