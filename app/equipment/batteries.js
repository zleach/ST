class Batteries extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);
        
        this.name = "Batteries"
        this.status = "OK"
        this.chargeRate = .03;
    }

    update(){
        super.update();
        this.parentObject.charge(this.chargeRate);
    }
}