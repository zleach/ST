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

        // Inventory
        var iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
        iKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.game.inventoryScreen.show();
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
            this.hissSounds[this.game.rnd.integerInRange(0,this.hissSounds.length-1)].play('',0,.4);
        }        
        this.allowHissSound = false;
    }
    
    reverseHiss(){
        if(this.allowHissSoundForReverse) {
            this.hissSounds[this.game.rnd.integerInRange(0,this.hissSounds.length-1)].play('',0,.4);            
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
            if (this.cursors.up.isDown) {
                this.ship.accelerate();
            } else if(this.cursors.down.isDown) {
                this.reverseHiss();
                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying) this.rcsSound.loopFull(.33);
                this.ship.goInReverse();
            } else {
                this.allowHissSoundForReverse = true;
                this.ship.deaccelerate();
            }
        
            // Turning / Strafing
            if (this.cursors.left.isDown) {
                this.hiss();

                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying) this.rcsSound.loopFull(.33);

                if(this.cursors.left.shiftKey){
                    this.ship.moveLeft();
                } else {
                    this.ship.turnLeft();
                }
            } else if (this.cursors.right.isDown) {
                this.hiss();

                this.rcsSoundCountdown = 1;
                if(!this.rcsSound.isPlaying) this.rcsSound.loopFull(.33);

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
