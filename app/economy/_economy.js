class Economy {
    constructor(game) {
        this.game = game;    
        this.markets = [];

        // Updates
        this.game.time.events.loop(5000, this.updateAllMarkets, this);
    }
    
    // Markets
    registerMarket(market,restock = true){
        market['stockItem'] = this.stockItem;

        this.markets.push(market);
        if(restock) this.restockMarket(market);
    }
    restockMarket(market){
        // Based on certain properites, determine the items for sale in a given market.
        if(market.hasService(PLANET_SERVICES.fuelDepot)){
            market.stockItem('small_fuel_drum',tombola.range(1,2));
            market.stockItem('theta_crystal',tombola.range(1,5));
        }   
        if(market.hasService(PLANET_SERVICES.shipyard)){
            market.stockItem('med_repair_kit',tombola.range(1,2));
            market.stockItem('light_repair_kit',tombola.range(1,2));
            market.stockItem('basic_engine',tombola.range(0,1));
        }   


        

    }
    updateMarket(market){
        
    }
    updateAllMarkets(){

    }

    stockItem(itemKey, amount = 1){
        this.addItemsToInventory(amount, InventoryObject.make(itemKey,this.game));
    }
    
    // Fuel
    get globalFuelPrice(){
        return .033;
    }

    buyFuel(amount){
        if(amount>0){
            var purchaseCost = amount * this.globalFuelPrice;
            if(this.game.player.debitCredits(purchaseCost)){
                this.game.player.ship.addFuel(amount);
                
                var roundedAmt = numeral(amount).format('0.0a')
                var readablePrice = numeral(this.globalFuelPrice).format('$0,0.00')
                
                this.game.hud.purchaseReceipt('Auto Refuel',`${roundedAmt} units @ ${readablePrice}`,purchaseCost);
            } else {
                // Sorry
            }
        } else {
            // Nothing to buy
            return false;
        }
    }

    tick(){
        // Change prices of stuff
        // Spawn stuff   
    }
}