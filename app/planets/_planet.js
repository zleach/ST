class Planet extends GameObject{
    constructor(game,x,y) {
        super(game);

        this.minimapSize = 2.3;
        this.distanceToPlayer;
        
        this.showInfoDistance = 90;
        this.infoShowing = false;
    }

    setupSprite(){
        this.sprite.anchor.setTo(.5, .5);
        this.sprite.smoothed = false;
                
        this.nameText = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y-20, 
            'pixelmix_8',
            this.name,
            8
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y, 
            'pixelmix_8',
            this.planetClass+' '+this.stellarObjectType,
            5
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y+40, 
            'pixelmix_8',
            'Press L to Land',
            5
        );
        this.landingMessage.alpha = 0;

        //messageText.alpha = 0;
        //this.game.planets.add(this);
        this.game.register(this);
    }
    
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
            this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
        
            this.infoShowing = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
        }
    }
    
    hideInfo(){
        this.game.add.tween(this.nameText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.subText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.landingMessage).to( { alpha: 0 }, 300, "Quart.easeOut", true);

        this.game.add.tween(this.subText).to( { y: '+30' }, 0, "Quart.easeOut", true);                
        this.game.add.tween(this.nameText).to( { y: '+30' }, 0, "Quart.easeOut", true);    
        this.game.add.tween(this.landingMessage).to( { y: '+30' }, 0, "Quart.easeOut", true);                

        this.infoShowing = false;
    }
    
    update() {
        super.update();
        //this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
        //this.showInfoIfNeeded();
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }
}