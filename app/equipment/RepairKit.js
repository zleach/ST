class RepairKit extends Consumable {
    constructor(game,options) {
        super(game,options);
        
        this.repairAmount = options.data.repairAmount;

        this.infoFields = ['baseValue','mass','rarity','__space__','repairAmount'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Recovery'];
    
        this.consumeSound = game.add.audio('repair-light')
    }
    
    consume(){
        super.consume();
        this.consumeSound.play();
        
        this.parentObject.health += this.repairAmount;

        if(this.parentObject.health>=this.parentObject.maxHealth) {
            this.parentObject.health = this.parentObject.maxHealth // Don't allow exceeding max health
        }
    }

}