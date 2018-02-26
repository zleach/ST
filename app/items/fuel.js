class Item_Fuel extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Rocket Fuel';
        this.storageClass = CARGO_STORAGE_CLASS.liquid
        this.rarity = RARITY.exotic;
        this.mass = 1;
        this.type = 'Liquid'

        this.baseValue = 1;
    }
}