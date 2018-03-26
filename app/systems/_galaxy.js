class Galaxy extends GameObject{
    constructor(game) {
        super(game);

        this.name = Names.star();

        this.settings = {
            starsAmount : 50,
            mapWidth : 3000,
            mapHeight : 3000,
        }    
    }
    
    build(){
        this.starSystems = [];
        for (var i = 0; i < this.settings.starsAmount; i++) { 
            var system = new StarSystem(this.game);
            this.starSystems.push(system);
        }
    }
    
    get closestSystemToCenter() {
        return _.sortBy(this.starSystems,'distanceFromGalacticCenter').firstItem();
    }
}