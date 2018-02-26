class Planet extends GameObject{
    constructor(game,x,y) {
        super(game);

        this.minimapSize = 2.3;
        this.distanceToPlayer;
        
        this.showInfoDistance = 90;
        this.infoShowing = false;

        this.canNavigateTo = true;
        this.canLand = true;
        
        this.services = [];
        this.specs = {
            storage : {
                bulk : Infinity,
                passengers : Infinity,
                liquid : Infinity,
                gas : Infinity,
            }
        }

        this.itemMarkup = 1.1 // Multuplier
    }

    setupSprite(){
        super.setupSprite(this.sprite);

        this.sprite.anchor.setTo(.5, .5);
        this.sprite.smoothed = false;

        this.nameText = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y-20, 
            this.name, 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y, 
            this.description, 
            { font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y + 40, 
            'Press L to Land', 
            { font: `10px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.landingMessage.alpha = 0;
    }
    
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            if(this.canLand){
                this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
                this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
            }
        
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
        this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
        this.showInfoIfNeeded();
    }
    
    hasService(service){
        return this.services.includes(service);
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }

    // Planets have lots of free space.
    calculateFreeSpaceForStorageClass(storageClass){
        return Infinity;
    }

}