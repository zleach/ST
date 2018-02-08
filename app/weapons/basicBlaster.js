class BasicBlaster extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.weapon = game.add.weapon(40, 'blasterBullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 1000;
        this.weapon.bulletSpeed = 450;
        this.weapon.fireRate = 250;
        this.weapon.bulletAngleVariance = 0;
        this.weapon.bulletSpeedVariance = 10;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('damage',2);
    }
}
