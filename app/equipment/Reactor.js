class Reactor extends Equipment {
    constructor(game,options) {
        super(game,options);
        this.chargeRate = options.data.chargeRate;
        this.capacity = options.data.capacity;

        this.isReactor = true;

        this.infoFields = ['baseValue','mass','rarity','__space__','type','capacity','readableChargeRate'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Reactor Type','Capacity','Recharge Rate'];

        this.powerUpSound = game.add.audio('power-up')
        this.powerDownSound = game.add.audio('power-down')
    }

    set equipped(equipped){
        this._equipped = equipped;
        
        if(this.parentObject){
             if(equipped) this.parentObject.maxEnergy += this.capacity;
             if(!equipped) this.parentObject.maxEnergy -= this.capacity;
        }
        
        if(equipped){
            this.powerUpSound.play();
        } else {
            this.powerDownSound.play();            
        }
    }

    get equipped(){
        return this._equipped;
    }

    update(){
        super.update();
        if(this.parentObject) this.parentObject.charge(this.chargeRate);
    }
}