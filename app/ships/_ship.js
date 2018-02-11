class Ship extends GameObject {
    constructor(game,x,y) {
        super(game);
        
        // Basic Ship
        this.specs = {
            name : 'Unknown Ship',
            description : 'Unknown Class',
        }
        
        this.xStart = x;
        this.yStart = y;

        this.dockingDistance = 250;
        this.dockedShips = [];
        this.isDocked = false;

        this.fuelQuantity = 0;
        this.energyQuantity = 0;

        this.weapons = [];
        this.engines = [];    
        this.equipment = [];
        
        this.canPickThingsUp = true;
    
        this.navigation = {
            waypoints : [
            {
                x: this.game.world.centerX+200,
                y: this.game.world.centerY-200,
            },
            {
                x: this.game.world.centerX+200,
                y: this.game.world.centerY+1000,
            },
            {
                x: this.game.world.centerX-200,
                y: this.game.world.centerY+1000,
            },
            {
                x: this.game.world.centerX-200,
                y: this.game.world.centerY-200,
            },
            ],
            currentWaypoint: 0,
        }
        this.navigationMode = NAVIGATION_MODE.free;
    }
    
    setupSprite(sprite){
        // Physics
        this.game.physics.p2.enable(sprite,P2BODY_DEBUG);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon(null,this.specs.polygon);       
        this.sprite.body.damping = 0.01;
        this.sprite.body.mass = this.specs.mass;
        this.sprite.parentObject = this;
        
        this.dockingConnector = this.sprite.addChild(this.game.make.sprite(0, 0, 'null'));
        this.dockingConnector.x = this.specs.dockingConnector.position.x;
        this.dockingConnector.y = this.specs.dockingConnector.position.y;

        if(this.specs.canBeDockedTo){
            this.dockingPort = this.sprite.addChild(this.game.make.sprite(0, 0, 'dock-arrow'));
            this.dockingPort.x = this.specs.dockingPorts[0].position.x;
            this.dockingPort.y = this.specs.dockingPorts[0].position.y;
            this.dockingPort.anchor.set(.5,2.5);
            this.dockingPort.visible = false;

            this.dockingPortBlink = this.game.add.tween(this.dockingPort).to({
                alpha: 1,
                y: '5'
            }, 600, "Quart.easeOut", true, 0, 0, true).loop(true);
        }
        
        this.setupRCSThrusters();
        this.game.ships.add(this.sprite);        
        
        this.health = this.specs.health;
        
        // Info
        this.nameText = this.game.add.bitmapText(0,0, 'pixelmix_8', this.specs.name, 8);
        this.nameText.alpha = 0;

        this.subText = this.game.add.bitmapText(0,0, 'pixelmix_8', this.specs.description, 5);
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.bitmapText(0,0, 'pixelmix_8', 'Cleared to Dock', 5);
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
            true,
            270,
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
        this.maxSpeed = maxSpeed/10 // No idea.
    }
    
    setupRCSThrusters(){
        if(this.specs.RCS != undefined){
            this.thrusters = {};
            for (var thruster in this.specs.RCS) {
                this.addThruster(thruster,this.specs.RCS[thruster])
            }
        }
    }    
    
    addThruster(thruster,layout){
        this.thrusters[thruster] = new Thruster(this.game,this,layout)
        
        // Hande retro thrusters
        if(layout.retro !=undefined){
            this.thrusters[thruster].retro = layout.retro
        }
    }
    
    fireThruster(thrusterKey){
        if(this.thrusters[thrusterKey]!=undefined && this.hasFuel){
            var thruster = this.thrusters[thrusterKey];
            this.consumeFuel(thruster.fuelConsumption)
            thruster.fire();
        }
    }

    shutdownThruster(thruster){
        this.thrusters[thruster].shutdown();
    }
    
    shutdownAllThrusters(){
        for (var thruster in this.specs.RCS) {
            this.shutdownThruster(thruster)
        }        
    }
    
    // Equipment
    equipEquipmentInSlot(equipment,slot){
        this.equipment.push(equipment);
    }

    
    // Movement
    get speed(){
        var body = this.sprite.body
        var vx, vy;
        
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        
        return vx * vx + vy * vy;
    }
    
    get heading(){
        return this.sprite.angle;
    }
    
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
            this.sprite.body.thrust(totalThurst)
        } else {
            // Docked
            for (let engine of this.engines) {
                engine.deaccelerate();
            }
        }
    }
    
    get totalThurst(){
        var totalThurst = 0;
        for (let engine of this.engines) {
            totalThurst += engine.thrust;
        }
        return totalThurst;
    }
    
    limitSpeed() {
        var maxVelocity = this.maxSpeed;
        var sprite = this.sprite;

        var body = sprite.body
        var angle, currVelocitySqr, vx, vy;
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.data.velocity[0] = vx;
            body.data.velocity[1] = vy;
        }
    };
        
    deaccelerate() {
        if(this.sprite){
            this.sprite.body.acceleration = 0;
    
            for (let engine of this.engines) {
                engine.deaccelerate();
            }            
        }
    }

    goInReverse() {
        if(!this.isDocked && this.hasFuel) {
            if(this.speed<this.specs.maxReverse){
                this.sprite.body.reverse(this.specs.reverseThrust)
            }

            this.fireThruster('retro_a');
            this.fireThruster('retro_b');
        }
    }
    
    turnLeft(){
        if(!this.isDocked && this.sprite.body.angularVelocity>-this.specs.maxTurning && this.hasFuel) {
            this.sprite.body.angularVelocity -= this.specs.turnAccel;
        
            this.fireThruster('forward_right');
            this.fireThruster('aft_left');
        }
    }

    turnRight(){
        if(!this.isDocked && this.sprite.body.angularVelocity<this.specs.maxTurning && this.hasFuel) {
            this.sprite.body.angularVelocity += this.specs.turnAccel;

            this.fireThruster('forward_left');
            this.fireThruster('aft_right');
        }
    }

    moveLeft(){
        if(!this.isDocked && this.hasFuel) {
            this.sprite.body.thrustLeft(this.specs.leftRightThrust)

            this.fireThruster('forward_right');
            this.fireThruster('aft_right');
        }
    }

    moveRight(){
        if(!this.isDocked && this.hasFuel) {
            this.sprite.body.thrustRight(this.specs.leftRightThrust)

            this.fireThruster('forward_left');
            this.fireThruster('aft_left');
        }
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
        
        this.shutdownAllThrusters();
    }
    
    
    // Navigation
    navigate(){
        if(this.navigationMode.free) return;

        if(this.navigationMode.stationKeeping) this.keepStation();
        
        if(this.navigationMode == NAVIGATION_MODE.followWaypoints) {
            this.goToWayPoint(this.navigation.waypoints[this.navigation.currentWaypoint]);
        }
    }

    goToWayPoint(waypoint){
        var shipAngle = this.sprite.rotation;
        
        // Heading
        var angleToWaypoint = this.game.physics.arcade.angleToXY(this.sprite, waypoint.x, waypoint.y) + 1.5708;
        var vx = this.sprite.body.velocity.x;
        var vy = this.sprite.body.velocity.y;
        var eta = this.distanceToWaypoint/Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2)); // Seconds until impact.
        
        var difference = Phaser.Math.wrapAngle(Math.degrees(angleToWaypoint - this.sprite.body.rotation));

        var distanceTolerance = 30;
        if(this.distanceToWaypoint<distanceTolerance){
            this.deaccelerate();
            this.sprite.body.setZeroVelocity();
            this.sprite.body.setZeroRotation();
            this.reachedWaypoint();
        } else {
            var turnSpeed = Math.abs(difference)*.02;
            //sconsole.log(`turn:${turnSpeed.toFixed(2)} | dist: ${this.distanceToWaypoint.toFixed(2)} | eta: ${eta.toFixed(2)}s`);
            if(difference<-3 && difference>-180){
                if(Math.abs(this.sprite.body.angularVelocity)< turnSpeed){
                    this.turnLeft();
                } else {
                    this.deaccelerateTurning();                
                }
                this.deaccelerate();
            } else if(difference>3 && difference<180) {
                if(Math.abs(this.sprite.body.angularVelocity)< turnSpeed){
                    this.turnRight();
                } else {
                    this.deaccelerateTurning();                
                }
                this.deaccelerate();
            } else {
                if(eta < 8){
                    if(this.distanceToWaypoint>distanceTolerance){
                        this.goInReverse();                    
                    }
                    this.deaccelerate();
                } else {
                    this.accelerate();
                }
            }
        }
    }

    reachedWaypoint(){
        console.log("reached");
        if(this.navigationMode == NAVIGATION_MODE.followWaypoints) {
            var w = this.navigation.currentWaypoint + 1;
            if(w>this.navigation.waypoints.length-1){
                w = 0;
            }
            
            this.navigation.currentWaypoint = w;
        }
    }
            
    get distanceToWaypoint(){
        var waypoint = this.navigation.waypoints[this.navigation.currentWaypoint];
        return this.game.physics.arcade.distanceToXY(this.sprite, waypoint.x,waypoint.y);
    }
    
    navigateWaypoints(){
        this.navigationMode = NAVIGATION_MODE.followWaypoints;
    }
    
    keepStation(){
        // Holds steady speed and heading
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
                    shipsInRange.push({
                        distance: distance,
                        ship: ship,
                    })
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
            
            if(!this.okToDock){
                this.game.hud.message("Not aligned for docking");
            } else {
                this.dockWith(shipToDockTo);
            }
        } else {
            this.game.hud.message("No Dock Available");
        }
    }
    
    dockWith(ship){
        var dockingSpeed = 3000;
        
        var dockingPortNumber = 0;

        this.sprite.body.clearShapes();
        ship.sprite.body.clearShapes();
        ship.sprite.body.static = true;        
        
        var dockingPosition = ship.specs.dockingPorts[dockingPortNumber].position

        var dockingAngle = 180 * Math.PI / 180;        
        this.dockingConstraint = game.physics.p2.createLockConstraint(this.sprite, ship.sprite, [0, 72], dockingAngle, 500);
        this.dockedToShip = ship;

        this.isDocked = true;
        this.dockingTarget = ship;
        ship.landingMessage.setText('Docking...');

        game.time.events.add(Phaser.Timer.SECOND * .5, this.dockingComplete, {
            target: ship,
            dockedShip: this,
            portNumber: dockingPortNumber,
            game: this.game,
        });
    }
    
    dockingComplete(){
        var target = this.target;
        var dockedShip = this.dockedShip;
        var portNumber = this.portNumber; // What docking port am i at?
        
        target.sprite.body.loadPolygon(null,target.specs.polygon);       
        target.sprite.body.dynamic = true
        target.sprite.body.mass = true

        dockedShip.sprite.body.loadPolygon(null,dockedShip.specs.polygon)
        dockedShip.dockedToShip.sprite.body.dynamic = true;        
        dockedShip.dockedToShip.sprite.body.mass = dockedShip.specs.mass;        

        dockedShip.isDocked = true;
        dockedShip.dockedAtPortNumber = portNumber;
        dockedShip.hardDocked = true;
        dockedShip.dockingInProgress = false;

        target.dockedShips.push(dockedShip);

        this.game.hud.message("Docking Successful");
        target.landingMessage.setText('Press D to Release');
    }    

    releaseDock(){
        if(this.hardDocked && this.isDocked){
            game.physics.p2.removeConstraint(this.dockingConstraint);
            // Docking animation completed and ship is completely docked
/*
            this.game.physics.arcade.accelerationFromRotation(
                this.sprite.rotation - Math.PI,
                1000,
                this.sprite.body.acceleration
            );
*/
    	    var emitter = this.game.add.emitter(0,0,100);
            this.dockingConnector.addChild(emitter);
                
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
            this.dockingPort.visible = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
            this.dockingPort.visible = false;
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
        this.positionInfo();        
        this.navigate();

        this.limitSpeed();

        if(this.specs.canBeDockedTo && this.sprite != this.game.player.ship.sprite){
            var a = this.dockingPort.worldPosition.x - this.game.player.ship.dockingConnector.worldPosition.x;
            var b = this.dockingPort.worldPosition.y - this.game.player.ship.dockingConnector.worldPosition.y;
            var d = Math.sqrt(a*a + b*b);
           
            // Rotation
            var r = Math.abs(Math.abs(this.sprite.angle - this.game.player.ship.sprite.angle) - 180); 

            if(d<15 && r<20){
                this.game.player.ship.okToDock = true;
                this.landingMessage.setText("Press D to Dock");
            } else {
                this.game.player.ship.okToDock = false;
                this.landingMessage.setText("Cleared to Dock");
            }
            
            // Update distance for info
            this.distanceToPlayer = this.game.physics.arcade.distanceBetween(
                this.sprite,
                this.game.player.sprite
            );

            this.showInfoIfNeeded();
        }

        if(this.isDocked || this.dockingInProgress){
            this.sprite.x += this.dockingTarget.sprite.deltaX;
            this.sprite.y += this.dockingTarget.sprite.deltaY;
        }

    }   
}

