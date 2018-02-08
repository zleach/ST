class FlakePickup extends Pickup {
    constructor(game,group,x,y) {
        super(game);
     
        this.group = group

        // Basic Physics
        this.sprite = this.group.create(x,y,'asteroid-flake-'+game.rnd.integerInRange(1,3))
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.setTo(1, 1);
        this.sprite.body.collideWorldBounds = true;

        // Flake
        this.lifespan = game.rnd.realInRange(30,60);
        this.game.time.events.add(Phaser.Timer.SECOND * this.lifespan, this.kill, this);
        this.sprite.body.velocity.setTo(game.rnd.integerInRange(-20, 20),game.rnd.integerInRange(-20, 20));
        this.sprite.body.mass = 3;
        this.sprite.body.setSize(30, 30, 6, 6);
        this.sprite.body.checkCollision.up = false;
        this.sprite.body.checkCollision.down = false;
        this.sprite.body.checkCollision.left = false;
        this.sprite.body.checkCollision.right = false;
        this.roationSpeed = game.rnd.integerInRange(-50,50);
        this.sprite.anchor.set(0.5);

        var scale = game.rnd.realInRange(.5,1.25)
        this.sprite.scale.setTo(scale, scale);
        
        // Item
        var chance = game.rnd.realInRange(0,1);
        if(chance<RARITY_MINING_CHANCE.rare){
            this.contents = new Item_Paladium(this.game);            
        } else if(chance<RARITY_MINING_CHANCE.uncommon){
            this.contents = new Item_MeteoricIron(this.game);
        } else {
            this.contents = new Item_Flake(this.game);
        }            
    }

    processCollision(pickup,player){
        super.processCollision(pickup,player);
    }
        
    update() {
        super.update();
        // Spin
        this.sprite.body.angularVelocity = this.roationSpeed;

        var distance = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
        if(distance<this.magneticDistance){
            this.game.physics.arcade.accelerateToObject(this.sprite, this.game.player.sprite, 500, 500, 500)
        }
    }
    
}
