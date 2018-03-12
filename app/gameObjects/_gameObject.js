class GameObject {
    constructor(game) {
        this._seed = 0;  
        this._name = 'Unknown Object';
        this.description = '';

        this.game = game;
        this.game.register(this);
    
        this.showInfoDistance = 200;
        this.canNavigateTo = false;
        this.navigationIndex = this.game.gameObjects.length;
        
        // Basics
        this.health = 0;
        this.alive = true;
        this.isInvinsible = false;
        this._targeted = false;

        // Damage Managment        
        this.damageAccumulating = false;
        this.damageAccumulationAmount = 0;        
    
        // Item Managment
        this.itemMarkup = 1;
        this.freeSpace = {};
        this.inventory = [];
        this.itemsAccumulating = false;
        this.itemsAccumulator = [];     

        this.dingSound = game.add.audio('pickup-common-1');

        this.rng = this.game.rng;
    }
    
    setupSprite(sprite){
        this.maxHealth = this.health;
    }
    
    // Targeting
    set targeted(targeted){
        this._targeted = targeted;
        
        if(targeted){
            this.showReticle();
        } else {
            this.hideReticle();
        }

    }

    get targeted(){
        return this._targeted;
    }

    showReticle(){
        
    }
    
    hideReticle(){
        
    }

    
    // Damage
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
            } else if(this.health<=0 && this.alive){
                this.kill();
            }        
        }
    }
    
    get healthPercentage(){
        return this.health/this.maxHealth;
    }
        
    showDamage(amount){
        var x = this.sprite.x + game.rnd.integerInRange(-this.sprite.width/5, this.sprite.width/5);

        var damageText = this.game.add.text(
            x,
            this.sprite.y, 
            Math.round(amount), 
            { font: `18px ${FONT}`, fill: "#eeed00", align: 'center' }, 
        );
        damageText.anchor.x = 0.5;
        damageText.alpha = 0;
                
        var fadeIn = this.game.add.tween(damageText).to( { alpha: 1 }, 200, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(damageText).to( { y: '-30' }, 800, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(damageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 150);        
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, damageText);
    }
    
    hit(bullet){
        // Usually specific per object.
    }
    
    // Items
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

            var itemText = this.game.add.text(
                this.sprite.x,
                this.sprite.y-(verticalSpacing*index), 
                itemMessage, 
                { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'center' }, 
            );
            itemText.stroke = '#000000';
            itemText.strokeThickness = 3;
            itemText.tint = RARITY_COLOR[itemGroup.item.rarity];
        
            var fadeIn = this.game.add.tween(itemText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
        	var moveUp = this.game.add.tween(itemText).to( { y: '-30' }, 300, "Quart.easeOut", true);
            var fadeOut = this.game.add.tween(itemText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 1000);        
    
            fadeIn.chain(fadeOut);
            fadeIn.start();

            game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, itemText);
        }.bind(this));
        
        this.dingSound.play();
    }

    // Inventory
    usedSpaceForStorageClass(storageClass){
        return numeral(this.specs.storage[storageClass]-this.freeSpace[storageClass]).format('0a')
    }

    freeSpaceForStorageClass(storageClass){
        return numeral(this.freeSpace[storageClass]).format('0a')
    }

    maxSpaceForStorageClass(storageClass){
        return numeral(this.specs.storage[storageClass]).format('0a')        
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
                item.containedIn = this;
                
                this.inventory.push(item);
                this.freeSpace[item.storageClass] -= item.mass;
                return true;
            } else {
                this.game.hud.message('Not Enough Cargo Space');
                return false;
            }
        }
    }

    removeItemsFromInventory(items){
        var removedItems = [];
        for (let item of items) {
            removedItems.push(item);
            this.removeItemFromInventory(item);
        }
        return removedItems;
    }

    removeItemFromInventory(item){
        var index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
        return true;
    }

    // Cargo
    emptyCargoHold(){
        this.inventory = [];

        this.freeSpace[CARGO_STORAGE_CLASS.bulk] = this.specs.storage.bulk;
        this.freeSpace[CARGO_STORAGE_CLASS.passengers] = this.specs.storage.passengers;
        this.freeSpace[CARGO_STORAGE_CLASS.gas] = this.specs.storage.gas;
        this.freeSpace[CARGO_STORAGE_CLASS.liquid] = this.specs.storage.liquid;
        this.freeSpace[CARGO_STORAGE_CLASS.equipment] = this.specs.storage.equipment;
    }
    
    // Lifecycle
    kill(){
        this.alive = false;
        this.game.unregister(this);        

        if(this.sprite!=undefined){
            //this.sprite.body.kill();
            this.sprite.kill();
        }
    }

    destroy(){
        this.alive = false;

        this.game.unregister(this);        
        if(this.sprite!=undefined){
            this.sprite.destroy();
        }
    }

    destroyEmitter(){
        this.destroy();        
    } 

    destroyObject(){
        this.destroy();        
    } 

    // Misc
    get name(){ return this._name; }
    set name(name){
        this._name = name;
    }
    
    get speed(){
        var body = this.sprite.body
        var vx, vy;
        
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        
        return vx * vx + vy * vy;
    }
    
    
    // Hashing and whatnot
    get hash(){
        var fullHash = Math.abs(CryptoJS.MD5(this._seed + this.name).words[0]);
        var hashString = fullHash.toString().slice(0,5);
        return hashString;
    }

    determineItemFromArray(array){
        return array[this.rng.nextInt(0, array.length-1)];
    }

    determineFloatBetween(min,max){
        return this.rng.next(min, max);
    }

    determineIntegerBetween(min,max){
        return this.rng.nextInt(min, max);
    }

    determinePercent(){
        return this.rng.next();
    }

    update(){
        
    }
}