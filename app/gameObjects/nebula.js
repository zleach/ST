class Nebula extends GameObject {
    constructor(game,options) {
        super(game);

        var x = options.x;
        var y = options.y;
        var size = options.size;
        if(size==undefined) size = 2000;
        this.size = size;

        var xPos = game.rnd.integerInRange(x-this.size, x+this.size);
        var yPos = game.rnd.integerInRange(y-this.size, y+this.size);

        var densityLowerBound = 50;
        var densityUpperBound = 60;

        this.iceteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.iceteroids = this.game.asteroids;
        for (var i = 0; i < this.iceteroidsCount; i++) { 
            var xPos = game.rnd.integerInRange(x-size, x+size);
            var yPos = game.rnd.integerInRange(y-size, y+size);
            
            var bigness = game.rnd.integerInRange(0,100);

            if(bigness>=70){
                var iceteroid = new Iceteroid(this.game,this.iceteroids,'large',xPos,yPos);
            } else {
                var iceteroid = new Iceteroid(this.game,this.iceteroids,'small',xPos,yPos);                
            }
            options.system.stellarObjects.push(iceteroid);
        }

        this.buoy = new Buoy(this.game,x,y);
        this.buoy.description = `${Names.proper()} Ice Nebula`
        this.name = this.buoy.description;
        options.system.stellarObjects.push(this.buoy);

  
        this.shouldShowNebulaEffect = false;
        this.nebulaSpawnInterval = 10;
        this.nebulaSpawnCountdown = this.nebulaSpawnInterval;

        // Effects
        this.nebulaOverlay = this.game.add.graphics(0, 0);
        this.nebulaOverlay.beginFill(0x34495e);
        this.nebulaOverlay.drawRect(0,0,screenWidth,screenHeight);
        this.nebulaOverlay.endFill();
        this.nebulaOverlay.alpha = 0;
        this.nebulaOverlayTargetAlpha = .4;
        this.game.starsTargetAlpha = .2;
        this.nebulaOverlayStepAlpha = .002;
        this.nebulaOverlay.visible = false;
        this.nebulaOverlay.fixedToCamera = true;
        
        var smoke = {
            lifespan: 7000,
            image: 'nebula-cloud',
            sendToBack: true,
            alpha: { initial: 0, value: .06, control: [ { x: 0, y: 0 }, { x: 0.2, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 } ] },
            scale: { min: 1, max: 1.5 },
            vx: { min: -0.2, max: 0.2 },
            vy: { min: -0.2, max: -0.2 },
            hsv: { value: 210 },
        };
        this.game.ps.addData('nebula-cloud', smoke);
        this.smokeEmitter = this.game.ps.createEmitter();
        this.smokeEmitter.addToWorld();


    	this.particlesEmitter = game.add.emitter(0,0, 500);
    	this.particlesEmitter.width = game.camera.width;
    	this.particlesEmitter.height = game.camera.height;
    	    
    	this.particlesEmitter.makeParticles(['ice-small-1','ice-small-2','ice-small-3','ice-small-4','ice-small-5']);
    
    	this.particlesEmitter.setAlpha(0, 1, 2000,Phaser.Easing.Quadratic.InOut,true);

    	this.particlesEmitter.minParticleScale = 0.08;
    	this.particlesEmitter.maxParticleScale = 0.35;
    
    	this.particlesEmitter.setYSpeed(-10, 10);
    	this.particlesEmitter.setXSpeed(-10, 10);
        this.particlesEmitter.gravity = 3;
    
    	this.particlesEmitter.minRotation = -100;
    	this.particlesEmitter.maxRotation = 100;
    
    	this.particlesEmitter.start(false, 4000, 10, 0);
    	this.particlesEmitter.on = false;
    	this.iceteroids.add(this.particlesEmitter);
    	
    	// Ambient Sounds
        this.ambientSound = game.add.audio('nebula-ambient-1');
    }
    
    update(){
        super.update();
        
        this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.buoy.sprite, this.game.player.sprite);
    
        if(this.distanceToPlayer<=this.size*1.5){
            this.game.player.enterDarkness(this);
            this.shouldShowNebulaEffect = true;
        } else {
            this.game.player.exitDarkness(this);
            this.shouldShowNebulaEffect = false;
        }
        
        if(this.shouldShowNebulaEffect){
            
            // Particles
            this.particlesEmitter.on = true;   
            this.particlesEmitter.x = this.game.camera.x + this.game.camera.width/2;
            this.particlesEmitter.y = this.game.camera.y + this.game.camera.height/2;

            // Overlay
            this.nebulaOverlay.visible = true;
            
            if(this.nebulaOverlay.alpha<=this.nebulaOverlayTargetAlpha)
                this.nebulaOverlay.alpha+=this.nebulaOverlayStepAlpha

            if(this.game.stars.alpha>=this.game.starsTargetAlpha)
                this.game.stars.alpha-=this.nebulaOverlayStepAlpha
            
            if(this.game.stars.alpha<=this.game.starsTargetAlpha)
                this.game.stars.alpha=this.game.starsTargetAlpha    
            
            // Smoke
            if(this.nebulaSpawnCountdown==0){
                this.smokeEmitter.emit(
                    'nebula-cloud',
                    this.game.camera.x + this.game.rnd.integerInRange(0, this.game.camera.width), 
                    this.game.camera.y + this.game.rnd.integerInRange(0, this.game.camera.height),
                ) 
                this.nebulaSpawnCountdown = this.nebulaSpawnInterval;
            } else {
                this.nebulaSpawnCountdown--;
            }
            
            // Sound
            if(!this.ambientSound.isPlaying) {
                console.log("Start Loop");
                this.ambientSound.loopFull(AMBIENT_VOLUME);
            }            
        } else {
            // Stop Particles
            this.particlesEmitter.on = false;   
            
            // Hide overlay
            this.nebulaOverlay.alpha-=this.nebulaOverlayStepAlpha
            
            if(this.nebulaOverlay.alpha<this.nebulaOverlayStepAlpha){
                this.nebulaOverlay.alpha = 0;
                this.nebulaOverlay.visible = false;
            }
            
            // Stars
            this.game.stars.alpha+=this.nebulaOverlayStepAlpha
            if(this.game.stars.alpha>=1)
                this.game.stars.alpha=1;        
        
            // Stop sound
            if(this.ambientSound.isPlaying && this.ambientSound.volume == AMBIENT_VOLUME) {
                this.ambientSound.fadeOut(3000);    
            }
            this.ambientSound.onFadeComplete.addOnce(function(){
                this.ambientSound.stop();
            }, this);
        }
    }
    
}
