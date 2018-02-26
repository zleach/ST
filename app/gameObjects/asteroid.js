class Asteroid extends GameObject {
    constructor(game,group,size,x,y) {
        super(game);
     
        this.group = group
           
        if(x==undefined) x = this.game.world.centerX+game.rnd.integerInRange(-1000, 1000);
        if(y==undefined) y = this.game.world.centerY+game.rnd.integerInRange(-1000, 1000);
        if(size==undefined) size = 'large';
        this.size = size;

        if(size=='tiny'){
            var rnd = game.rnd.integerInRange(1, 3);
            this.sprite = this.game.asteroids.create(x,y,'asteroid-flake-'+rnd);
        } else {
            this.sprite = this.game.asteroids.create(x,y,'asteroid-'+size);
        }

        this.sprite.parentObject = this;
        this.game.physics.p2.enable(this.sprite,P2BODY_DEBUG);

        this.sprite.body.clearShapes();
        this.sprite.body.damping = 0;

        if(size=='large'){
            this.health = game.rnd.integerInRange(150, 200);
            this.sprite.body.mass = 100;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(32);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-50, 50),game.rnd.integerInRange(-50, 50)],0,0)

            this.minimapSize = 1.2;
        } else if(size=='medium'){
            this.health = game.rnd.integerInRange(70, 100);

            this.sprite.body.mass = 50;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(20);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-10, 10),game.rnd.integerInRange(-10, 10)],0,0)

            this.minimapSize = .8;
        } else if(size=='small'){
            // Small
            this.health = game.rnd.integerInRange(20, 30);

            this.sprite.body.mass = 10;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(14);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-10, 10),game.rnd.integerInRange(-10, 10)],0,0)

            this.minimapSize = .5;
        } else if(size=='tiny'){
            // Tiny
            this.health = game.rnd.integerInRange(3, 10);

            this.sprite.body.mass = .1;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(5);
        this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-.05, .05),game.rnd.integerInRange(-.05, .05)],0,0)

            this.minimapSize = 0;
        }

        this.sprite.body.rotation = game.rnd.integerInRange(0, 360)
        this.sprite.anchor.set(0.5);
    }

    hit(bullet){
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);        
    }
        
    kill(){
        if(this.size=='large'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.explode();
            this.destroy();
            var a1 = new Asteroid(this.game,this.group,'medium',x-20,y-game.rnd.integerInRange(0,10));            
            var a2 = new Asteroid(this.game,this.group,'medium',x+20,y+game.rnd.integerInRange(0,10));
        } else if(this.size=='medium'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.destroy();
            var a1 = new Asteroid(this.game,this.group,'small',x-15,y-game.rnd.integerInRange(0,10));            
            var a2 = new Asteroid(this.game,this.group,'small',x+15,y+game.rnd.integerInRange(0,10));
        } else if(this.size=='small'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.destroy();
            var flakeCount = game.rnd.integerInRange(3,6);

            for (var i = 0; i < flakeCount; i++) { 
                new FlakePickup(this.game,this.group,this.sprite.x,this.sprite.y)
            }
        } else if(this.size=='tiny'){
            this.destroy();
        }
    } 
       
    explode(){
	    var emitter = this.game.add.emitter(this.sprite.x,this.sprite.y, 100);
	    this.game.asteroids.add(emitter);
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
    }
}
