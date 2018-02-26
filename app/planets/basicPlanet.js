class BasicPlanet extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'planet-1');
        this.sprite.width = this.sprite.width*2
        this.sprite.height = this.sprite.height*2 

        this.name = "Mosisia Si"
        this.description = "Class D Planet"
        this.welcomeTitle = "Terrestrial Planet";
        this.welcomeText = "Mosisia is a medium-sized terrestrial planet in the Pavo system, with a single moon. Most of the planet is made up of salty oceans, while a portion is grassland. Life on this planet is rare due to climate and atmosphere. The atmosphere is nitrogen based and breathable, with oxygen and trace amounts of carbon monoxide.";

        this.services = [
            PLANET_SERVICES.market,
            PLANET_SERVICES.passengerTerminal,
            PLANET_SERVICES.refinery,
            PLANET_SERVICES.fuelDepot
        ]

        this.setupSprite();
    }

    update() {
        super.update();
    }
}
