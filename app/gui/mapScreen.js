class MapScreen extends GuiScreen {
    constructor(game,group) {
        super(game,group);

        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom;
        
        this.setupScreen();
                
        this.wrapper = group;
        this.wrapper.add(this.screen);
        this.wrapper.fixedToCamera = true;
        this.wrapper.visible = false;
        
        this.destination = null;
        this.destinationCache = null;
        
        this.map = new GalacticMap(this.game,{
            width : this.game.camera.width-this.game.hud.sidebarWidth,
            height : screenHeight-46-38,
            x : 0,
            y : 46,
            group : this.screen,
        });
    }
    
    setupKeys(){
        this.mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
        this.mKeyOnUp = function(){
            this.hide();
        }
        this.mKey.onUp.add(this.mKeyOnUp, this);
    }
    
    setupScreen(){
        this.screenWidth = this.game.camera.width-this.game.hud.sidebarWidth;

        this.bg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.tabBar = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.bottomBar = this.screen.add(new Phaser.Graphics(this.game.game,0,0));

        // Background
        this.bg.clear();
        this.bg.beginFill(0x111111);
        this.bg.drawRect(0,0,
            this.screenWidth,
            this.game.camera.height*2,
            0
        )
        this.bg.endFill();

        // Bottom Bar
        this.bottomBarHeight = 38;
        this.bottomBar.clear();
        this.bottomBar.beginFill(this.styles.darkGrey);
        this.bottomBar.drawRect(0,this.game.camera.height-this.bottomBarHeight,
            this.screenWidth,
            this.bottomBarHeight+100, // Overlap for animation
        )
        this.bottomBar.endFill();

        this.helpText = this.game.add.text(
            16,this.game.camera.height - 26, 
            '(ARROWS) Move Map   (SPACE) Select Destination    (+/-) Zoom', 
            { font: `12px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )


        // Tabs
        this.shipTab = new TabItem(this.game,'ship-tab',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        );
        this.shipTab.buttonX = 0;
        this.shipTab.buttonY = 0;
        this.shipTab.text = "Ship";
        this.screen.add(this.shipTab);
        
        this.inventoryTab = new TabItem(this.game,'inv-tab');
        this.inventoryTab.buttonX = this.shipTab.buttonWidth + 1;
        this.inventoryTab.buttonY = 0;
        this.inventoryTab.text = "Inventory";
        this.screen.add(this.inventoryTab);

        this.mapTab = new TabItem(this.game,'map-tab',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        );
        this.mapTab.buttonX = this.inventoryTab.buttonX + this.inventoryTab.buttonWidth + 1;
        this.mapTab.buttonY = 0;
        this.mapTab.text = "Map";
        this.mapTab.active = true;
        this.screen.add(this.mapTab);

        this.statsTab = new TabItem(this.game,'stats-tab',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        );
        this.statsTab.buttonX = this.mapTab.buttonX + this.mapTab.buttonWidth + 1;
        this.statsTab.buttonY = 0;
        this.statsTab.text = "Stats";
        this.screen.add(this.statsTab);

        this.tabBar.clear();
        this.tabBar.beginFill(0x3F3C46);
        this.tabBar.drawRect(0,45,
            this.screenWidth,
            1,
            0
        )
        this.tabBar.endFill();

    }
        
    show(){
        super.show();

        this.wrapper.visible = true;
        this.setupKeys();

        this.map.setupKeys();
        this.map.isActive = true;
        this.map.centerOnSystem(this.game.system);

    }

    didShow(){
        super.didShow();        
        this.game.player.controlMode = CONTROL_MODE.inventory;
    }
    
    hide(){
        super.hide();
        this.cleanup();

        this.map.isActive = false;
        this.map.cleanup();

        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.game.hud.showSystemInfo();
        }, this);
    }

    didHide(){
        super.didHide();
        
        this.destination = this.map.navigationDestination;
        
        if(this.destination!=this.destinationCache && this.destination){
            this.game.hud.showFTLPanel();
        }

        this.destinationCache = this.destination;
    }
    
    cleanup(){
        this.mKey.onUp.remove(this.mKeyOnUp, this);
    }
}