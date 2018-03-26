class FTLFuel extends Consumable {
    constructor(game,options) {
        super(game,options);
        
        this.jumpsAmount = 1;
        this.isHyperdriveFuel = true;

        this.infoFields = ['baseValue','mass','rarity','__space__','jumpsAmount'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Jumps'];
    }
    
    consume(){
        super.consume();
    }
}