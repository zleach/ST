class Galaxy extends GameObject{
    constructor(game) {
        super(game);

        this.settings = {
            starsAmount : 10,
        }

        this.starSystems = [];
        for (var i = 0; i < this.settings.starsAmount; i++) { 
            var system = new StarSystem(this.game);
            this.starSystems.push(system);
        }        
    }

}