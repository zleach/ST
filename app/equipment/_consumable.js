class Consumable extends InventoryObject {
    constructor(game,options) {
        super(game,options);

        this.parentObject = this.game.player.ship;
        this.isConsumable = true;
    }

    consume(){
        this.parentObject.removeItemFromInventory(this);
    }
}