class BasicEngine extends Engine {
    constructor(game,options) {
        super(game,options);

        this.thrust = options.data.thrust;
        this.maxSpeed = options.data.maxSpeed;
        this.spoolUpSpeed = options.data.spoolUpSpeed;
        this.spoolDownSpeed = options.data.spoolDownSpeed;
        this.fuelConsumption = options.data.fuelConsumption;

        this.sound = game.add.audio('basic-engine');
    }
    accelerate(){
        super.accelerate();
        if(!this.sound.isPlaying) this.sound.play();
        
        this.sound.volume = this.flames.alpha;
    }
    deaccelerate(){
        super.deaccelerate();
        this.sound.volume = this.flames.alpha;
        
        if(this.sound.volume==0 && this.sound.isPlaying) this.sound.stop();
    }

}