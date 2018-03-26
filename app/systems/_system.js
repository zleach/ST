// Handles all planets, objects, etc.
class StarSystem extends GameObject{
    constructor(game) {
        super(game);
        this.stellarObjects = [];
        this.neighbors = [];
        this.planets = [];
        
        this.settings = {
            minDistanceFromAnotherStar : 60,
            nebulaChance : 1,
            minRoids : 0,
            maxRoids : 2,
            minRoidOffset : {
                x : -5000,
                y : -5000,
            },
            maxRoidOffset : {
                x : 5000,
                y : 5000,
            },

            minPlanets : 0,
            maxPlanets : 6,
            minPlanetOffset : {
                x : -2000,
                y : -2000,
            },
            maxPlanetOffset : {
                x : 2000,
                y : 2000,
            }
        }
        
        // Details
        this.generatePosition();
        
        this.name = Names.star();
        if(this.isOuterRimSystem) this.name = Names.outerRimStar();

        this.type = this.determineItemFromArray(STELLAR_TYPES);
        this.size = rng.next(2,5);

        // Planets
        this.planetCount = this.game.rng.nextInt(this.settings.minPlanets, this.settings.maxPlanets);    
        var x = this.game.world.centerX;
        var y = this.game.world.centerX;
        for (var i = 0; i < this.planetCount; i++) {             
            this.planets.push(new BasicPlanet(this.game,{
                x : x,
                y : y,
                index : i,
                system : this,
            }));
            
            x += this.game.rng.next(this.settings.minPlanetOffset.x, this.settings.maxPlanetOffset.x);
            y += this.game.rng.next(this.settings.minPlanetOffset.y, this.settings.maxPlanetOffset.y);
        }
    }
    
    generatePosition(){
        var size = Math.min(this.game.galaxy.settings.mapWidth,this.game.galaxy.settings.mapHeight)/2;
        var densityFactor = (this.game.galaxy.starSystems.length+1)/this.game.galaxy.settings.starsAmount;
        var maximumDistance = ((size*densityFactor)*2)+200;

        var x = rng.nextInt(-maximumDistance/2, maximumDistance/2)+this.game.galaxy.settings.mapWidth/2;
        var y = rng.nextInt(-maximumDistance/2, maximumDistance/2)+this.game.galaxy.settings.mapHeight/2;

        this.position = {
            x : x.clamp(0,this.game.galaxy.settings.mapWidth),
            y : y.clamp(0,this.game.galaxy.settings.mapHeight)
        }        
        
        // Validate Postion
        for(let system of this.game.galaxy.starSystems){
            var distance = this.distanceToStarSystem(system);
            
            // Minium Distance (Prevent too close)
            if(distance<this.settings.minDistanceFromAnotherStar) this.generatePosition();
        };


        
    }
    
    arrive(){        
        this.cleanup();
        this.game.system = this;
        this.game.time.events.add(1000, function(){
            this.game.hud.showSystemInfo();
        }, this)

        // Asteroids
        var x = 0;
        var y = 0;
        this.asteroidFieldCount = this.game.rng.nextInt(this.settings.minRoids, this.settings.maxRoids);
        for (var i = 0; i < this.asteroidFieldCount; i++) {
            x = this.game.rng.nextInt(this.settings.minRoidOffset.x, this.settings.maxRoidOffset.x) + x;
            y = this.game.rng.nextInt(this.settings.minRoidOffset.y, this.settings.maxRoidOffset.y) + y;
            this.stellarObjects.push(new AsteroidField(this.game,{
                size : ASTEROID_FIELD_SIZE.large,
                x : x + this.game.world.centerX,
                y : y + this.game.world.centerY,
                system : this,
            }));            
        }

        // Nebula
        var x = 0;
        var y = 0;
        if(this.game.rng.next()<this.settings.nebulaChance){
            x = this.game.rng.nextInt(this.settings.minRoidOffset.x*2, this.settings.maxRoidOffset.x*2) + x;
            y = this.game.rng.nextInt(this.settings.minRoidOffset.y*2, this.settings.maxRoidOffset.y*2) + y;
            
            this.stellarObjects.push(new Nebula(this.game,{
                size : ASTEROID_FIELD_SIZE.large,
                x : x + this.game.world.centerX,
                y : y + this.game.world.centerY,
                system : this,
            }));
        }
        
        // Activate Everything
        for(let planet of this.planets){
            planet.wrapper.children.forEach(function(element) {
                element.exists = true;
            }, this);
        }
        
        for(let object of this.stellarObjects){
            if(object.sprite!=undefined) object.sprite.exists = true;
        }
    }

