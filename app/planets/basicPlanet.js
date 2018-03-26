class BasicPlanet extends Planet {
    constructor(game,options) {
        super(game,options.x,options.y); 
                
        this.system = options.system;
        this.index = options.index;
        this.order = (this.index+1).toRoman()   

        // Basics
        this.stats = {
            culture  : this.determineIntegerBetween(0,10),
            industry : this.determineIntegerBetween(0,10),
            science  : this.determineIntegerBetween(0,10),
            trade    :  this.determineIntegerBetween(0,10),
        }
        var bestStat = Object.keys(this.stats)
                           .sort(function(a, b) {
                               return this.stats[b] - this.stats[a];
                           }.bind(this))[0];  
                                            
        var worstStat = Object.keys(this.stats)
                           .sort(function(a, b) {
                               return this.stats[b] + this.stats[a];
                           }.bind(this))[0];                   

        // Specialization - determines low demand things (less expensive)
        this.specialization = this.determineItemFromArray(PLANET_SPECIALIZATIONS[bestStat]);
       
        // Weakness - determines high demand things (more expensive)
        this.weakness = this.determineItemFromArray(PLANET_SPECIALIZATIONS[worstStat]);

        // Population is for passenger terminals
        this.population = this.determineIntegerBetween(0,100000000);

        this.name = `${this.system.name} ${this.order}`;
        this.description = "Class D Planet"
        this.welcomeTitle = "Terrestrial Planet";
        this.welcomeText = `${this.name} is a medium-sized terrestrial planet in the ${this.system.name} system. \nSpeciality ${this.specialization} \nScience ${this.stats.science} \nCulture ${this.stats.culture} \nIndustry ${this.stats.industry} \nTrade ${this.stats.trade}`;

        // Sprite
        this.spriteImage = this.determineItemFromArray(this.game.planetImages);        
        this.sprite = this.game.make.sprite(options.x,options.y, this.spriteImage);
        this.sprite.exists = false;
        this.setupSprite(options);
        
        // Economics
        this.game.economy.registerMarket(this);
    }

    update() {
        super.update();
    }
}
