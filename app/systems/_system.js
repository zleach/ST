// Handles all planets, objects, etc.
class StarSystem extends GameObject{
    constructor(game) {
        super(game);
        this.stellarObjects = [];

        this.settings = {
            nebulaChance : .1,
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
        this.name = Names.star();
        this.galacticX = 0;
        this.galacticY = 0;
        
        // Planets
        this.planetCount = this.game.rng.nextInt(this.settings.minPlanets, this.settings.maxPlanets);    
        var x = this.game.world.centerX;
        var y = this.game.world.centerX;
        for (var i = 0; i < this.planetCount; i++) {             
            this.stellarObjects.push(new BasicPlanet(this.game,{
                x : x,
                y : y,
                index : i,
                system : this,
            }));

            x += this.game.rng.nextInt(this.settings.minPlanetOffset.x, this.settings.maxPlanetOffset.x);
            y += this.game.rng.nextInt(this.settings.minPlanetOffset.y, this.settings.maxPlanetOffset.y);
        }
    }
    
    arrive(){
        this.game.system = this;
        this.stellarObjects.push(this.game.player);

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
        for(let object of this.stellarObjects){
            if(object.sprite!=undefined) object.sprite.exists = true;
        }
    }
}