class Economy {
    constructor(game) {
        this.game = game;
    }
    
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