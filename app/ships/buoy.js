class Buoy extends Planet {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'Navigation Buoy',
            description : '',
        }
        
        this.sprite = this.game.add.sprite(x,y, 'buoy');
        this.sprite.scale.setTo(1.3, 1.3);

        this.name = this.specs.name;
        this.description = this.specs.description;
        this.showInfoDistance = 120;
        
        this.canLand = false;
        this.isPlanet = false;
        
        this.setupSprite();

        var blink = this.sprite.animations.add('blink');
        this.sprite.animations.play('blink', 1, true);
    }
}
