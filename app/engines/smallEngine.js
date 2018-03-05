class SmallEngine extends Engine {
    constructor(game,options) {
        super(game,options);

        this.name = 'Small Engine';
        this.key = 'small_engine';

        this.thrust = 130;
        this.maxSpeed = 150;
        this.spoolUpSpeed =.08;
        this.spoolDownSpeed = .04;
        this.fuelConsumption = .8;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'blue_flame'));
        this.flames.blendMode = PIXI.blendModes.ADD;
        this.flames.scale.set(.6);
    }
}