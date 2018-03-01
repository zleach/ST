class BasicEngine extends Engine {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.thrust = 200;
        this.maxSpeed = 150;
        this.spoolUpSpeed =.08;
        this.spoolDownSpeed = .04;
        this.fuelConsumption = .7;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'blue_flame'));
        this.flames.blendMode = PIXI.blendModes.ADD;

        //this.sound = game.add.audio('basic-engine');
    }
    accelerate(){
        super.accelerate();
        //if(!this.sound.isPlaying) this.sound.play();
        
        //this.sound.volume = this.flames.alpha;
    }
    deaccelerate(){
        super.deaccelerate();
        //this.sound.volume = this.flames.alpha;
        
        //if(this.sound.volume==0 && this.sound.isPlaying) this.sound.stop();
    }

}