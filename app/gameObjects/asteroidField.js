class AsteroidField extends GameObject {
    constructor(game,options) {
        super(game);
        
        this.system = options.system;
        var size = options.size;
        if(size==undefined) size = 2000;
        var densityLowerBound = 50;
        var densityUpperBound = 60;
        
        this.asteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.asteroids = this.game.asteroids;
        for (var i = 0; i < this.asteroidsCount; i++) { 
            var xPos = game.rnd.integerInRange(options.x-size, options.x+size);
            var yPos = game.rnd.integerInRange(options.y-size, options.y+size);
            
            var bigness = game.rnd.integerInRange(0,100);

            if(bigness>=70){
                var asteroid = new Asteroid(this.game,this.asteroids,'large',xPos,yPos);
            } else if(bigness<70 && bigness>50){
                var asteroid = new Asteroid(this.game,this.asteroids,'medium',xPos,yPos);                
            } else {
                var asteroid = new Asteroid(this.game,this.asteroids,'small',xPos,yPos);                
            }

            // Add to system
            this.system.stellarObjects.push(asteroid);
        }

        this.buoy = new Buoy(this.game,options.x,options.y);
        this.buoy.description = `${Names.proper()} Asteroid Field`

        this.system.stellarObjects.push(this.buoy);
    }

    update(){
        super.update();
        if(this.system == this.game.system){    
            this.game.physics.arcade.collide(this.asteroids, this.asteroids);
        }
    }    
}
