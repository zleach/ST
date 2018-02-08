class Ship extends GameObject {
    constructor(game) {
        super(game);
        
        // Basic Ship
        this.specs = {
            name : 'Unknown Ship',
            description : 'Unknown Class',
        }

        this.dockingDistance = 100;
        this.dockedShips = [];
        this.isDocked = false;

        this.fuelQuantity = 0;
        this.energyQuantity = 0;

        this.weapons = [];
        this.engines = [];    
        this.equipment = [];
    }
    
    setupSprite(sprite){
        // Physics
        this.game.physics.arcade.enable(sprite);
        sprite.body.maxAngular = this.specs.maxTurning;
        sprite.body.drag.set(2);
        sprite.body.bounce.setTo(.2, .2);
        sprite.body.setSize(
            this.specs.size.width, 
            this.specs.size.height, 
            this.specs.size.offsetX, 
            this.specs.size.offsetY
        );
        sprite.body.collideWorldBounds = true;
        this.sprite.parentObject = this;
        this.game.ships.add(this.sprite);        
        
        // Info
        this.nameText = this.game.add.bitmapText(0,0, 'pixelmix_normal2x', this.specs.name, 7 );
        this.nameText.alpha = 0;

        this.subText = this.game.add.bitmapText(0,0, 'pixelmix_normal2x', this.specs.description, 6);
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.bitmapText(0,0, 'pixelmix_normal', 'Press D to Dock', 8);
        this.landingMessage.alpha = 0;
    }
    
    positionInfo(){
            var x = 20+this.sprite.x + this.sprite.width/2;
            var y = this.sprite.y;
            
            this.nameText.x = x; 
            this.nameText.y = y-40; 
    
            this.subText.x = x; 
            this.subText.y = y-20; 
    
            this.landingMessage.x = x; 
            this.landingMessage.y = y+20;             
    }
    
    // Weapons
    firePrimaryWeapon(){
        for (let weapon of this.weapons) {
            if(this.hasEnergy){
                this.consumeEnergy(weapon.energyConsumption)
                if(this.energyPercentage>1) weapon.weapon.fire();
            }
        }
    }

    equipWeaponInSlot(weapon,slot){
        this.weapons.push(weapon);

        weapon.weapon.trackSprite(
            this.sprite,
            this.specs.weaponSlots[slot].position.x,
            this.specs.weaponSlots[slot].position.y,
            true
        );
    }

    // Engines
    equipEngineInSlot(engine,slot){
        // Equip
        this.engines.push(engine);
        engine.slot = slot;
        
        // Calculate new max speed (average of engine max speeds)
        var maxSpeed = 0;
        for (let engine of this.engines) {
            maxSpeed += engine.maxSpeed;
        }

        this.sprite.body.maxVelocity.set(maxSpeed / this.engines.length);
    }
    
    // Equipment
    equipEquipmentInSlot(equipment,slot){
        this.equipment.push(equipment);
    }

    
    // Movement
    accelerate() {
        if(!this.isDocked){
            // Not Docked
            var totalThurst = 0;
            for (let engine of this.engines) {
                if(this.hasFuel){
                    this.consumeFuel(engine.fuelConsumption)
                    totalThurst += engine.thrust;
                    engine.accelerate();
                } else {
                    engine.deaccelerate();                
                }
            }
    
            this.game.physics.arcade.accelerationFromRotation(
                this.sprite.rotation,
                totalThurst,
                this.sprite.body.acceleration
            );
        } else {
            // Docked
            for (let engine of this.engines) {
                engine.deaccelerate();
            }
        }
    }
    
    deadSlowAhead(){
        this.game.physics.arcade.accelerationFromRotation(
            this.sprite.rotation,
            .33,
            this.sprite.body.acceleration
        );
    }
    
    deaccelerate() {
        if(this.sprite){
            this.sprite.body.acceleration.set(0);
    
            for (let engine of this.engines) {
                engine.deaccelerate();
            }            
        }
    }
    
    turnLeft(){
        if(!this.isDocked) this.sprite.body.angularVelocity -= this.specs.turnAccel;
    }

    turnRight(){
        if(!this.isDocked) this.sprite.body.angularVelocity += this.specs.turnAccel;
    }
    
    deaccelerateTurning(){
        if(this.sprite){
            if(this.sprite.body.angularVelocity>0){
                this.sprite.body.angularVelocity = Math.max(this.sprite.body.angularVelocity-this.specs.turnDecay,0);
            }
            if(this.sprite.body.angularVelocity<0){
                this.sprite.body.angularVelocity = Math.min(this.sprite.body.angularVelocity+this.specs.turnDecay,0);
            }
        }
    }
    
    // Fuel Mgmt
    refuel(){
        this.fuelQuantity = this.specs.maxFuel;
        this.lowFuelLightShown = false;
    }
    
    lowFuelLight(){
        if(!this.lowFuelLightShown) {
            this.game.hud.message("Low Fuel");
            this.lowFuelLightShown = true;
        }
    }
    
    consumeFuel(amount){
        this.fuelQuantity -= amount;

        if(this.fuelPercentage<25){
            this.lowFuelLight();
        }

        if(!this.hasFuel){
            this.game.hud.blinkingWarning("Out of Fuel");
        }
    }
    
    get fuelPercentage(){
        return Math.round((this.fuelQuantity/this.specs.maxFuel)*100)        
    }
        
    get hasFuel(){
        if(this.fuelQuantity>=0){
            return true;
        } else {
            return false;
        }
    }
    
    // Energy Management
    recharge(){
        this.energyQuantity = this.specs.maxEnergy;
    }
    
    charge(amount){
        if(this.energyQuantity <= this.specs.maxEnergy){
            this.energyQuantity += amount;
        }
        
        if(this.energyQuantity>=this.specs.maxEnergy){
            this.energyQuantity = this.specs.maxEnergy;
        }
    }
            
    consumeEnergy(amount){
        this.energyQuantity -= amount;

        if(!this.hasEnergy){
            //this.game.hud.blinkingWarning("Not Enough Energy");
        }
    }
    
    get energyPercentage(){
        var value = Math.round((this.energyQuantity/this.specs.maxEnergy)*100);
        return Math.max(value,0);
    }
        
    get hasEnergy(){
        if(this.energyQuantity>=0){
            return true;
        } else {
            return false;
        }
    }

    // Docking
    attemptToDock(){        
        if(this.isDocked){
            if(this.dockingInProgress){
                this.abortDocking();
            } else {
                this.releaseDock();
            }
            return;
        }
        
        // Dock initiator calls this (ie. Dockee connects to Docker)
        var closestShip = false;
        var shipsInRange = [];
        for (let ship of this.game.gameObjects) {
            if(ship.specs!=undefined && ship!=this){
                var distance = this.game.physics.arcade.distanceBetween(ship.sprite, this.sprite);
                if(distance<=ship.dockingDistance){
                    shipsInRange.push({
                        distance: distance,
                        ship: ship,
                    })
                }
            }
        }
        if(shipsInRange.length>0){
            shipsInRange.sort(function(a, b) {
                return a.distance - b.distance;
            });
            var shipToDockTo = shipsInRange[0].ship;

            var maxSpeedWhenDocking = 10;
            if((this.sprite.body.speed-shipToDockTo.sprite.body.speed)>maxSpeedWhenDocking){
                this.game.hud.message("Moving too fast to dock");
                return;
            }
            
            this.dockWith(shipToDockTo);
        } else {
            this.game.hud.message("No Dock Availabe");
        }
    }
    
    dockWith(ship){
        var dockingSpeed = 3000;
        
        this.sprite.body.acceleration.set(0);
        this.sprite.body.velocity.set(0);
        
        var dockingPortNumber = 0;
        
        var dockingPosition = ship.specs.dockingPorts[dockingPortNumber].position
        this.dockingTween = this.game.add.tween(this.sprite).to({
            x: ship.sprite.x - dockingPosition.x,
            y: ship.sprite.y - dockingPosition.y,
            angle : ship.sprite.angle - dockingPosition.angle,
        }, dockingSpeed, "Quart.easeOut", true);

        this.dockingTween.onUpdateCallback(this.matchSpeedForDocking,this);

        this.isDocked = true;
        this.dockingTarget = ship;
        ship.landingMessage.setText('Docking...');

        game.time.events.add(Phaser.Timer.SECOND * dockingSpeed/1000, this.dockingComplete, {
            target: ship,
            dockedShip: this,
            portNumber: dockingPortNumber,
            game: this.game,
        });
    }

    matchSpeedForDocking(){
        var endingAngle = this.dockingTween.timeline[0].vEnd.angle;
        var x = this.dockingTween.timeline[0].vEnd.x + this.dockingTarget.sprite.deltaX
        var y = this.dockingTween.timeline[0].vEnd.y + this.dockingTarget.sprite.deltaY
        this.dockingTween.timeline[0].vEnd={x:x,y:y, angle: endingAngle};
    }
    
    dockingComplete(){
        var target = this.target;
        var dockedShip = this.dockedShip;
        var portNumber = this.portNumber; // What docking port am i at?
        
        dockedShip.isDocked = true;
        dockedShip.dockedAtPortNumber = portNumber;
        dockedShip.hardDocked = true;
        dockedShip.dockingInProgress = false;

        target.dockedShips.push(dockedShip);

        this.game.hud.message("Docking Complete");
        target.landingMessage.setText('Press D to Release');
    }    

    releaseDock(){
        if(this.hardDocked && this.isDocked){
            // Docking animation completed and ship is completely docked
            this.game.physics.arcade.accelerationFromRotation(
                this.sprite.rotation - Math.PI,
                1000,
                this.sprite.body.acceleration
            );
    
    	    var emitter = this.game.add.emitter(
    	        this.sprite.x - this.specs.dockingConnectorPosition.x,
                this.sprite.y - this.specs.dockingConnectorPosition.y,
                100
            );
    
            emitter.makeParticles('cloud');
            emitter.gravity = 0;
            emitter.maxRotation = 100;
            emitter.minRotation = 30;
            emitter.minParticleScale = .01;
            emitter.maxParticleScale = .1;
            emitter.explode(200, game.rnd.integerInRange(7, 10));
            this.game.time.events.add(500, this.destroyEmitter, emitter);  
        }

        // Reset Docking
        this.abortDocking();
    }

    abortDocking(){
        //this.dockedToShip.landingMessage.setText('Press D to Dock');
        this.isDocked = false;
        this.dockedToShip = null;
        this.dockedAtPortNumber = null;
        this.hardDocked = false;
        this.dockingInProgress = false;
        this.dockingTarget = null;
    }
    
    // Cargo
    emptyCargoHold(){
        this.freeSpace = {};
        this.freeSpace[CARGO_STORAGE_CLASS.bulk] = this.specs.storage.bulk;
        this.freeSpace[CARGO_STORAGE_CLASS.passengers] = this.specs.storage.passengers;
        this.freeSpace[CARGO_STORAGE_CLASS.gas] = this.specs.storage.gas;
        this.freeSpace[CARGO_STORAGE_CLASS.liquid] = this.specs.storage.liquid;
    }

    // Info
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            //this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            //this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
            //this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
        
            this.infoShowing = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
        }
    }
    
    hideInfo(){
        this.game.add.tween(this.nameText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.subText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.landingMessage).to( { alpha: 0 }, 300, "Quart.easeOut", true);

        this.game.add.tween(this.subText).to( { y: '+30' }, 0, "Quart.easeOut", true);                
        this.game.add.tween(this.nameText).to( { y: '+30' }, 0, "Quart.easeOut", true);    
        this.game.add.tween(this.landingMessage).to( { y: '+30' }, 0, "Quart.easeOut", true);                

        this.infoShowing = false;
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }
    // Weapons + Damage Collisions

    processBulletCollision(ship, bullet){
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);
        
        //this.inflictDamage(bullet.damage);
        
        bullet.kill();
        return false; // Never collides, just dies.
    }

    
    // Rendering
    update() {
        super.update(); 
        
        if(this.specs.canBeDockedTo){
            this.positionInfo();
            this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
            this.showInfoIfNeeded();
        }

        if(this.isDocked || this.dockingInProgress){
            this.sprite.x += this.dockingTarget.sprite.deltaX;
            this.sprite.y += this.dockingTarget.sprite.deltaY;
        }

        this.game.ships.forEachAlive(function(ship) {
            if(ship.parentObject.weapons.length>0 && ship.parentObject != this.game.player.ship){
                for (let weapon of ship.parentObject.weapons) {
                    this.game.physics.arcade.collide(
                        this.sprite, 
                        weapon.weapon.bullets, 
                        this.didCollide, 
                        this.processBulletCollision, 
                        this
                    );
                }
            }            
        }, this)
    }   
}

