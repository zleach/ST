class Item_Paladium extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Raw Paladium';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.rare;
        this.mass = 20;
    }
}