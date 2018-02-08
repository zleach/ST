class BasicMiningLaser extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.weapon = game.add.weapon(40, 'laser-sparkle');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 150;
        this.weapon.bulletSpeed = 400;
        this.weapon.fireRate = 20;
        this.weapon.bulletAngleVariance = 1.5;
        this.weapon.bulletSpeedVariance = 90;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('scale.x', 0.3);
        this.weapon.bullets.setAll('scale.y', 0.1);
        this.weapon.bullets.setAll('damage',2);
        this.weapon.bullets.setAll('smoothed',false);
        this.weapon.setBulletBodyOffset(6, 6, 50, 30);
        
        this.energyConsumption = 0;
    }
}
