
class Planet extends GameObject{
    constructor(game,x,y) {
        super(game);

        this.minimapSize = 2.3;
        this.distanceToPlayer;
        
        this.showInfoDistance = 90;
        this.infoShowing = false;

        this.isPlanet = true;
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
        this.infoSound = game.add.audio('beep-beep');
    }
    
    setupSprite(options){
        super.setupSprite(this.sprite);
        this.wrapper = this.game.make.group();
        this.wrapper.add(this.sprite);

        this.sprite.anchor.setTo(.5, .5);
        this.sprite.smoothed = false;
        this.sprite.parentObject = this;

        this.game.planets.add(this.wrapper);

        this.nameText = this.game.add.text( 
            20+this.sprite.x + this.sprite.width/2,this.sprite.top+10, 
            this.name, 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left' },
            this.game.planets,
        );
        this.wrapper.add(this.nameText);
        this.nameText.alpha = 0;

        this.subText = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.top + 30, 
            this.description, 
            { font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
            this.game.planets,
        );
        this.wrapper.add(this.subText);
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.top + 60, 
            'Press L to Land', 
            { font: `10px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
            this.game.planets,
            this.wrapper
        );
        this.wrapper.add(this.landingMessage);
        this.landingMessage.alpha = 0;
    }
    
    // Info Display
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing && this.game.initialized){ 
            if(!this.game.player.ship.hyperDriveEngaged) this.infoSound.play();
                   
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);

            if(this.canLand){
                this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true);
            }
        
            this.infoShowing = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
        }
    }

    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }
    
    hideInfo(){
        this.game.add.tween(this.nameText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.subText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.landingMessage).to( { alpha: 0 }, 300, "Quart.easeOut", true);

        this.infoShowing = false;
    }
        
    // Services        
    hasService(service){
        return this.services.includes(service);
    }
    
    get services(){
        var services = [];
        for (let service of PLANET_SERVICES_REQUIREMENTS)
            if(this.stats[service.requirement]>=service.level)
                services.push(service.service)
        return services;
    }

    set services(services){
        this._services = services;
    }


    // Planets have lots of free space. Like, a lot.
    calculateFreeSpaceForStorageClass(storageClass){
        return Infinity;
    }

    update() {
        super.update();
        if(this.sprite.exists){
            this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
            this.showInfoIfNeeded();
            
            // Paralax
            if(this.isPlanet){
                if(this.game.camera.deltaX || this.game.camera.deltaY){
                    this.wrapper.addAll('x', this.game.camera.deltaX - this.game.camera.deltaX/2, true, true);
                    this.wrapper.addAll('y', this.game.camera.deltaY - this.game.camera.deltaY/2, true, true);                    
                }
            }
        }
    }

}