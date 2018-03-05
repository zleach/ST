class BasicFuelTank extends Equipment {
    constructor(game,options) {
        super(game,options);
        this.fuelCapacity = options.data.fuelCapacity;

        this.isFuelTank = true;

        this.infoFields = ['baseValue','mass','rarity','__space__','fuelCapacity'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Capacity'];
    }

    set equipped(equipped){
        this._equipped = equipped;
        
        
        if(this.parentObject){
            console.log(this.parentObject.maxFuel);
            
            if(equipped) this.parentObject.maxFuel += this.fuelCapacity;
            if(!equipped) this.parentObject.maxFuel -= this.fuelCapacity;
                          
            console.log(this.parentObject.maxFuel);
        }
        

/*
        TODO:
        if(equipped){
            this.powerUpSound.play();
        } else {
            this.powerDownSound.play();            
        }
*/
    }

    get equipped(){
        return this._equipped;
    }

    update(){
        super.update();
    }
}