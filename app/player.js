class Player extends GameObject {
    constructor(game) {
        super(game);

        this.ship = new BasicMiner(game,this.game.world.centerX,this.game.world.centerY);
        this.sprite = this.ship.sprite;

        this.name = 'Dash Riprock';
        this._credits = 5000;

        // Keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);  

        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        dKey.onDown.add(this.ship.attemptToDock, this.ship);
    }
    
    get credits(){
        if(this._credits<999999){
            return CREDIT_PREFIX.short + numeral(this._credits).format('0,0');
        } else {
            return CREDIT_PREFIX.short + numeral(this._credits).format('(0.00 a)');
        }
    }
    
    update() {
        super.update();

        if (this.cursors.down.isDown) {
            this.ship.goInReverse();
        } else {
            this.ship.deaccelerate();
        }

        if (this.cursors.up.isDown) {
            this.ship.accelerate();
        } else {
            this.ship.deaccelerate();
        }
    
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
        
        if (this.fireButton.isDown) {
            this.ship.firePrimaryWeapon();
        }
    }
}
