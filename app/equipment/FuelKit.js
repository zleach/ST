class FuelKit extends Consumable {
    constructor(game,options) {
        super(game,options);
        
        this.fuelAmount = options.data.fuelAmount;

        this.infoFields = ['baseValue','mass','rarity','__space__','fuelAmount'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Fuel Provided'];
    
        this.consumeSound = game.add.audio('glug')
    }
    
    consume(){
        super.consume();
        this.consumeSound.play();
        
        this.parentObject.fuelQuantity += this.fuelAmount;

        if(this.parentObject.fuelQuantity>=this.parentObject.maxFuel) {
            this.parentObject.fuelQuantity = this.parentObject.maxFuel // Don't allow exceeding max fuel
        }
    }

}