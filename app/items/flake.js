class Item_Flake extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Asteroid Flake';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.common;
        this.mass = 10;
        this.baseValue = 16;
        this.type = 'Mineral';
    }
}