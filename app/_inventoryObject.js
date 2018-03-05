// Things you can pickup and sell.
class InventoryObject {
    constructor(game,options) {
        this.game = game;
        
        this.name = 'Unknown Object';
        this.baseValue = 0;
        this.type = 'Unknown'
        this.mass = 0;
        this.rarity = RARITY.common;

        this.infoFields = ['baseValue','mass','rarity','storageClass'];
        this.infoFieldLabels = ['Value','Weight','Rarity','Container'];

        if(options.data) this.initWithData(options.data);
    }
    
    initWithData(data){
        for(var prop in data) this[prop] = data[prop]
    }

    static make(key,game){
        var data = ITEMS.filter(function(e) {
            return e.key == key;
        })[0];
                
        if(!data) return false; // No Key found
        
        if(data._class){
            // Specific Subclass
            return eval("new " + data._class + "(game,{data : data})");
        } else {
            // Generic
            return new InventoryObject(game,{data:data});
        }        
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