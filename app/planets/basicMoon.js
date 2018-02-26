class BasicMoon extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'moon-1');
        this.sprite.scale.setTo(1.3, 1.3);

        this.name = "Persicus"
        this.description = "Moon of Mosisia"
        this.welcomeText = "Persicus is an intermediately sized terrestrial moon in the Pavo system. A lot of the moon is comprised of frigid desert, while a smaller portion is frozen oceans. Plant and animal life on this planet is non existant. The moon has no atmosphere, and is breathable without advanced life support systems.";

        this.services = [
            PLANET_SERVICES.passengerTerminal,            
        ]

        this.setupSprite();
    }

    update() {
        super.update();
    }
}