    cleanup(){
        this.game.asteroids.removeAll(true);
        for(let planet of this.game.planets.children){
            planet.children.forEach(function(element) {
                element.exists = false
            }, this);
        }

        for(let object of this.stellarObjects) object.destroy();
        this.stellarObjects.length = 0;
    }
    
    get closestStarSystem(){
    	var star, x1, x2, y1, y2;
    	var smallest = 1000000;
    	var closest = null; //use instead of 0 as we're looking for null or an object (not a number)
    	x1 = this.position.x;
    	y1 = this.position.y;
    	for (var i=0; i<this.game.galaxy.starSystems.length; i++) {
    		star = this.game.galaxy.starSystems[i];
    		if (star === this) continue;
    		x2 = star.position.x;
    		y2 = star.position.y;
    		var adjacent = Math.abs(x1-x2); //abs always returns positive number
    		var opposite = Math.abs(y1-y2); 
    		var hypotenuse = Math.sqrt((adjacent**2) + (opposite**2));
    		if (hypotenuse < smallest) {
    			closest = star;
    			smallest = hypotenuse;
    		}
    	}

    	return closest;
    }

    systemWithinRangeTowardsSystem(maxJumpDistance,destinationSystem){
        var angleToDestination = this.angleToStarSystem(destinationSystem); 
        
        // look for systems in range, that are close to that angle.
        var jumpCandidates = [];
        
        // Systems in range
        for (let system of this.game.galaxy.starSystems){
            if(this.distanceToStarSystem(system)<=maxJumpDistance && system!=this){
                jumpCandidates.push(system);
            }            
        }
        
        var bestMatch = null;
        // Of the in range candidates, return the one closest to the angle of the destination system.
        if(jumpCandidates.length>0){
                bestMatch = jumpCandidates.reduce(function(prev, curr) {
                var prevAngle = this.candidate.angleToStarSystem(prev);
                var currAngle = this.candidate.angleToStarSystem(curr);
                var destAngle = this.destAngle;            
                return (Math.abs(currAngle - destAngle) < Math.abs(prevAngle - destAngle) ? curr : prev);
            }.bind({
                destAngle : angleToDestination,
                candidate : this,
            }));
        }

        return bestMatch;
    }
    
    distanceToStarSystem(system){
        var a = this.position.x - system.position.x
        var b = this.position.y - system.position.y
        return Math.sqrt( a*a + b*b );
    }

    angleToStarSystem(system){
        return Math.atan2(
            this.position.y - system.position.y,
            this.position.x - system.position.x
        ) * 180 / Math.PI;
    }

    get distanceFromGalacticCenter(){
        var a = this.position.x - this.game.galaxy.settings.mapWidth/2
        var b = this.position.y - this.game.galaxy.settings.mapHeight/2
        return Math.sqrt( a*a + b*b );
    }

    get isOuterRimSystem(){
        var size = Math.min(this.game.galaxy.settings.mapWidth,this.game.galaxy.settings.mapHeight)/2;
        var rimPercent = 0.1;
        
        if(this.distanceFromGalacticCenter>size*Math.abs(rimPercent-1)){
            return true;
        } else {
            return false;
        }
    }
    
    get isCurrentSystem(){
        return this==this.game.system;
    }
}