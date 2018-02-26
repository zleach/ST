class Player extends GameObject {
    constructor(game) {
        super(game);

        this.ship = new BasicMiner(game,this.game.world.centerX,this.game.world.centerY);
        this.sprite = this.ship.sprite;

        this.name = 'Dash Riprock';
        
        this._credits = 5000;
        
        // Settings
        this.settings = {};
        this.settings.autoRefuel = true;

        // Keys
        this.controlMode = CONTROL_MODE.play;
        
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
        var fuelNeeded = this.ship.specs.maxFuel - this.ship.fuelQuantity;
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
        
    update() {
        super.update();
                
        // Normal "Play" control mode"
        if(this.controlMode == CONTROL_MODE.play){
            // Accel
            if (this.cursors.up.isDown) {
                this.ship.accelerate();
            } else {
                this.ship.deaccelerate();
            }

            // Reverse
            if (this.cursors.down.isDown) {
                this.ship.goInReverse();
            } else {
                this.ship.deaccelerate();
            }
        
            // Turning / Strafing
            if (this.cursors.left.isDown) {
                if(this.cursors.left.shiftKey){
                    this.ship.moveLeft();
                } else {
                    this.ship.turnLeft();
                }
            } else if (this.cursors.right.isDown) {
                if(this.cursors.right.shiftKey){
                    this.ship.moveRight();
                } else {
                    this.ship.turnRight();
                }
            } else {
                this.ship.deaccelerateTurning();
            }
            
            // Firing
            if (this.fireButton.isDown) {
                this.ship.firePrimaryWeapon();
            }
        }
    }
}
