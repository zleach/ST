class GalacticMap extends GameObject{
    constructor(game,options) {
        super(game);
        
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || screenWidth;
        this.height = options.height || screenHeight;
        this.isActive = false;
        
        // Navigation
        this.starSystems = this.game.galaxy.starSystems;
        this.currentPath = [];
        this.navigationTarget = null;
        this.navigationTargetCache = null;
        this.navigationDestination = null;
        this.navArrow = game.make.sprite(0, 0, 'nav-arrow');
        this.navArrow.angle = 90;
        this.navArrow.anchor.set(1,.5);
        
        // Zooming
        this.mapZoom = 1;
        this.mapZoomCache = 0;
        this.mapZoomIncrement = .0025;
        this.mapZoomStep = 0;
        this.mapZoomMax = 2;
        this.mapZoomMin = .5;
        this.didZoom = false;
        
        // Scrolling
        this.mapScrollIncrement = .5;
        this.mapScrollDecay = 1.0;
        this.mapScrollMax = 1;
        this.mapScrollXStep = 0;
        this.mapScrollYStep = 0;
        this.mapScrollX = 0;
        this.mapScrollY = 0;
        this.mapScrollOffsetX = 0;
        this.mapScrollOffsetY = 0;

        // Sprite / Bitmap data
        this.bmd = game.add.bitmapData(this.width, this.height);    
        this.sprite = game.add.sprite(this.x, this.y, this.bmd);
        if(options.group) options.group.add(this.sprite);

        // Sounds
        this.navTargetChangedSound = game.add.audio('blorp');
        this.navDestinationAddedSound = game.add.audio('beep-beep');
        this.navDestinationClearedSound = game.add.audio('cancel');
        this.navTargetInvalidSound = game.add.audio('invalid');
    }
    
    setupKeys(){
        // Keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.plusKey = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
        this.minusKey = game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onUp.add(this.setDestination,this);
    }
    
    centerOnSystem(system){
        this.mapScrollX = ((this.width/this.mapZoom)/2)-system.position.x;
        this.mapScrollY = ((this.height/this.mapZoom)/2)-system.position.y;    
    }
    
    findPathFromSystemToSystem(originSystem,destinationSystem){
        var path = [originSystem];
        var maxJumpDistance = 150;
        var angleToDestination = originSystem.angleToStarSystem(destinationSystem);
        var distanceToDestination = originSystem.distanceToStarSystem(destinationSystem);

        var validatePath = function(){
            if(path[path.length-1]!=destinationSystem) {
                getNextJump();
            }
        }

        var getNextJump = function(){
            if(path[path.length-1]){
                var nextJump = path[path.length-1].systemWithinRangeTowardsSystem(maxJumpDistance,destinationSystem);
                if(path.includes(nextJump)) return null;
                path.push(nextJump);
                validatePath();                
            } else {
                return null;
            }
        }

        if(distanceToDestination<=maxJumpDistance){
            // Destination is within one jump away. 
            path.push(destinationSystem);
        } else {
            getNextJump();
        }
         
        path.clean(null); // remove all nulls;
                
        return path;        
    }
    
    distanceOfPath(path){
        var distance = 0;
        var previousSystem = null;

        for(let system of path){
            if(previousSystem && system!=null){
                distance+= system.distanceToStarSystem(previousSystem);
            }
            previousSystem = system;
        }        
        
        return distance;
    }
    
    setDestination(){
        // Makes current target the destination.
        if(this.navigationDestination){
            this.navigationDestination = null;
            this.navDestinationClearedSound.play();
        } else {            
            this.navigationDestination = this.navigationTarget;
            this.navDestinationAddedSound.play();
        }
    }
    
    drawMap(){      
        this.bmd.ctx.clearRect(0,0,this.width,this.height);
        var zoom = this.mapZoom;        
        // Lines
        for(let system of this.starSystems){
            // Save distnce for later
            system.distanceFromMapCenter = Math.sqrt(
                Math.pow(
                    ((system.position.x+this.mapScrollX)*zoom)-this.width/2,
                2) + 
                Math.pow(
                    ((system.position.y+this.mapScrollY)*zoom)-this.height/2,
                2)
            );

            if(system.neighbors.length>0){
                for(let neighbor of system.neighbors){
                    if(neighbor!=null){
                    	this.bmd.ctx.strokeStyle = "#ffffff";
                    	this.bmd.ctx.lineWidth = 1;
                    	this.bmd.ctx.beginPath();
                    	this.bmd.ctx.moveTo((system.position.x+this.mapScrollX)*zoom, (system.position.y+this.mapScrollY)*zoom);
                    	this.bmd.ctx.lineTo((neighbor.position.x+this.mapScrollX)*zoom,(neighbor.position.y+this.mapScrollY)*zoom);
                    	this.bmd.ctx.stroke();
                    }
            	}
            }
        }

        this.drawGridLines({
            major : 100,
            minor : 25,
            color : '#333333',
        })

        for (var i = 0; i < this.currentPath.length; i++) {
            if(i<this.currentPath.length-1){
            	this.bmd.ctx.strokeStyle = "#1aae5c";
            	this.bmd.ctx.lineWidth = 4;
            	this.bmd.ctx.beginPath();
            	this.bmd.ctx.moveTo((this.currentPath[i].position.x+this.mapScrollX)*zoom, (this.currentPath[i].position.y+this.mapScrollY)*zoom);
            	this.bmd.ctx.lineTo((this.currentPath[i+1].position.x+this.mapScrollX)*zoom,(this.currentPath[i+1].position.y+this.mapScrollY)*zoom);
            	this.bmd.ctx.stroke();
            }
        }

        // Stars
        for(let system of this.starSystems){                  
            // Black Space
            this.bmd.ctx.fillStyle='#111111'
            this.bmd.ctx.beginPath();
            this.bmd.ctx.arc((system.position.x+this.mapScrollX)*zoom,(system.position.y+this.mapScrollY)*zoom,system.size+5,0,2*Math.PI);
            this.bmd.ctx.fill();

            // Current System Highlight
            if(system.isCurrentSystem || system==this.navigationDestination){
                this.bmd.ctx.strokeStyle='#1aae5c';
                this.bmd.ctx.lineWidth = 1.5;
                this.bmd.ctx.beginPath();
                this.bmd.ctx.arc((system.position.x+this.mapScrollX)*zoom,(system.position.y+this.mapScrollY)*zoom,system.size+5,0,2*Math.PI);
                this.bmd.ctx.stroke();  
            }

            // Star
            this.bmd.ctx.lineWidth = 1.5;
            this.bmd.ctx.beginPath();
            this.bmd.ctx.arc((system.position.x+this.mapScrollX)*zoom,(system.position.y+this.mapScrollY)*zoom,system.size,0,2*Math.PI);
            if(system.planetCount>0) {
                this.bmd.ctx.fillStyle = system.type.color;
	            this.bmd.ctx.fill();
            } else {
                this.bmd.ctx.strokeStyle='#AAAAAA';
	            this.bmd.ctx.stroke();
            }
            
            // Navigation Arrow
            if(system==this.navigationTarget) {
                this.bmd.draw(this.navArrow, (system.position.x+this.mapScrollX)*zoom, (system.position.y+this.mapScrollY)*zoom-10 );
            }
        }

        // Names/Labels
        for(let system of this.starSystems){
            var textMarginX = system.size+8;
            var textMarginY = 3;
            var lineSpacing = 15;
            
            var labelString = `${system.name}`
            this.bmd.ctx.font = `12px ${FONT}`;
            this.bmd.ctx.strokeStyle='#111111'
            this.bmd.ctx.fillStyle='#FFFFFF'
            this.bmd.ctx.lineWidth = 3;
            
            var labelX = ((system.position.x+this.mapScrollX)*zoom)+textMarginX;
            var labelY = ((system.position.y+this.mapScrollY)*zoom)+textMarginY;

            this.drawShadowText(labelString, labelX, labelY);
            
            // Subtext
            this.bmd.ctx.font = `10px ${FONT}`;
            if(system.isCurrentSystem){
                this.bmd.ctx.fillStyle='#1aae5c'
                this.drawShadowText('Current System', labelX, labelY+lineSpacing);
            }
            
            if(this.currentPath){
                if(system==this.currentPath.lastItem() && !system.isCurrentSystem){
                    if(system==this.navigationDestination){
                        this.bmd.ctx.fillStyle='#1aae5c'
                    } else {
                        this.bmd.ctx.fillStyle='#FFFFFF'
                    }
                    var formattedDistance = numeral(this.distanceToNavigationTarget*PIXEL_TO_LIGHTYEAR).format('0,0.0a');                    
                    if(this.currentPath.length==2){
                        var jumpText = 'Jump'
                    } else {
                        var jumpText = 'Jumps'
                    }
                    
                    this.drawShadowText(`${this.currentPath.length-1} ${jumpText} / ${formattedDistance} ly`, labelX, labelY+lineSpacing);
                } else if(system==this.navigationTarget) {
                    this.bmd.ctx.fillStyle='#c03b2b'
                    this.drawShadowText(`Out of Range`, labelX, labelY+lineSpacing);
                    
                }
            }
        }        
    }

    updateNavigation(){
        if(!this.navigationDestination){
            // 'Cursor' sort of...
            // Find the star closest to the center of the screen
            var lowest = Number.POSITIVE_INFINITY;
            var tmp;
            for (var i=this.starSystems.length-1; i>=0; i--) {
                tmp = this.starSystems[i].distanceFromMapCenter;
                if (tmp < lowest) {
                    lowest = tmp;
                    this.navigationTarget = this.starSystems[i];
                }
            }
            if(this.game.system!=this.navigationTarget){
                if(this.navigationTarget!=this.navigationTargetCache){
                    this.currentPath = this.findPathFromSystemToSystem(this.game.system,this.navigationTarget);
                    this.distanceToNavigationTarget = this.distanceOfPath(this.currentPath)
                    
                    if(this.currentPath.includes(this.navigationTarget)){
                        this.navTargetChangedSound.play();
                    } else {
                        this.navTargetInvalidSound.play();
                    }
                }
            } else {
                this.currentPath = false;
            }
            this.navigationTargetCache = this.navigationTarget;
        }
    }
    
    
    drawShadowText(text,x,y){
        this.bmd.ctx.strokeText(text,x,y);
        this.bmd.ctx.fillText(text,x,y);            
    }
    
    drawGridLines(options){
        var zoom = this.mapZoom;
        var major = options.major || 100*zoom;
        var minor = options.minor || 25*zoom;            
    	this.bmd.ctx.strokeStyle = options.color || "#333333";
    	
        // Verticle
        for (var x = 0; x <= this.game.galaxy.settings.mapWidth; x+=minor) {
            if (x % major == 0) {
                this.bmd.ctx.lineWidth = 2;
            } else {
                this.bmd.ctx.lineWidth = 1;                
            }
        	this.bmd.ctx.beginPath();
        	this.bmd.ctx.moveTo((x+this.mapScrollX)*zoom,this.mapScrollY*zoom);
        	this.bmd.ctx.lineTo((x+this.mapScrollX)*zoom,(this.mapScrollY*zoom)+(this.game.galaxy.settings.mapHeight*zoom));
            this.bmd.ctx.stroke();
        }


        // Horizontal
        for (var y = 0; y <= this.game.galaxy.settings.mapHeight; y+=minor) {
            if (y % major == 0) {
                this.bmd.ctx.lineWidth = 2;
            } else {
                this.bmd.ctx.lineWidth = 1;                
            }
        	this.bmd.ctx.beginPath();
        	this.bmd.ctx.moveTo(this.mapScrollX*zoom,(y+this.mapScrollY)*zoom);
        	this.bmd.ctx.lineTo((this.mapScrollX*zoom)+(this.game.galaxy.settings.mapWidth*zoom),(y+this.mapScrollY)*zoom);
            this.bmd.ctx.stroke();
        }
    }
    
    update(){
        if(this.isActive){
            this.updateNavigation();
    
            if (this.cursors.up.isDown) {
                this.mapScrollYStep+=this.mapScrollIncrement;
            } else if(this.cursors.down.isDown){
                this.mapScrollYStep-=this.mapScrollIncrement;            
            } else {
                // Y
                if(this.mapScrollYStep>0)this.mapScrollYStep-=this.mapScrollDecay;
                if(this.mapScrollYStep<0)this.mapScrollYStep+=this.mapScrollDecay;
                if(Math.abs(this.mapScrollYStep)<this.mapScrollDecay) this.mapScrollYStep=0;
            }
    
            if (this.cursors.left.isDown) {
                this.mapScrollXStep+=this.mapScrollIncrement;
            } else if(this.cursors.right.isDown){
                this.mapScrollXStep-=this.mapScrollIncrement;            
            } else {
                // X
                if(this.mapScrollXStep>0)this.mapScrollXStep-=this.mapScrollDecay;
                if(this.mapScrollXStep<0)this.mapScrollXStep+=this.mapScrollDecay;
                if(Math.abs(this.mapScrollXStep)<this.mapScrollDecay) this.mapScrollXStep=0;
            }
    
            if (this.plusKey.isDown && this.didZoom==false) {
                if(this.mapZoom==.5){
                    this.mapZoom = 1
                    this.mapScrollX -= (this.width/2);
                    this.mapScrollY -= (this.height/2);
                } else if(this.mapZoom==1) {
                    this.mapZoom = 2
                    this.mapScrollX -= (this.width/4);
                    this.mapScrollY -= (this.height/4);
                }
    
                this.didZoom = true;
    
                game.time.events.add(Phaser.Timer.SECOND * .15, function(){
                    this.didZoom = false;
                }, this);
    
            } else if(this.minusKey.isDown && this.didZoom==false){
                if(this.mapZoom==1){
                    this.mapZoom = .5
                    this.mapScrollX += (this.width/2);
                    this.mapScrollY += (this.height/2);
                } else if(this.mapZoom==2) {
                    this.mapZoom = 1
                    this.mapScrollX += (this.width/4);
                    this.mapScrollY += (this.height/4);
                }
    
                this.didZoom = true;
    
                game.time.events.add(Phaser.Timer.SECOND * .15, function(){
                    this.didZoom = false;
                }, this);
    
            } else {            
                if(this.mapZoomStep>0)this.mapZoomStep-=this.mapZoomIncrement;            
                if(this.mapZoomStep<0)this.mapZoomStep+=this.mapZoomIncrement;            
    
                if(this.mapZoomStep>0 && this.mapZoomStep<this.mapZoomIncrement)this.mapZoomStep=0;            
                if(this.mapZoomStep<0 && this.mapZoomStep>this.mapZoomIncrement)this.mapZoomStep=0;
            }
            
            this.mapScrollX += this.mapScrollXStep/this.mapZoom;
            this.mapScrollY += this.mapScrollYStep/this.mapZoom;        
            
                    
            if(this.mapZoom>this.mapZoomMax) {
                this.mapZoom = this.mapZoomMax;
                this.mapZoomStep = 0;
            }
    
            if(this.mapZoom<this.mapZoomMin) {
                this.mapZoom = this.mapZoomMin;
                this.mapZoomStep = 0;
            }
                    
            if(this.mapZoom>=this.mapZoomMin && this.mapZoom<=this.mapZoomMax && this.mapZoomStep!=this.mapZoomCache) {
                this.mapZoom += this.mapZoomStep;
                this.mapZoomCache = this.mapZoomStep;
                
                this.mapScrollX += this.mapScrollX*(this.mapZoom/2);
            }
            this.drawMap();
        }
    }
    
    cleanup(){
        this.plusKey = null;
        this.minusKey = null;
        this.spaceKey.onUp.remove(this.setDestination, this);
        this.spaceKey = null;
    }
}