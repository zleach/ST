class Ship extends GameObject {
    constructor(game,x,y) {
        super(game);
        
        // Basic Ship
        this.specs = {
            name : 'Unknown Ship',
            description : 'Unknown Class',
            storage : {
                bulk : 100,
/*
                passengers : 100,
                gas : 100,
                liquid : 100,
*/
            }
        }
        
        this.isShip = true;
        
        this.xStart = x;
        this.yStart = y;

        this.dockingDistance = 250;
        this.dockedShips = [];
        this.isDocked = false;

        this.fuelQuantity = 0;
        this.energyQuantity = 0;
        this.maxEnergy = 0;
        this.oxygenQuantity = 3000;
        this.oxygenMax = 3000;
        this.hullBreachAtHealthPercentage = .40;
        this.hullBreached = false;
        this.O2Critical = false;

        this.weapons = [];
        this.engines = [];    
        this.equipment = [];
        
        this.canPickThingsUp = true;
        this.canNavigateTo = true;
        
        this.navigation = {
            currentWaypoint: 0,
        }
        this.navigationMode = NAVIGATION_MODE.free;
        this.navigationIndex = -1;

        // Sounds
        this.infoSound = game.add.audio('beep-beep');
        this.gasLeakSound = game.add.audio('gas-leak');
        this.dockConnectSound = game.add.audio('dock-connect');
        this.dockReleaseSound = game.add.audio('dock-release');
        this.navTargetChangedSound = game.add.audio('blorp');
        this.crashSounds = [
            game.add.audio('crash-1'),
            game.add.audio('crash-2'),
            game.add.audio('crash-3'),
            game.add.audio('crash-4'),
            game.add.audio('crash-5'),
        ]

        this.crashLightSounds = [
            game.add.audio('crash-light-1'),
            game.add.audio('crash-light-2'),
        ]        

        this.crashThudSounds = [
            game.add.audio('crash-thud-1'),
            game.add.audio('crash-thud-2'),
        ]        
    }
    
    setupSprite(sprite){
        super.setupSprite(sprite);

        // Physics
        this.game.physics.p2.enable(sprite,P2BODY_DEBUG);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon(null,this.specs.polygon);       
        this.sprite.body.damping = 0;
        this.sprite.body.mass = this.specs.mass;
        this.sprite.parentObject = this;
        
        if(this.specs.dockingConnector!=undefined){
            this.dockingConnector = this.sprite.addChild(this.game.make.sprite(0, 0, 'null'));
            this.dockingConnector.x = this.specs.dockingConnector.position.x;
            this.dockingConnector.y = this.specs.dockingConnector.position.y;
        }

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
        
        // Health
        this.health = this.specs.health;
        this.maxHealth = this.specs.health;
        
        // Fuel
        this.maxFuel = this.specs.maxFuel
        
        // Info
        this.name = this.specs.name;
        this.description = this.specs.description;
        
        this.nameText = this.game.add.text(
            0,0,
            this.name, 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.text(
            0,0, 
            this.description, 
            { font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.text(
            0,0,
            'Cleared to Dock', 
            { font: `10px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.landingMessage.alpha = 0;

        // Emiiters
        var flamesData = {
            lifespan: 1000,
            image: 'white',
            bringToTop: true,
            blendMode: 'ADD',
            hsv: { initial: 0, value: 70, control: 'linear' },
            alpha: { initial: 0, value: 1, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.8 }, { x: 1, y: 0 } ] },
            scale: { min: 0.05, max: .5 },
            vx: { min: -0.5, max: 0.5 },
            vy: { min: -.1, max: .1 }
        };
        this.game.ps.addData('flames', flamesData);
        this.flamesEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.flamesEmitter.addToWorld();

        // Atmosphere
        this.ventData = {
            lifespan: 8000,
            image: 'white-smooth',
            blendMode: 'ADD',
            vx: { min: -.4, max: .4 },
            vy: { min: -.4, max: .4 },
            alpha: { min: 0, max: .3 },
            scale: { initial: 0.1, value: .4, control: 'linear' },
        };
        this.game.ps.addData('atmosphere', this.ventData);
        this.atmosphereEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.atmosphereEmitter.addToWorld();
        this.atmosphereWell = this.atmosphereEmitter.createGravityWell(0,0, .01);

        // Hyperdrive
        var hyperData = {
            lifespan: 600,
            image: 'white',
            bringToTop: true,
            blendMode: 'ADD',
            hsv: { value: 250,},
            alpha: { value: .5 , control:  [{ x: 0, y: 1 }, { x: 1, y: 0 } ]},
        };
        this.game.ps.addData('hyperDrive', hyperData);
        this.hyperDriveEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.hyperDriveEmitter.addToWorld();

        // Cargo Jettison
        this.cargoJettisonEmitter = game.add.emitter(0, 0, 3);    
        this.cargoJettisonEmitter.makeParticles('crate-tiny');
        this.cargoJettisonEmitter.gravity = 0;
        this.cargoJettisonEmitter.setAlpha(1,0,1000);
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

    unequipWeapon(weapon){
        weapon.equipped = false;

        var index = this.weapons.indexOf(weapon);
        if (index > -1) {
            this.weapons.splice(index, 1);
        }
    }

    // Engines
    equipEngineInSlot(engine,slot){
        // Equip
        this.engines.push(engine);

        engine.parentObject = this;
        engine.slot = slot;
        
        this.calculateMaxSpeed(); 
    }
    
    unequipEngine(engine){
        engine.equipped = false;
        
        var index = this.engines.indexOf(engine);
        if (index > -1) {
            this.engines.splice(index, 1);
        }
        
        this.calculateMaxSpeed();
    }

    calculateMaxSpeed(){
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
        this.thrusters[thruster] = new Thruster(this.game,{
            parentObject : this,
            layout : layout,
        })
        
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
        var thruster = this.thrusters[thruster]
        thruster.shutdown();
    }
    
    shutdownAttitudeThrusters(){
        for (var thrusterKey in this.specs.RCS) {
            var thruster = this.thrusters[thrusterKey];
            if(!thruster.retro) thruster.shutdown();
        }        
    }
    shutdownRetroThrusters(){
        for (var thrusterKey in this.specs.RCS) {
            var thruster = this.thrusters[thrusterKey];
            if(thruster.retro) thruster.shutdown();
        }        
    }
    
    // Equipment
    equipEquipmentInSlot(equipment,slot){
        this.equipment.push(equipment);
    }

    unequipEquipment(equipment){
        equipment.equipped = false;
        
        var index = this.equipment.indexOf(equipment);
        if (index > -1) {
            this.equipment.splice(index, 1);
        }
    }

    
    // Movement    
    get heading(){
        return this.sprite.angle;
    }
    
    accelerate() {
        this.playJettisonCargoAnimation();

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
        if(this.hyperDriveEngaged) maxVelocity = 50;
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

            this.shutdownRetroThrusters();
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
        
        this.shutdownAttitudeThrusters();
    }
    
    
    // Navigation
    navigate(){
        if(this.navigationMode == NAVIGATION_MODE.free) return;

        if(this.navigationMode == NAVIGATION_MODE.stationKeeping) this.keepStation();

        if(this.navigationMode == NAVIGATION_MODE.target) this.trackTargetCurrentNavigationTarget();
        
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
    
    trackTargetCurrentNavigationTarget(){
        // Doesnt do much.
    }
    
    nextNavigationTarget(){
        this.navigationMode = NAVIGATION_MODE.target;
        this.navigationIndex++;
        
        if(this.navigationIndex>this.navigatableObjects.length-1){
            this.navigationIndex = -1;   
        }

        this.navTargetChangedSound.play();
        
        this.setNavigationTargetToCurrentNavigationTargetIndex();
    }
    
    get navigatableObjects() {
        var objects = [];
        this.game.gameObjects.forEach(function(gameObject) {
            if(gameObject.canNavigateTo && gameObject != this){
                objects.push(gameObject);
            }
        },this);
        return objects;
    }
    
    setNavigationTargetToCurrentNavigationTargetIndex(){
        var index = 0;
        var target = null;
        this.navigatableObjects.forEach(function(navigatableObject) {
            if(index==this.navigationIndex){
                target = navigatableObject;
            }
            index ++;
        },this);
        this.navigationTarget = target;
    }
    
    get distanceToCurrentNavigationTarget(){
        return this.game.physics.arcade.distanceToXY(
            this.sprite,
            this.navigationTarget.sprite.x,
            this.navigationTarget.sprite.y
        );
    }

    get formattedDistanceToCurrentNavigationTarget(){
        var distance = this.distanceToCurrentNavigationTarget*DISTANCE_FACTOR;
        if(distance<3000){
            return 'Arrived';
        } else if(distance<1000000){
            return numeral(distance/1000).format("0,0")+' Mm';
        } else {            
            return numeral(distance/100000).format("0,0.0")+' Gm';
        }
    }

    get formattedTimeToCurrentNavigationTarget(){
        var vx = this.sprite.body.velocity.x;
        var vy = this.sprite.body.velocity.y;
        var eta = this.distanceToCurrentNavigationTarget/Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
        if(eta<1 || eta.isNaN){
            return '--';
        } else {
            return TIME_FORMAT(eta);       
        }
    }
    
    get angleToCurrentNavigationTarget(){
        var angleToWaypoint = this.game.physics.arcade.angleToXY(
            this.sprite,
            this.navigationTarget.sprite.x,
            this.navigationTarget.sprite.y
        );
        var difference = Phaser.Math.wrapAngle(Math.degrees(angleToWaypoint));
        return difference;
    }
    
    
    // Fuel Mgmt
    refuel(){
        this.fuelQuantity = this.maxFuel;
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

    addFuel(amount){
        this.fuelQuantity += amount;
    }
    
    get fuelPercentage(){
        return Math.round((this.fuelQuantity/this.maxFuel)*100)        
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
        this.energyQuantity = this.maxEnergy;
    }
    
    charge(amount){
        if(this.energyQuantity <= this.maxEnergy){
            this.energyQuantity += amount;
        }
        
        if(this.energyQuantity>=this.maxEnergy){
            this.energyQuantity = this.maxEnergy;
        }
    }
            
    consumeEnergy(amount){
        this.energyQuantity -= amount;

        if(!this.hasEnergy){
            //this.game.hud.blinkingWarning("Not Enough Energy");
        }
    }
    
    get energyPercentage(){
        var value = Math.round((this.energyQuantity/this.maxEnergy)*100);
        return Math.max(value,0);
    }
        
    get hasEnergy(){
        if(this.energyQuantity>=0){
            return true;
        } else {
            return false;
        }
    }

    // Landing
    attemptToLand(){                
        // Dock initiator calls this (ie. Dockee connects to Docker)
        var closestLandingSite = false;
        var landingSitesInRange = [];
        for (let landingSite of this.game.gameObjects) {
            if(landingSite.canLand){
                var distance = this.game.physics.arcade.distanceBetween(landingSite.sprite, this.sprite);
                if(distance<=landingSite.showInfoDistance)
                    landingSitesInRange.push({
                        distance: distance,
                        landingSite: landingSite,
                    })
            }
        }
        if(landingSitesInRange.length>0){
            landingSitesInRange.sort(function(a, b) {
                return a.distance - b.distance;
            });

            var landingSite = landingSitesInRange[0].landingSite; // Closest
            var maxSpeedWhenLanding = 10;

            if((this.speed)>maxSpeedWhenLanding){
                this.game.hud.message("Moving too fast to land");
                return;
            }

            this.landAt(landingSite);

        } else {
            this.game.hud.message("No Landing Site Available");
        }
    }

    landAt(landingSite){
        if(this == this.game.player.ship){
            this.game.add.tween(this.sprite).to( { alpha: 0 }, 600, "Quart.easeOut", true);
            this.game.add.tween(this.sprite.scale).to( { x: .5, y: .5 }, 600, "Quart.easeOut", true);

            // Refuel if needed (Only if autorefuel is on)
            if(this.game.player.settings.autoRefuel && landingSite.hasService(PLANET_SERVICES.fuelDepot)){
                this.game.player.autoRefuel();
            }

            this.game.arrivalScreen.destination = landingSite;
            this.game.arrivalScreen.show();
        } else {
            // Handle AI Ship landing
        }
    }

    takeOff(){
        this.game.skipTime(1,'day');
        this.game.skipTime(game.rnd.integerInRange(1, 12),'hour');

        this.game.add.tween(this.sprite).to( { alpha: 1 }, 600, "Quart.easeOut", true, 500);
        this.game.add.tween(this.sprite.scale).to( { x: 1, y: 1 }, 600, "Quart.easeOut", true, 500);    
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

        game.time.events.add(Phaser.Timer.SECOND * 0, this.dockingComplete, {
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

        this.target.dockConnectSound.play();
        
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
            this.dockReleaseSound.play();
            game.physics.p2.removeConstraint(this.dockingConstraint);
            
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
    
    // Info
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.infoSound.play();

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
        
        bullet.kill();
        return false; // Never collides, just dies.
    }
    
    playJettisonCargoAnimation(){
        this.cargoJettisonEmitter.setAngle(this.sprite.angle+90-30,this.sprite.angle+90+30);
        this.cargoJettisonEmitter.x = this.sprite.x;
        this.cargoJettisonEmitter.y = this.sprite.y;
        this.cargoJettisonEmitter.start(true, 5000, null, 1);
    }
    

    // HyperDrive™
    toggleHyperDrive(){
        this.hyperDriveEngaged = !this.hyperDriveEngaged;
    }

    engageHyperDrive(){
        this.hyperDriveEngaged = true;
        this.game.starBlurY.blur = 0;
        this.game.starBlurX.blur = 0;
    }

    hyperDriveUpdate(){
        var maxBlur = 50;

        var vx = this.sprite.body.data.velocity[0];
        var vy = this.sprite.body.data.velocity[1];
        
        this.game.starBlurX.blur = vx;
        this.game.starBlurY.blur = vy;
        
        this.game.stars.filters = [this.game.starBlurY];

        this.sprite.body.thrust(0);
        
        this.game.bgGroup.rotation=10;
        
        this.hyperDriveEmitter.emit(
            'hyperDrive',
            this.sprite.worldPosition.x + this.game.camera.x,
            this.sprite.worldPosition.y + this.game.camera.y
        );        
    }
    
    disengageHyperDrive(){
        this.hyperDriveEngaged = false;    
    }

    // Venting
    ventAtmosphere(){
        var o2Density = (this.oxygenQuantity/this.oxygenMax)/2;
        this.ventData.alpha = { min: 0, max: o2Density };
        this.ventData.vx = { min: -o2Density, max: o2Density };
        this.ventData.vy = { min: -o2Density, max: o2Density };
        
        var x = this.sprite.worldPosition.x + this.game.camera.x;
        var y = this.sprite.worldPosition.y + this.game.camera.y;
        
        this.atmosphereWell.position.x = x;
        this.atmosphereWell.position.y = y;        
        
        if(this.oxygenQuantity>0){
            this.atmosphereEmitter.emit(
                'atmosphere',
                x,
                y
            );
            this.oxygenQuantity--;
            
            if(this.oxygenQuantity<1000){
                if(this == this.game.player.ship && !this.O2Critical) {
                    this.game.hud.blinkingWarning("Oxygen Levels Critical");
                }
                this.O2Critical = true;
            }
            
        } else {
            this.asphyxiate();
        }
    }
    
    get o2Percent(){
        return this.oxygenQuantity/this.oxygenMax;
    }
    
    asphyxiate(){
        this.kill();
    }
    
    burn(){
        this.flamesEmitter.emit(
            'flames',
            this.sprite.worldPosition.x + this.game.camera.x,
            this.sprite.worldPosition.y + this.game.camera.y
        );        
    }

    // Damage
    inflictDamage(amount){
        super.inflictDamage(amount);

        if(this.healthPercentage<this.hullBreachAtHealthPercentage && !this.hullBreached){
            this.hullBreached = true;
            if(this == this.game.player.ship) {
                this.gasLeakSound.play();
                this.game.hud.showO2Panel();
                this.game.hud.blinkingWarning("Hull Breach - Venting Atmosphere");
            }
        }

    }

    // Sounds
    crash_sound(){
        var isPlayingAnySound = false;
        for (let sound of this.crashSounds)
            if(sound.isPlaying){
                isPlayingAnySound = true;
                break;
            }
        
        if(!isPlayingAnySound){
            this.crashSounds[this.game.rnd.integerInRange(0,this.crashSounds.length-1)].play();
        }               
    }
    crashSoft_sound(){
        var isPlayingAnySound = false;
        for (let sound of this.crashLightSounds)
            if(sound.isPlaying){
                isPlayingAnySound = true;
                break;
            }
        
        if(!isPlayingAnySound){
            this.crashLightSounds[this.game.rnd.integerInRange(0,this.crashLightSounds.length-1)].play();
        }       
    }
    crashThud_sound(){
        var isPlayingAnySound = false;
        for (let sound of this.crashThudSounds)
            if(sound.isPlaying){
                isPlayingAnySound = true;
                break;
            }
        
        if(!isPlayingAnySound){
            this.crashThudSounds[this.game.rnd.integerInRange(0,this.crashThudSounds.length-1)].play();
        }       
    }

    
    // Rendering
    update() {
        super.update(); 
        this.positionInfo();        
        this.navigate();        

        // Damage
        if(this.hullBreached){
            this.ventAtmosphere();
        }

        // Cargo

        // Hyperdrive
        if(this.hyperDriveEngaged) this.hyperDriveUpdate();
        
        // Docking
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

        // Finally, limit speed.
        this.limitSpeed();
    }   
}

