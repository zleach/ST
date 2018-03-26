class Thruster extends Engine {
    constructor(game,options) {
        super(game,options);
        this.game.register(this);

        this.engineType = ENGINE_TYPES.reactionControlThruster;
        this.thrust = 0;
        this.fuelConsumption = .1;

        this.spoolUpSpeed = .3;
        this.spoolDownSpeed = .6;

        this.layout = options.layout;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'rcs_flame'));
        this.flames.x = this.layout.x-this.parentObject.sprite.width/2;
        this.flames.y = this.layout.y-this.parentObject.sprite.height/2;
        this.flames.angle = this.layout.angle;
        this.flames.scale.set(.9);
        this.flames.anchor.set(0,0);

        var smoke = {
            image: 'smoke-trail',
            lifespan: { min: 150, max: 400 },
            scale: { value: { min: .03, max: .1 } },
            vx: { value: { min: 0, max: 0 } },
            vy: { value: { min: 0, max: 0 }, delta: .2, control: [ { x: 0, y: 1 }, { x: 0, y: 0 } ] },
            alpha: { value: .3, control :[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }] },
            rotation: { value: 0, delta: { min: -2.0, max: 2.0 } }
        };

        this.emitter = this.game.ps.createEmitter(); 
        this.emitter.addToWorld();

        this.game.ps.addData('smoke', smoke);
        this.soundCountdown = 10;
    }
    accelerate(){
        super.accelerate();
        this.puff();
    }
    deaccelerate(){
        super.deaccelerate();
    }    
    puff(){
        var px = this.flames.worldPosition.x + game.camera.x;
        var py = this.flames.worldPosition.y + game.camera.y;

        this.emitter.emit('smoke', px, py, { total: 1 });
    }
}