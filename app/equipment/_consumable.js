class Consumable extends InventoryObject {
    constructor(game,options) {
        super(game,options);

        this.parentObject = this.game.player.ship;

        this.isConsumable = true;
        
        this.equipSound = game.add.audio('equip');
        this.unequipSound = game.add.audio('unequip');
    }

    consume(){
        this.parentObject.removeItemFromInventory(this);
    }
    
}