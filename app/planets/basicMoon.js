class BasicMoon extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'moon-1');
        this.sprite.scale.setTo(1.3, 1.3);

        this.name = "Odros Moon"
        this.planetClass = "Mining Complex"
        this.stellarObjectType = ""
        this.showInfoDistance = 120;

        this.setupSprite();
    }

    update() {
        super.update();
    }
}
