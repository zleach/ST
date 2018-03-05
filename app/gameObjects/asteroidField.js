class AsteroidField extends GameObject {
    constructor(game,size,x,y) {
        super(game);

        if(size==undefined) size = 2000;
        var densityLowerBound = 90;
        var densityUpperBound = 90;
        
        this.asteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.asteroids = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.asteroidsCount; i++) { 
            var xPos = game.rnd.integerInRange(x-size, x+size);
            var yPos = game.rnd.integerInRange(y-size, y+size);
            
            var bigness = game.rnd.integerInRange(0,100);

            if(bigness>=70){
                var asteroid = new Asteroid(this.game,this.asteroids,'large',xPos,yPos);
            } else if(bigness<70 && bigness>50){
                var asteroid = new Asteroid(this.game,this.asteroids,'medium',xPos,yPos);                
            } else {
                var asteroid = new Asteroid(this.game,this.asteroids,'small',xPos,yPos);                
            }
        }

        new Buoy(this.game,xPos,yPos);
    }
    
    update(){
        super.update();
        this.game.physics.arcade.collide(this.asteroids, this.asteroids);
    }
    
}
