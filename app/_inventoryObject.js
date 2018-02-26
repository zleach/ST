// Things you can pickup and sell.
class InventoryObject {
    constructor(game,options = false) {
        this.game = game;

        this.name = 'Unknown Object';
        this.baseValue = 0;
        this.type = 'Unknown'
        this.mass = 0;
        this.rarity = RARITY.common;
    
        if(options) this.initWithData(options);
    }    
    
    initWithData(options){
        for(var prop in options) this[prop] = options[prop]
    }

    static make(key,options = {}){
        var data = ITEMS.filter(function(e) {
            return e.key == key;
        })[0];
        
        if(!data) return false; // No Key found
        
        return new InventoryObject(game,data);
    }

    get buyValue(){
        if(this.containedIn!=undefined){
            return Math.round(this.baseValue * this.containedIn.itemMarkup);
        } else {
            return this.baseValue;
        }
    }

    get readableType(){
        if(this.rarity == RARITY.common){
            return this.type;
        } else {
            return `${RARITY_NAMES[this.rarity]} ${this.type}`
        }
    }

    get readableMass(){
        return `${numeral(this.mass).format('0,0')} kg`
    }    
}