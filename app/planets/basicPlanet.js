class BasicPlanet extends Planet {
    constructor(game,options) {
        super(game,options.x,options.y); 
        
        this.seed = 0;
        this.system = options.system;
        this.index = options.index;
        this.order = (this.index+1).toRoman()   

        this.name = `${this.system.name} ${this.order}`;
        this.description = "Class D Planet"
        this.welcomeTitle = "Terrestrial Planet";
        this.welcomeText = "Mosisia is a medium-sized terrestrial planet in the Pavo system, with a single moon. Most of the planet is made up of salty oceans, while a portion is grassland. Life on this planet is rare due to climate and atmosphere. The atmosphere is nitrogen based and breathable, with oxygen and trace amounts of carbon monoxide.";

        // Determine what services are available
        this.science = this.determineIntegerBetween(0,10);
        this.culture = this.determineIntegerBetween(0,10);
        this.industry = this.determineIntegerBetween(0,10);
        this.trade = this.determineIntegerBetween(0,10);
        
        // Population is for passenger terminals
        this.population = this.determineIntegerBetween(0,100000000);

        // Sprite
        this.spriteImage = this.determineItemFromArray(this.game.planetImages);        
        this.sprite = this.game.make.sprite(options.x,options.y, this.spriteImage);
        this.sprite.angle = this.determineFloatBetween(-180,180); 
        this.sprite.exists = false;
        this.setupSprite();
    }

    update() {
        super.update();
    }
}
