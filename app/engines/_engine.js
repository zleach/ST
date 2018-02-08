class Engine extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.currentSpool = 0;

        this.fuelConsumption = 1;

        this.thrust = 100;
        this.spoolUpSpeed =.2;
        this.spoolDownSpeed = .04;
    }

    set slot(slot){
        var slotAnchor = this.parentObject.specs.engineSlots[slot].anchor;
        this.flames.angle = this.parentObject.specs.engineSlots[slot].angle;
        this.flames.anchor.set(slotAnchor.x,slotAnchor.y);
    }

    accelerate(){
        if(this.currentSpool<=1){
            this.currentSpool = Math.min(this.currentSpool+this.spoolUpSpeed,1);
        }
    }

    deaccelerate(){    
        this.currentSpool = Math.max(this.currentSpool-this.spoolDownSpeed,0)
    }

    update(){
        this.flames.alpha = this.currentSpool;    
    }
}