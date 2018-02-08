class Pickup extends GameObject {
    constructor(game,group,x,y) {
        super(game);
     
        this.group = group        
        this.magneticDistance = 100;
    
        this.contents = new InventoryObject(this.game);
    }

    pickedUpBy(object){
        return object.collectNumberOfItems(1,this.contents);
    }

    processCollision(pickup,object){
        this.pickedUpBy(this.game.player.ship)
        this.destroy();
    }
            
    kill(){
        var fadeOut = this.game.add.tween(this.sprite).to( { alpha: 0 }, 2000, "Quart.easeIn", true);
        fadeOut.onComplete.add(function(){
            this.destroy();            
        }, this);
    }
           
    // Rendering
    update() {
        super.update();
        this.game.physics.arcade.collide(
            this.sprite, 
            this.game.player.sprite, 
            this.didCollide, 
            this.processCollision, 
            this
        );
    }
    
    
}
