const screenWidth = 1600/2
const screenHeight = 1000/2

var ITEMS = [];

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.CANVAS, 'screen', {
    gameObjects : [],
    preload : function(){
        this.time.advancedTiming = true

        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.renderer.renderSession.roundPixels = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST        
    },
    create : function(){
        this.loaded = false;
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.loadText = this.add.text(0, 0, 'Loading...', { font: `12px Fira Code`, fill: '#FFFFFF', boundsAlignH: "center", boundsAlignV: "middle"});
        this.loadText.setTextBounds(0, 0, screenWidth, screenHeight);
        
        this.init();
    },
    loadStart : function(){
	    this.loadText.setText("Loading...");
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles) {
    	this.loadText.setText("Loading: " + progress + "%");
    },
    loadComplete:function() {
        this.setup();
        this.loaded = true;
    },
    init : function(){
        // Planets
        this.planetImages = [
            'planet-1',
            'planet-2',
            'planet-3',
            'planet-4',
            'planet-5',
            'planet-6',
            'planet-7',
            'planet-8',
            'planet-9',
            'planet-10'            
        ]
        for (let planetImage of this.planetImages){
            this.load.image(planetImage, `assets/planets/${planetImage}.png`);
        }
        this.load.image('moon-1', 'assets/moon-1.png');
    
        // Misc
        this.load.image('bullet', 'default_assets/bullets/bullet11.png');
        this.load.image('null', 'assets/FFFFFF-0.png');
        this.load.image('blasterBullet', 'default_assets/bullets/bullet13.png');
        this.load.image('laser', 'default_assets/bullets/bullet05.png');
        this.load.image('laser-sparkle', 'default_assets/particles/red.png');
        this.load.image('stars-distant', 'assets/stars-distant.png');
        this.load.image('stars-mid', 'assets/stars-mid.png');
        this.load.image('stars-near', 'assets/stars-near.png');
        this.load.image('blue_flame', 'assets/engines/blue_flame.png');
        this.load.image('rcs_flame', 'assets/engines/rcs.png');
        this.load.image('cloud', 'default_assets/particles/cloud.png');
        this.load.image('1x1', 'default_assets/particlestorm/particles/1x1.png');
        this.load.image('white', 'default_assets/particlestorm/particles/white.png');
        this.load.image('white-smooth', 'assets/white-smooth.png');
        this.load.image('nebula-cloud', 'assets/nebula-cloud.png');
        this.load.image('smoke-trail', 'default_assets/particlestorm/particles/white-smoke.png');
        this.load.image('dot', 'assets/map-dot.png');
        this.load.image('minimap-ship', 'assets/minimap-ship.png');
        this.load.image('dock-arrow', 'assets/dock-indicator.png');
        this.load.image('nav-arrow', 'assets/nav-arrow.png');
        this.load.image('crate-tiny', 'assets/crate-tiny.png');
        this.load.image('crate-micro', 'assets/crate-micro.png');

        // Alarm
        this.load.spritesheet('master-alarm', 'assets/master-alarm.png', 50, 50);
        this.load.audio('master_alarm', 'assets/audio/alarm.mp3');

        // O2
        this.load.image('oxygen-gauge', 'assets/oxygen-gauge.png');
        this.load.image('gauge-arrow', 'assets/gauge-arrow.png');

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

        this.load.image('ice-large-1', 'assets/ice-large-1.png');
        this.load.image('ice-large-2', 'assets/ice-large-2.png');
        this.load.image('ice-large-3', 'assets/ice-large-3.png');
        this.load.image('ice-large-4', 'assets/ice-large-4.png');
        this.load.image('ice-large-5', 'assets/ice-large-5.png');
        
        this.load.image('ice-small-1', 'assets/ice-small-1.png');
        this.load.image('ice-small-2', 'assets/ice-small-2.png');
        this.load.image('ice-small-3', 'assets/ice-small-3.png');
        this.load.image('ice-small-4', 'assets/ice-small-4.png');
        this.load.image('ice-small-5', 'assets/ice-small-5.png');


        // Ships
        this.load.image('mining_ship', 'assets/ships/miner.png');
        this.load.image('fuelTanker', 'assets/ships/fuelTanker.png');
        this.load.image('fuelTanker2', 'assets/ships/fuelTanker2.png');
        this.load.image('shuttle', 'assets/ships/shuttle.png');
        this.load.spritesheet('buoy', 'assets/ships/buoy.png', 21, 55);

        this.load.bitmapFont(
            'pixelmix_8',
            'assets/fonts/pixelmix1.png',
            'assets/fonts/pixelmix1.fnt'
        );
        
        // Hud
        this.load.image('minimap-bg', 'assets/minimap-bg.png');
        this.load.image('minimap-dot', 'assets/map-dot.png');
        this.load.image('minimap-mask', 'assets/minimap-mask.png');

        // Audio
        this.load.audio('crash-1', 'assets/audio/crash-1.mp3');
        this.load.audio('crash-2', 'assets/audio/crash-2.mp3');
        this.load.audio('crash-3', 'assets/audio/crash-3.mp3');
        this.load.audio('crash-4', 'assets/audio/crash-4.mp3');
        this.load.audio('crash-5', 'assets/audio/crash-5.mp3');
        this.load.audio('crash-light-1', 'assets/audio/crash-light-1.mp3');
        this.load.audio('crash-light-2', 'assets/audio/crash-light-2.mp3');
        this.load.audio('rock-crash-1', 'assets/audio/rock-crash-1.mp3');
        this.load.audio('rock-crash-2', 'assets/audio/rock-crash-2.mp3');
        this.load.audio('rock-crash-3', 'assets/audio/rock-crash-3.mp3');
        this.load.audio('rock-crash-4', 'assets/audio/rock-crash-4.mp3');
        this.load.audio('rock-crash-5', 'assets/audio/rock-crash-5.mp3');
        this.load.audio('rock-crash-6', 'assets/audio/rock-crash-6.mp3');
        this.load.audio('crash-thud-1', 'assets/audio/crash-thud-1.mp3');
        this.load.audio('crash-thud-2', 'assets/audio/crash-thud-2.mp3');
        this.load.audio('crunch-1', 'assets/audio/crunch-1.mp3');

        this.load.audio('ice-crunch-1', 'assets/audio/ice-crunch-1.mp3');
        this.load.audio('ice-crash-1', 'assets/audio/ice-crash-1.mp3');
        this.load.audio('ice-crash-2', 'assets/audio/ice-crash-2.mp3');
        this.load.audio('ice-crash-3', 'assets/audio/ice-crash-3.mp3');
        this.load.audio('ice-crash-4', 'assets/audio/ice-crash-4.mp3');
        this.load.audio('ice-crash-5', 'assets/audio/ice-crash-5.mp3');
        this.load.audio('ice-crash-6', 'assets/audio/ice-crash-6.mp3');
        this.load.audio('nebula-ambient-1', 'assets/audio/nebula-ambient-1.mp3');


        this.load.audio('rcs-engine', 'assets/audio/rcs.mp3');
        this.load.audio('rcs-loop', 'assets/audio/rcs-loop-2.mp3');
        this.load.audio('hiss-1', 'assets/audio/hiss-1.mp3');
        this.load.audio('hiss-2', 'assets/audio/hiss-2.mp3');
        this.load.audio('hiss-3', 'assets/audio/hiss-3.mp3');
        this.load.audio('hiss-4', 'assets/audio/hiss-4.mp3');
        this.load.audio('hiss-5', 'assets/audio/hiss-5.mp3');

        this.load.audio('pickup-common-1', 'assets/audio/pickup-common-1.mp3');
        this.load.audio('gui_click', 'assets/audio/Button 3.m4a');
        this.load.audio('gui_click_soft', 'assets/audio/Button 5.m4a');
        this.load.audio('gui_collapse', 'assets/audio/Collapse.m4a');
        this.load.audio('gui_expand', 'assets/audio/Expand.m4a');
        this.load.audio('beep-beep', 'assets/audio/Error 1.m4a');
        this.load.audio('blorp', 'assets/audio/Error 4.m4a');
        this.load.audio('success', 'assets/audio/Success 3.m4a');
        this.load.audio('gas-leak', 'assets/audio/gas-leak.mp3');
        this.load.audio('basic-engine', 'assets/audio/basic-engine.mp3');
        this.load.audio('title-notification', 'assets/audio/title-notification.mp3');

        this.load.audio('dock-connect', 'assets/audio/dock-connect.mp3');
        this.load.audio('dock-release', 'assets/audio/dock-release.mp3');
        this.load.audio('power-up', 'assets/audio/power-up.mp3');
        this.load.audio('power-down', 'assets/audio/power-down.mp3');

        this.load.audio('equip', 'assets/audio/equip.mp3');
        this.load.audio('unequip', 'assets/audio/unequip.mp3');
        this.load.audio('repair-light', 'assets/audio/repair-light.mp3');
        this.load.audio('jettison', 'assets/audio/jettison.mp3');
        this.load.audio('glug', 'assets/audio/glug.mp3');

        this.load.audio('mining-laser', 'assets/audio/mining-laser.mp3');
        
        this.load.start();
    },
    setup : function(){
        var seed = 77712;
        window.rng = new Prando(seed);
        this.rng = window.rng;
        this.names = new Names(this.rng);

        this.cache.getBitmapFont('pixelmix_8').font.lineHeight = 12;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.05;
        this.game.physics.p2.setPostBroadphaseCallback(this.broadphaseCallback, this);
        this.game.world.setBounds(0, 0, 1000000, 1000000);
        
        this.ps = this.game.plugins.add(Phaser.ParticleStorm);
        this.game.physics.p2.setImpactEvents(true);
        
        // Sounds
        this.soundFX = {};
        this.soundFX.click = game.add.audio('gui_click_soft');

        //  Tiled scrolling background
        this.bgGroup = this.game.add.group();
        
        this.stars =  this.game.add.group();

        this.starsDistant = this.game.add.tileSprite(0,0, screenWidth, screenHeight, 'stars-distant');
        this.starsDistant.fixedToCamera = true;
        this.stars.add(this.starsDistant);

        this.starsMid = this.game.add.tileSprite(0,0, screenWidth, screenHeight, 'stars-mid');
        this.starsMid.fixedToCamera = true;
        this.stars.add(this.starsMid);

        this.starsNear = this.game.add.tileSprite(0,0, screenWidth, screenHeight, 'stars-near');
        this.starsNear.fixedToCamera = true;
        this.stars.add(this.starsNear);

        this.planets = this.game.add.group();
        this.asteroids = this.game.add.group();
        this.ships = this.game.add.group();

        this.economy = new Economy(this);
        this.galaxy = new Galaxy(this);


/*
        var asteroidField = new AsteroidField(this,ASTEROID_FIELD_SIZE.large,this.game.world.centerX-3000,this.game.world.centerY+2500);
        var nebula = new Nebula(this,ASTEROID_FIELD_SIZE.large,this.game.world.centerX+5500,this.game.world.centerY);
        var nebula = new Nebula(this,ASTEROID_FIELD_SIZE.large,this.game.world.centerX+100,this.game.world.centerY);
        this.testplanet = new BasicPlanet(this,this.game.world.centerX,this.game.world.centerY);
        var moon = new BasicMoon(this,this.game.world.centerX+7000,this.game.world.centerY+1000);        

        this.ft = new FuelTanker(this,this.game.world.centerX+200,this.game.world.centerY-200);
        this.ft.sprite.body.angle = 270;
*/

        this.game.world.bringToTop(this.asteroids);
        this.game.world.bringToTop(this.ships);
        this.player = new Player(this);
        this.galaxy.starSystems[0].arrive();
        
        // FullSCreen
        var fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fKey.onDown.add(this.fullScreen, this);
        
        // HUD
        this.hudGroup = this.game.add.group();
        this.hud = new HUD(this);
        this.hud.showSystemInfo();
        
        // GUI
        this.guiGroup = this.game.add.group();
        this.arrivalScreen = new ArrivalScreen(this,this.guiGroup);
        this.inventoryScreen = new InventoryScreen(this,this.guiGroup);
        
        // Weapons
        var miningLaser = InventoryObject.make('mining_laser_1',this);
            miningLaser.equipTo(this.player.ship);
        this.player.ship.addItemsToInventory(1,miningLaser);

        // Engine
        var engine = InventoryObject.make('basic_engine',this);
            engine.equipTo(this.player.ship);
        this.player.ship.addItemsToInventory(1,engine);
        this.player.ship.refuel();

        // Reactor
        var reactor = InventoryObject.make('prospector_reactor',this);
            reactor.equipTo(this.player.ship);
        this.player.ship.addItemsToInventory(1,reactor);
        this.player.ship.recharge();        

        this.player.ship.addItemsToInventory(1, InventoryObject.make('light_repair_kit',this));

        // Date
        this.starDate = moment("22841207", "YYYYMMDD");
        game.time.events.loop(Phaser.Timer.SECOND * 5, this.tickTime, this);
        this.updateTime();

        // Camera
        this.cameraFree = true;
        this.setupCamera(silent = true);

        // Very top layer
        this.notificationGroup = this.game.add.group(); 
        this.notificationGroup.fixedToCamera = true;    
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
    tickTime : function(){
        // Tick Tock
        this.starDate = moment(this.starDate).add(1, 'minute');
        this.updateTime();
        // Date
    },
    updateTime : function(){
        this.hud.stardateLabel.setText(moment(this.starDate).format('MMM Do'));        
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
                        
            if(ship.dockedToShip === thing) return true; // Ignore being docked.
            
            var shakeAmount = 0;
            if(thing.sprite.body.mass>2){
                shakeAmount = (Math.abs(ship.speed-thing.speed)/2000);            
            }
            var damageAmount = shakeAmount*200
            if(shakeAmount>.001){
                if(shakeAmount>.01){
                    ship.crashSoft_sound();
                    game.camera.shake(.01, 100);
                } else {
                    ship.crash_sound();
                    game.camera.shake(shakeAmount, 100);                    
                }
                
                if(damageAmount>1) ship.inflictDamage(damageAmount);
            } else {
                // No shake
                ship.crashThud_sound();
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

    toggleCameraMode : function(){
        this.cameraFree = !this.cameraFree;
        this.setupCamera();
    },
    
    setupCamera : function(silent){
        if(this.cameraFree){
            // Free
            this.game.camera.follow(this.player.sprite);
            var deadzonePadding = 100;
            this.freeDeadzone = new Phaser.Rectangle(
                deadzonePadding,
                deadzonePadding,
                screenWidth-350,
                screenHeight-deadzonePadding*2
            );  
            this.game.camera.deadzone = this.freeDeadzone;
            this.game.camera.focusOnXY(this.player.ship.sprite.x + 50,this.player.ship.sprite.y);
            if(!silent) this.hud.message('Camera Mode: Free');
        } else {
            // Locked
            this.game.camera.follow(this.player.sprite);            
            this.game.camera.deadzone = null;
            this.game.camera.targetOffset.x = 50;
            if(!silent) this.hud.message('Camera Mode: Locked');            
        }

        // Initialize cache
        this.game.camera.cache = {
            x : this.game.camera.x,
            y : this.game.camera.y,            
        }
    },
    
    update : function(){
        if(this.loaded){
            this.game.camera.deltaX = this.game.camera.x - this.game.camera.cache.x;
            this.game.camera.deltaY = this.game.camera.y - this.game.camera.cache.y;            
            
            // Update all registered objects
            this.gameObjects.forEach(function(gameObject) {
                gameObject.update();
            });

            // Move stars
            this.starsDistant.tilePosition.x = -this.game.camera.x*0.3;
            this.starsDistant.tilePosition.y = -this.game.camera.y*0.3;

            this.starsMid.tilePosition.x = -this.game.camera.x*0.325;
            this.starsMid.tilePosition.y = -this.game.camera.y*0.325;

            this.starsNear.tilePosition.x = -this.game.camera.x*0.35;
            this.starsNear.tilePosition.y = -this.game.camera.y*0.35;
                        
            // Update minimap
            this.hud.update();

            // Update Camera
            this.game.camera.cache.x = this.game.camera.x;
            this.game.camera.cache.y = this.game.camera.y;
        }
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