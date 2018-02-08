class Weapon extends Equipment {
    constructor(game,parentObject) {
        super(game);
        this.parentObject = parentObject;
        
        this.energyConsumption = 0;
    }

    update(){
        super.update();
    }
}