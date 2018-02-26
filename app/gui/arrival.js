class ArrivalScreen extends GuiScreen {
    constructor(game,group) {
        super(game,group);

        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom;

        this._destination = null;
        this.serviceButtons = [];
        this.serviceScreens = {};      
        
        this.setupKeys();
        this.setupScreen();
                
        this.wrapper = group;
        this.wrapper.add(this.screen);
        this.wrapper.fixedToCamera = true;

        this.controlGroup = this.game.add.group();
        this.screen.add(this.controlGroup);
    }
    
    setupKeys(){
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onUp.add(function(){
            if(this.game.player.controlMode == CONTROL_MODE.landed) this.hide();
        }, this);
        var lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
        lKey.onUp.add(function(){
            if(this.game.player.controlMode == CONTROL_MODE.landed) this.hide();
        }, this);
    }
    
    setupScreen(){
        // BG
        this.bg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.panelBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));

        // Background
        this.bg.clear();
        this.bg.beginFill(this.styles.darkGrey);
        this.bg.drawRoundedRect(0,0,
            this.game.camera.width,
            this.game.camera.height*2,
            0
        )
        this.bg.endFill();

        // Panel
        this.panelHeight = this.game.scale.height-126;
        this.panelTop = 94;
        this.panelBg.clear();
        this.panelBg.beginFill(this.styles.midGrey);
        this.panelBg.drawRoundedRect(36,this.panelTop,
            this.game.camera.width-(36*2),
            this.panelHeight,
            this.styles.borderRadius
        )
        this.panelBg.endFill();

        
        // Title / Details / Date
        this.destDesc = this.game.add.text(
            36,24, 
            '', 
            this.styles.smallGreyText, 
            this.screen
        )
        this.destDesc.resolution = this.textResolution;

        this.destName = this.game.add.text(
            36,43, 
            '', 
            this.styles.title, 
            this.screen
        )
        this.destName.resolution = this.textResolution;
 
        this.destBreadcrumb = this.game.add.text(
            -1,43, 
            '', 
            this.styles.title, 
            this.screen
        )
        this.destBreadcrumb.tint = 0x948f9c;
        this.destBreadcrumb.resolution = this.textResolution;

        
        this.currentDate = this.game.add.text(
            36,68, 
            '', 
            this.styles.smallWhiteText, 
            this.screen
        )
        this.currentDate.resolution = this.textResolution;

        // Exit button
        this.exitButton = new Button(this.game,'exit-button',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.exitButton.buttonX = this.game.camera.width - this.exitButton.buttonWidth - 36;
        this.exitButton.buttonY = 24;
        this.exitButton.text = "EXIT (ESC)";
        this.exitButton.color = this.styles.red;
        this.screen.add(this.exitButton);

        // Credits
        this.creditsLabel = this.game.add.text(
            this.game.camera.width-36,68, 
            '', 
            this.styles.baseText, 
            this.screen
        );
        this.creditsLabel.anchor.set(1,0);
        this.creditsLabel.addColor('#948f9c', 0);
        this.creditsLabel.addColor('#FFFFFF', 7);
        this.creditsLabel.resolution = this.textResolution;

        // Photo
        this.picture = this.game.add.sprite(36, this.panelTop, 'planet-arrival-1');
        var cropRect = new Phaser.Rectangle(0, 0, 300, this.panelHeight);
        this.picture.crop(cropRect);
        this.screen.add(this.picture);
        this.innerColX = this.picture.width+36+24

        // Message
        this.innerColWidth = this.game.camera.width - (this.picture.width+36+24) - 36-24; 
        this.welcomeText = this.game.add.text(
            this.innerColX,this.panelTop+16, 
            '', 
            { font: ` ${12+this.fontSizeOffset}px Fira Code`, fill: '#FFFFFF', align: 'left', wordWrap: true, wordWrapWidth: this.innerColWidth }, 
            this.screen
        );
        this.welcomeText.lineSpacing = -4;
        this.welcomeText.resolution = this.textResolution;        
    }
    
    layout(){        
        this.cleanup();
        
        // Description
        this.destDesc.setText(this.destination.description);

        // Name
        this.destName.setText(this.destination.name);
        
        // Breadcrumb
        this.destBreadcrumb.setText('');
        this.destBreadcrumb.alpha = 0;
        this.destBreadcrumb.x = this.destName.x + this.destName.width + 10
        
        // Date
        this.currentDate.setText(moment(this.game.starDate).format('MMMM Do YYYY, HH:mm'));

        // Text
        this.welcomeText.setText(this.destination.welcomeText);      
    
        // Services Buttons/
        this.controlGroup.visible = true;
        var servicesIndex = 0;
        var serviceRow = 1;
        for (let service of this.destination.services) {
            var serviceButton = new TwoLineButton(this.game,'service-button');
            serviceButton.screen = this;
            serviceButton.service = service;

            serviceButton.callbacks = {
                onDown : function() {
                    this.screen.serviceButtonClicked(this);
                }.bind(serviceButton)
            }

            serviceButton.buttonWidth = (this.innerColWidth/2)-8
            if(isEven(servicesIndex)){
                serviceButton.buttonX = this.innerColX;
            } else {
                serviceButton.buttonX = this.innerColX + serviceButton.buttonWidth+16;
            }
            
            serviceButton.buttonY = (this.panelHeight+this.panelTop)-((serviceButton.buttonHeight+16)*serviceRow);
            serviceButton.text = PLANET_SERVICES_TITLE[service];
            serviceButton.subText = PLANET_SERVICES_DESC[service];
            serviceButton.color = this.styles.lightGrey;
            this.controlGroup.add(serviceButton);            
            
            servicesIndex++;
            if(servicesIndex % 2 === 0) serviceRow++;
            this.serviceButtons.push(serviceButton);
        }            

        this.updateCredits();      
    }
        
    serviceButtonClicked(button){
        this.presentScreenForService(button.service)
    }
    
    presentScreenForService(service){
        // Present Screen
        if(service==PLANET_SERVICES.market){
            this.serviceScreens[PLANET_SERVICES.market] = new ExchangeScreen(this.game,this.screen,this.destination);
            this.serviceScreens[PLANET_SERVICES.market].parentScreen = this;
            this.screen.add(this.serviceScreens[PLANET_SERVICES.market].screen);            
        }

        var screenToPresent = this.serviceScreens[service]
        screenToPresent.show();          

        // Update Breadcrumb
        this.destBreadcrumb.setText('/ ' + PLANET_SERVICES_TITLE[service]);
        this.destBreadcrumb.alpha = 0;
        var transition = this.game.add.tween(this.destBreadcrumb).to({alpha: 1}, 600, "Quart.easeOut", true);
    }
    childScreenDidShow(){
        this.controlGroup.visible = false;        
    }

    childScreenWillHide(){
        super.childScreenWillHide();
        this.game.add.tween(this.destBreadcrumb).to({alpha: 0}, 600, "Quart.easeOut", true);
        this.controlGroup.visible = true;  
        
        this.updateCredits();      
    }
    
    show(){
        super.show();
        
        // Arrival Specific 
        this.game.player.stop();                
    }

    didShow(){
        super.didShow();        
        this.game.player.controlMode = CONTROL_MODE.landed;
        this.controlGroup.visible = true;        
    }
    
    hide(){
        super.hide();

        // Arrivial Specific
        this.game.player.ship.takeOff();
    }

    didHide(){
        super.didHide();
    }
    
    cleanup(){
        for (let button of this.serviceButtons) {
            button.destroy(true);
        }
        
        Object.keys(this.serviceScreens).forEach(function(key,index) {
            var screen = this.serviceScreens[key];
            screen.cleanup();
            screen.screen.destroy(true);
        }.bind(this));
    }
    
    get destination(){
        return this._destination;
    }

    set destination(destination){
        this._destination = destination;
        this.layout();
    }

    updateCredits(){
        this.creditsLabel.setText('CREDITS ' + this.game.player.credits);
    }


}