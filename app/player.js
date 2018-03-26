class Player extends GameObject {
    constructor(game) {
        super(game);

        this.ship = new BasicMiner(game,this.game.world.centerX-350,this.game.world.centerY-200);
        this.sprite = this.ship.sprite;

        this.name = 'Dash Riprock';
        
        this._credits = 1000;
        
        // Settings
        this.settings = {};
        this.settings.autoRefuel = true;

        // Keys
        this.controlMode = CONTROL_MODE.play;

        // RCS
        this.rcsSoundCountdown = 1;
        this.rcsSound = game.add.audio('rcs-loop');
        this.rcsSound.onFadeComplete.add(this.rcsSoundFadeComplete, this);

        this.allowHissSound = true;
        this.allowHissSoundForReverse = true;
        this.hissSounds = [
            game.add.audio('hiss-1'),
            game.add.audio('hiss-2'),
            game.add.audio('hiss-3'),
            game.add.audio('hiss-4'),
            game.add.audio('hiss-5')
        ]


        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);  
        
        // Navigation
        var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.nextNavigationTarget();
        }, this);

        // Landing
        var lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
        lKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.attemptToLand();
        }, this);

        // Docking
        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        dKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.attemptToDock();
        }, this);

        // HyperDrive
        var jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
        jKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.toggleHyperDrive();
        }, this);
        var aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        aKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) {
                this.game.hud.abortFTL();
                this.ship.abortJump();
            }
        }, this);
        var hKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
        hKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.game.hud.toggleFTLPanel();
        }, this);

        // Inventory
        var iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
        iKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.game.inventoryScreen.show();
        }, this);

        // Map
        var mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        mKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.game.mapScreen.show();
        }, this);

        // Camera
        var cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        cKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.game.toggleCameraMode();
        }, this);

    }

    enterDarkness(nebula){
        this.currentNebula = nebula;
        
        if(!this.inDarkness){
            // Wait a bit to hit the lights
            game.time.events.add(Phaser.Timer.SECOND * 2, function(){
                if(this.currentNebula)
                this.game.hud.title(
                    `${this.currentNebula.name}, ${this.game.system.name} System`,
                    moment(this.game.starDate).format('MMMM Do YYYY, HH:mm'),
                );
            }, this);

            game.time.events.add(Phaser.Timer.SECOND * 3, function(){
                if(this.currentNebula){
                    this.game.planets.mask = this.ship.lightMask;
                    this.game.asteroids.mask = this.ship.lightMask;
                    this.game.stars.mask = this.ship.lightMask;
                    // Hack to show only player ship
                    this.ship.sprite.visible = false;
                    this.game.ships.setAll('mask', this.ship.lightMask,false,true);
                    this.ship.sprite.visible = true;
                    this.ship.lightMask.visible = true;    
                }
            }, this);

            this.inDarkness = true;
        }
    }

    exitDarkness(nebula){
        if(this.inDarkness){
            game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                this.game.planets.mask = null;
                this.game.asteroids.mask = null;
                this.game.stars.mask = null;
                this.game.ships.mask = null;
                this.ship.lightMask.visible = false;    
            }, this);

            this.currentNebula = null;
            this.inDarkness = false;
        }
    }
    
    get credits(){
        if(this._credits<999999){
            return CREDIT_PREFIX.short + numeral(this._credits).format('0,0');
        } else {
            return CREDIT_PREFIX.short + numeral(this._credits).format('(0.00 a)');
        }
    }

    debitCredits(amount){
        if(this._credits>=amount){
            this._credits-=amount;
            return true;
        } else {
            return false;
        }
    }

    addCredits(amount){
        this._credits+=amount;
        return true;
    }


    autoRefuel(){
        var fuelNeeded = this.ship.maxFuel - this.ship.fuelQuantity;
        this.game.economy.buyFuel(fuelNeeded);
    }
    
    buy(item, amount = 1){
        debugger;
    }
    
    sell(item, amount = 1){
        
    }
    
    stop(){
        // Used when landing etc.
        this.ship.sprite.body.setZeroVelocity();
        this.ship.sprite.body.setZeroRotation();
        this.ship.sprite.body.setZeroForce();
    }
    
    rcsSoundFadeComplete(){
        this.rcsSound.stop();
    }
    
    hiss(){
        if(this.allowHissSound) {
            if(!this.ship.hyperDriveEngaged && !this.ship.fuelQuanity){
                this.hissSounds[this.game.rnd.integerInRange(0,this.hissSounds.length-1)].play('',0,.4);
            }
        }        
        this.allowHissSound = false;
    }
    
    reverseHiss(){
        if(this.allowHissSoundForReverse) {
            if(!this.ship.hyperDriveEngaged && !this.ship.fuelQuanity){
                this.hissSounds[this.game.rnd.integerInRange(0,this.hissSounds.length-1)].play('',0,.4);            
            }
        }
        this.allowHissSoundForReverse = false;
    }
        
    update() {
        super.update();
        
        if(this.rcsSoundCountdown>=0){
            if(this.rcsSoundCountdown==0){
                this.rcsSound.fadeOut(30);
            } else {
                this.rcsSoundCountdown--;
            }
        }


        // Normal "Play" control mode"
        if(this.controlMode == CONTROL_MODE.play && !this.ship.isDocked){
            // Accel
            if (this.cursors.up.isDown && !this.ship.hyperDriveEngaged) {
                this.ship.accelerate();
            } else if(this.cursors.down.isDown && !this.ship.hyperDriveEngaged) {
                this.reverseHiss();
                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying && !this.ship.hyperDriveEngaged && this.ship.fuelQuanity) this.rcsSound.loopFull(.33);
                this.ship.goInReverse();
            } else {
                this.allowHissSoundForReverse = true;
                this.ship.deaccelerate();
            }
        
            // Turning / Strafing
            if (this.cursors.left.isDown) {
                this.hiss();

                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying && !this.ship.hyperDriveEngaged && this.ship.fuelQuanity) this.rcsSound.loopFull(.33);

                if(this.cursors.left.shiftKey){
                    this.ship.moveLeft();
                } else {
                    this.ship.turnLeft();
                }
            } else if (this.cursors.right.isDown) {
                this.hiss();

                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying && !this.ship.hyperDriveEngaged && this.ship.fuelQuanity) this.rcsSound.loopFull(.33);

                if(this.cursors.right.shiftKey){
                    this.ship.moveRight();
                } else {
                    this.ship.turnRight();
                }
            } else {
                this.allowHissSound = true;
                this.ship.deaccelerateTurning();
            }
            
            // Firing
            if (this.fireButton.isDown) {
                this.ship.firePrimaryWeapon();
            }
        }
    }
}
