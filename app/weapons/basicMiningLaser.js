class BasicMiningLaser extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.baseBulletSpeed = 400;

        this.weapon = game.add.weapon(40, 'laser-sparkle');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 150;
        this.weapon.bulletSpeed = this.baseBulletSpeed;
        this.weapon.fireRate = 20;
        this.weapon.bulletAngleVariance = 1.5;
        this.weapon.bulletSpeedVariance = 90;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('scale.x', 0.3);
        this.weapon.bullets.setAll('scale.y', 0.1);
        this.weapon.bullets.setAll('damage',1);
        this.weapon.bullets.setAll('smoothed',false);
        this.weapon.setBulletBodyOffset(6, 6, 50, 30);
        
        // Should be on the ships
        this.game.ships.addChild(this.weapon.bullets)
        
        this.weapon.bullets.forEach(function(bullet){
            bullet.weapon = this;
            bullet.postUpdate = this.postUpdate;
        },this);

        this.energyConsumption = .3;
    }
    
    update(){
        this.weapon.bulletSpeed = this.parentObject.speed + this.baseBulletSpeed;
    }
}


