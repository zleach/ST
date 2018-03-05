class FocusedBeamWeapon extends Weapon {
    constructor(game,options) {
        super(game,options);
        
        this.baseBulletSpeed = 400;
        this.weapon = game.add.weapon(40, 'laser-sparkle');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = options.data.range;
        this.weapon.bulletSpeed = this.baseBulletSpeed;
        this.weapon.fireRate = 20;
        this.weapon.bulletAngleVariance = 1.5;
        this.weapon.bulletSpeedVariance = 90;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('scale.x', 0.3);
        this.weapon.bullets.setAll('scale.y', 0.1);
        this.weapon.bullets.setAll('damage',options.data.damage);
        this.weapon.bullets.setAll('smoothed',false);
        this.weapon.setBulletBodyOffset(6, 6, 50, 30);        
        this.weapon.onFire.add(this.fire, this);
        // Should be on the ships
        this.game.ships.addChild(this.weapon.bullets)
        
        this.weapon.bullets.forEach(function(bullet){
            bullet.weapon = this;
            bullet.postUpdate = this.postUpdate;
        },this);

        this.energyConsumption = options.data.energyConsumption;

        this.sound = game.add.audio('mining-laser')
        this.sound.addMarker('begin',0,0.15);
        this.sound.addMarker('loop',0.15,0.573);
        this.sound.addMarker('end',1.123,0.45);
        this.soundCountdown = 10;
        this.coolingDown = false;
        this.sound.onStop.add(this.soundStopped, this);
    }
    soundStopped(sound,marker){
        if(marker=='begin'){
            this.sound.play('loop',0,1,true);
        }
        if(marker=='end'){
            this.sound.pause();
            this.coolingDown = false;
        }
    }    
    
    fire(){
        super.fire();
	    this.soundCountdown = 10;
        if(!this.sound.isPlaying) this.sound.play('begin');
    }
    
    doneFiring(){
        if(!this.coolingDown && this.sound.isPlaying) {
            this.sound.play('end');
            this.coolingDown = true;
        }
    }
    
    update(){
        if(this.soundCountdown==0){
            this.doneFiring();
        } else {
            this.soundCountdown--;
        }

        if(this.parentObject) this.weapon.bulletSpeed = this.parentObject.speed + this.baseBulletSpeed;
    }
}


