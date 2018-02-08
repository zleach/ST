class Asteroid extends GameObject {
    constructor(game,group,size,x,y) {
        super(game);
     
        this.group = group
           
        if(x==undefined) x = this.game.world.centerX+game.rnd.integerInRange(-1000, 1000);
        if(y==undefined) y = this.game.world.centerY+game.rnd.integerInRange(-1000, 1000);
        if(size==undefined) size = 'large';
        this.size = size;
        
        this.sprite = this.group.create(x,y,'asteroid-'+size)

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.setTo(1, 1);
        this.sprite.body.collideWorldBounds = true;

        if(size=='large'){
            this.health = game.rnd.integerInRange(150, 200);
        this.sprite.body.velocity.setTo(game.rnd.integerInRange(-5, 5),game.rnd.integerInRange(-5, 5));
            this.sprite.body.mass = 30;
            this.sprite.body.setSize(70, 70, 10, 15);
            this.roationSpeed = game.rnd.integerInRange(-10, 10);
        
            this.sprite.scale.setTo(game.rnd.realInRange(.5,1));
            this.minimapSize = 1.2;
        } else if(size=='medium'){
            this.health = game.rnd.integerInRange(70, 100);
            this.sprite.body.velocity.setTo(game.rnd.integerInRange(-10, 10),game.rnd.integerInRange(-10, 10));
            this.sprite.body.mass = 15;
            this.sprite.body.setSize(50, 50, 5, 5);
            this.roationSpeed = game.rnd.integerInRange(-15, 15);
            this.sprite.scale.setTo(game.rnd.realInRange(.5,1));
            this.minimapSize = .8;
        } else if(size=='small'){
            // Small
            this.health = game.rnd.integerInRange(20, 30);
            this.sprite.body.velocity.setTo(game.rnd.integerInRange(-15, 15),game.rnd.integerInRange(-15, 15));
            this.sprite.body.mass = 3;
            this.sprite.body.setSize(30, 30, 6, 6);
            this.roationSpeed = game.rnd.integerInRange(-25,25);
            this.sprite.scale.setTo(game.rnd.realInRange(.5,1));
            this.minimapSize = .5;
        }
        this.sprite.anchor.set(0.5);


    }

    processBulletCollision(asteroid, bullet){
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);
        
        this.inflictDamage(bullet.damage);
        
        bullet.kill();
        return false; // Never collides, just dies.
    }
        
    kill(){
        if(this.size=='large'){
            var gap = 45;
            var offsetX = game.rnd.integerInRange(-gap, gap)
            var offsetY= game.rnd.integerInRange(-gap, gap)
            var a1 = new Asteroid(this.game,this.group,'medium',this.sprite.x+offsetX,this.sprite.y+offsetY);            
            var a2 = new Asteroid(this.game,this.group,'medium',this.sprite.x-offsetX,this.sprite.y-offsetY);
            this.explode();         
            this.explode();         
            this.destroy();
        } else if(this.size=='medium'){
            var gap = 35;
            var offsetX = game.rnd.integerInRange(-gap, gap)
            var offsetY= game.rnd.integerInRange(-gap, gap)
            var a1 = new Asteroid(this.game,this.group,'small',this.sprite.x+offsetX,this.sprite.y+offsetY);            
            var a2 = new Asteroid(this.game,this.group,'small',this.sprite.x-offsetX,this.sprite.y-offsetY);
            this.explode();         
            this.destroy();            
        } else if(this.size=='small'){
            var gap = 25;
            var offsetX = game.rnd.integerInRange(-gap, gap)
            var offsetY= game.rnd.integerInRange(-gap, gap)
            
            // Create flakes when destroyed
            var flakeCount = game.rnd.integerInRange(3,6);
            for (var i = 0; i < flakeCount; i++) { 
                new FlakePickup(this.game,this.group,this.sprite.x+offsetX,this.sprite.y+offsetY)
            }
            this.explode();         
            this.destroy();            
        }     
    } 
       
    explode(){
	    var emitter = this.game.add.emitter(this.sprite.x,this.sprite.y, 100);
        emitter.makeParticles('asteroid-flake-1');
        emitter.gravity = 0;
        emitter.maxRotation = 100;
        emitter.minRotation = 30;
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.explode(3500, game.rnd.integerInRange(5, 10));
        this.game.time.events.add(5000, this.destroyEmitter, emitter);        
    }
    
    // Rendering
    update() {
        super.update();
        
        // Spin
        this.sprite.body.angularVelocity = this.roationSpeed;
        
        // Collide with player
        this.game.physics.arcade.collide(this.sprite, this.game.player.sprite);
        
        // Collide with player's weapons
        for (let weapon of this.game.player.ship.weapons) {
            this.game.physics.arcade.collide(
                this.sprite, 
                weapon.weapon.bullets, 
                this.didCollide, 
                this.processBulletCollision, 
                this
            );
        }

    }
}
