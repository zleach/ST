class Reactor extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);
        
        this.name = "Reactor"
        this.status = "OK"
        this.chargeRate = .1;
    }

    update(){
        super.update();
        this.parentObject.charge(this.chargeRate);
    }
}