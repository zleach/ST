class AsteroidField extends GameObject {
    constructor(game,size,x,y) {
        super(game);

        if(x==undefined) x = this.game.world.centerX+game.rnd.integerInRange(-1500, 1500);
        if(y==undefined) y = this.game.world.centerY+game.rnd.integerInRange(-1500, 1500);
        if(size==undefined) size = 800;
        var densityLowerBound = 200;
        var densityUpperBound = 200;
        
        this.asteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.asteroids = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.asteroidsCount; i++) { 
            var xPos = this.game.world.centerX+game.rnd.integerInRange(x-size, x+size);
            var yPos = this.game.world.centerY+game.rnd.integerInRange(y-size, y+size);
            var asteroid = new Asteroid(this.game,this.asteroids,'large',xPos,yPos);
        }
    }
    
    update(){
        super.update();
        
        this.game.physics.arcade.collide(this.asteroids, this.asteroids);
    }
    
}
