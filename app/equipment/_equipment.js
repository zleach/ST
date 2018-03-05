class Equipment extends InventoryObject {
    constructor(game,options) {
        super(game,options);

        this.game.register(this); // Equipment must be registered
        this.parentObject = options.parentObject;

        this.isEquippable = true;
        this._equipped = false;
        
        this.energyConsumption = 0;
        this.storageClass = CARGO_STORAGE_CLASS.equipment;

        this.equipSound = game.add.audio('equip');
        this.unequipSound = game.add.audio('unequip');
    }
    
    set equipped(equipped){
        this._equipped = equipped;        
    }
    
    get equipped(){
        return this._equipped;
    }
    
    equipTo(parentObject){
        if(parentObject){
            this.equipSound.play();
            this.parentObject = parentObject;
            this.equipped = true;
    
            if(this.isWeapon) {
                this.parentObject.equipWeaponInSlot(this,0);
            } else if(this.isEngine) {
                this.parentObject.equipEngineInSlot(this,0);
            } else {
                this.parentObject.equipEquipmentInSlot(this,0);
            }

        }
    }
    
    unequip(){        
        if(this.parentObject){
            this.unequipSound.play();

            if(this.isWeapon) {
                this.parentObject.unequipWeapon(this);
            } else if(this.isEngine) {
                this.parentObject.unequipEngine(this);
            } else {
                this.parentObject.unequipEquipment(this);
            }
        }
    }
    
    update(){
        
    }
}