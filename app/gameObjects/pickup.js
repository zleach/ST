class Pickup extends GameObject {
    constructor(game,group,x,y) {
        super(game);
     
        this.group = group        
        this.magneticDistance = 150;
    
        this.contents = new InventoryObject(this.game);
    }

    pickedUpBy(object){
        this.destroy();
        return object.collectNumberOfItems(1,this.contents);
    }

    processCollision(pickup,object){
        this.pickedUpBy(this.game.player.ship)
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

        if(this.alive){
            var hits = this.game.physics.p2.hitTest(this.sprite.position);
            for (let hit of hits) {
                var target = hit.parent.sprite.parentObject;                
                if(target.canPickThingsUp) this.pickedUpBy(target);                
            }
        }
    }
    
    
}
