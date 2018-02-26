class Item_MeteoricIron extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Meteoric Iron';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.uncommon;
        this.mass = 15;
        this.baseValue = 32;
        this.type = 'Mineral';
    }
}