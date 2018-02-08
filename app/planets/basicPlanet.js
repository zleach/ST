class BasicPlanet extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'planet-1');
        this.sprite.scale.setTo(2, 2);

        this.name = "Blerreon IV"
        this.planetClass = "Class D"
        this.stellarObjectType = "Planet"

        this.setupSprite();
    }

    update() {
        super.update();
    }
}
