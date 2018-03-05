class Engine extends Equipment {
    constructor(game,options) {
        super(game,options);

        this.fuelConsumption = 1;
        this.thrust = 100;
        this.spoolUpSpeed = 1;
        this.spoolDownSpeed = .04;

        this.currentSpool = 0;
        this.isEngine = true;

        this.infoFields = ['baseValue','mass','rarity','__space__','type','thrust','fuelConsumption'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Engine Type','Thrust','Fuel Consumption'];
    }

    set slot(slot){
        var slotAnchor = this.parentObject.specs.engineSlots[slot].anchor;
        
        // Setup Flames
        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'blue_flame'));
        this.flames.blendMode = PIXI.blendModes.ADD;
        this.flames.angle = this.parentObject.specs.engineSlots[slot].angle;
        this.flames.anchor.set(slotAnchor.x,slotAnchor.y);
    }

    accelerate(){
        if(this.currentSpool<=1){
            this.currentSpool = Math.min(this.currentSpool+this.spoolUpSpeed,1);
        }
        if(this.retro) {
            this.currentSpool = 1
        }        
    }

    deaccelerate(){
        if(!this.retro) {
            this.currentSpool = Math.max(this.currentSpool-this.spoolDownSpeed,0)
        } else {
            this.currentSpool = Math.max(this.currentSpool-.1,0)            
        }
    }

    fire(){
        this.accelerate();
    }
    
    shutdown(){
        this.deaccelerate();    
    }

    update(){
        this.flames.alpha = this.currentSpool;    
    }
}