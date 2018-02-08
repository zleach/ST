class GameObject {
    constructor(game) {                
        this.game = game;
        this.game.register(this);
    
        this.showInfoDistance = 100;

        // Basics
        this.health = 0;
        this.alive = true;
        this.isInvinsible = false;

        // Damage Managment        
        this.damageAccumulating = false;
        this.damageAccumulationAmount = 0;        
    
    
        // Item Managment
        this.inventory = [];
        this.itemsAccumulating = false;
        this.itemsAccumulator = [];        
    }

    inflictDamage(amount){
        if(!this.isInvinsible){            
            if(!this.damageAccumulating){
                this.damageAccumulating = true;
                this.damageAccumulationAmount +=amount;
                setTimeout(function(){
                    this.damageAccumulating = false;
                    this.showDamage(this.damageAccumulationAmount);
                    this.damageAccumulationAmount = 0;
                }.bind(this), 250)
            } else {
                this.damageAccumulationAmount +=amount;                
            }
            
            if(this.health>0){
                this.health -= amount;
            } else if(this.health<=0){
                this.kill();
            }        
        }
    }
        
    showDamage(amount){
        var x = this.sprite.x + game.rnd.integerInRange(-this.sprite.width/5, this.sprite.width/5);
        var damageText = game.add.bitmapText(x, this.sprite.y, 'pixelmix_bold2x',amount,6);
        damageText.anchor.x = 0.5;
        damageText.alpha = 0;
        damageText.tint = 0xf1c40f;
                
        var fadeIn = this.game.add.tween(damageText).to( { alpha: 1 }, 200, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(damageText).to( { y: '-30' }, 800, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(damageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 150);        
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, damageText);
    }
    
    collectNumberOfItems(amount,item){
        if(this.addItemsToInventory(amount,item)){
            if(!this.itemsAccumulating){
                this.itemsAccumulating = true;
                this.itemsAccumulator[item.name] = { item: item, amount: amount };
                
                setTimeout(function(){
                    this.itemsAccumulating = false;
                    this.showItemsCollected(this.itemsAccumulator);
                    this.itemsAccumulator = [];
                }.bind(this), 500)
            } else {
                if(this.itemsAccumulator[item.name]==undefined){
                    this.itemsAccumulator[item.name] = { item: item, amount: amount };
                } else {
                    this.itemsAccumulator[item.name]['amount'] +=amount;                
                }
            }
            return true;
        } else {
            return false;
        }
    }
        
    showItemsCollected(items){
        var context = this;
        Object.keys(items).forEach(function(key,index) {
            var verticalSpacing = 18;
            var itemGroup = items[key];
            var itemMessage = `+${itemGroup.amount} ${itemGroup.item.name}`;
            var itemText = game.add.bitmapText(this.sprite.x, this.sprite.y-(verticalSpacing*index), 'pixelmix_normal2x',itemMessage,5);
            itemText.anchor.x = .5;
            itemText.alpha = 0;
            itemText.tint = RARITY_COLOR[itemGroup.item.rarity];
        
            var fadeIn = this.game.add.tween(itemText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
        	var moveUp = this.game.add.tween(itemText).to( { y: '-30' }, 300, "Quart.easeOut", true);
            var fadeOut = this.game.add.tween(itemText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 1000);        
    
            fadeIn.chain(fadeOut);
            fadeIn.start();

            game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, itemText);

        }.bind(this));
    }

    // Inventory
    get bulkFreeSpace(){
        return numeral(this.freeSpace[CARGO_STORAGE_CLASS.bulk]).format('0a')
    }
    get bulkUsedSpace(){
        return numeral(this.specs.storage.bulk-this.freeSpace[CARGO_STORAGE_CLASS.bulk]).format('0a')
    }

    get bulkMaxSpace(){
        return numeral(this.specs.storage.bulk).format('0a')
    }

    calculateFreeSpaceForStorageClass(storageClass){
        return this.freeSpace[storageClass];
    }
    
    hasEnoughSpaceForItemOfStorageClassWithMass(storageClass,mass){
        if(this.calculateFreeSpaceForStorageClass(storageClass) >= mass){
            return true;
        } else {
            return false;
        }
    }
    
    addItemsToInventory(amount,item){
        for (var i = 0; i < amount; i++) { 
            if(this.hasEnoughSpaceForItemOfStorageClassWithMass(item.storageClass,item.mass)){
                this.inventory.push(item);
                this.freeSpace[item.storageClass] -= item.mass;
                return true;
            } else {
                this.game.hud.message('Not Enough Cargo Space');
                return false;
            }
        }
    }
    
    
    kill(){
        this.alive = false;
        this.game.unregister(this);        

        if(this.sprite!=undefined){
            this.sprite.body.kill();
            this.sprite.kill();
        }
    }

    destroy(){
        this.alive = false;

        this.game.unregister(this);        
        if(this.sprite!=undefined){
		    this.sprite.body.enable = false;
            this.sprite.kill();
        }
    }

    destroyEmitter(){
        this.destroy();        
    } 

    destroyObject(){
        this.destroy();        
    } 

    update(){
        
    }
}