class Galaxy extends GameObject{
    constructor(game) {
        super(game);

        this.name = Names.star();

        this.settings = {
            starsAmount : 45,
            mapWidth : 1000,
            mapHeight : 1000,
        }    
    }
    
    build(){
        this.starSystems = [];
        for (var i = 0; i < this.settings.starsAmount; i++) { 
            var system = new StarSystem(this.game);
            this.starSystems.push(system);
        }
    }
}