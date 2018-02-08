class Reactor extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);
        
        this.chargeRate = .1;
    }

    update(){
        super.update();
        this.parentObject.charge(this.chargeRate);
    }
}