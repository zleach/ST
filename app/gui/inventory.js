class InventoryScreen extends GuiScreen {
    constructor(game,group) {
        super(game,group);

        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom;
        
        this.setupScreen();
                
        this.wrapper = group;
        this.wrapper.add(this.screen);
        this.wrapper.fixedToCamera = true;
        this.wrapper.visible = false;

        this.helpTexts = {
            default : '(UP/DOWN) Select Item   (J) Jettison',
            equipment : '(UP/DOWN) Select Item   (J) Jettison   (E) Equip/Unequip',
            consumable : '(UP/DOWN) Select Item   (J) Jettison   (SPACE) Use',
        }

        this.jettisonSound = game.add.audio('jettison');

    }
    
    setupKeys(){
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);       
        this.downKeyOnUp = function(){
            this.myList.selectNextItem();
            this.update();
        }
        this.downKey.onUp.add(this.downKeyOnUp, this);

        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.upKeyOnUp = function(){
            this.myList.selectPreviousItem();
            this.update();
        }
        this.upKey.onUp.add(this.upKeyOnUp, this);

        this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escKeyOnUp = function(){
            this.hide();
        }
        this.escKey.onUp.add(this.escKeyOnUp, this);

        this.iKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.iKeyOnUp = function(){
            this.hide();
        }
        this.iKey.onUp.add(this.iKeyOnUp, this);

        this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.eKeyOnUp = function(){
            this.toggleEquipForSelectedItem();
        }
        this.eKey.onUp.add(this.eKeyOnUp, this);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKeyOnUp = function(){
            this.consumeSelectedItem();
        }
        this.spaceKey.onUp.add(this.spaceKeyOnUp, this);

        this.jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.jKeyOnUp = function(){
            this.jettisonSelectedItem();
        }
        this.jKey.onUp.add(this.jKeyOnUp, this);
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
        
        // Tab Bar
        this.tabBarHeight = 45;
        this.tabBar.clear();
        this.tabBar.beginFill(0x111111);
        this.tabBar.drawRect(0,0,
            this.screenWidth,
            this.tabBarHeight,
        )
        this.bottomBar.endFill();

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
        this.inventoryTab.active = true;
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
            '', 
            { font: `12px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )

        // Lists
        this.myList = new GuiInventoryList(this.game,this.screen);
        this.myList.title = 'All Items'
        this.myList.x = 0;
        this.myList.y = this.tabBarHeight;
        this.myList.listWidth = this.screenWidth/2;
        this.myList.listHeight = this.game.camera.height-this.bottomBarHeight-this.tabBarHeight;
        this.myList.itemCursorStyle = INVENTORY_LIST_CURSOR_STYLE.flat;
        this.myList.focus = true;
        this.myList.itemsPerPage = 12;
        this.myList.allowFilter = true;
        this.screen.add(this.myList);

        // Item Info
        // Background
        this.infoMargin = 16;
        this.infoWidth = (this.screenWidth/2)-1;

        this.itemInfoBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.itemInfoTitleBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.infoTitleLabel = this.game.add.text(
            0,0, 
            'Item', 
            { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this.screen
        )
        this.infoTitleLabel.resolution = 2;

        this.infoSubtitleLabel = this.game.add.text(
            0,0, 
            'Item', 
            { font: `13px ${FONT}`, fill: '#929292', align: 'right'},
            this.screen
        )
        this.infoSubtitleLabel.anchor.set(1,0);
        this.infoSubtitleLabel.resolution = 2;


        this.infoDescription = this.game.add.text(
            0,0, 
            '', 
            { font: `12px Fira Code`, fill: '#FFFFFF', align: 'left', }, 
            this.screen
        );
        this.infoDescription.setStyle({ font: `12px Fira Code`, fill: '#FFFFFF', align: 'left', wordWrap: true, wordWrapWidth: this.infoWidth-(this.infoMargin*2) })
        this.infoDescription.lineSpacing = -4;
        this.infoDescription.resolution = this.textResolution;        
        
        // Props
        this.propsGroup = this.game.add.group();
        this.screen.add(this.propsGroup);
    
        this.update();
    }
    
    layout(){        
        this.cleanup();
    }

    update(){
        this.updateItemInfo();        
    }

    updateItemInfo(){                        
        var infoX = this.myList.x + this.myList.listWidth+1;
        var infoY = 45;

        // Properites
        this.itemInfoBg.clear();
        this.itemInfoTitleBg.clear();
        var infoBgHeight = 100;
        this.propsGroup.removeAll(true);

        if(this.myList.selectedItem){
            // HelpTexts
            this.helpText.setText(this.helpTexts.default);
            if(this.myList.selectedItem.isEquippable) this.helpText.setText(this.helpTexts.equipment);
            if(this.myList.selectedItem.isConsumable) this.helpText.setText(this.helpTexts.consumable);

            // Description
            if(this.myList.selectedItem.description!=undefined){
                this.infoDescription.x = infoX+this.infoMargin;
                this.infoDescription.y = infoY + 40;
                this.infoDescription.setText(this.myList.selectedItem.description)
            } else {
                this.infoDescription.setText('');                
            }

            var props = this.myList.selectedItem.infoFields
            var labels = this.myList.selectedItem.infoFieldLabels

            var propIndex = 0;
            var propLineHeight = 20;
            for (let prop of props) {
                var propY = (propIndex*propLineHeight)+infoY+40+this.infoDescription.height+16;
                
                var propTitle = this.game.add.text(
                    infoX+16,propY, 
                    labels[propIndex], 
                    { font: `13px ${FONT}`, fill: '#929292', align: 'left'},
                    this.propsGroup
                )
                propTitle.resolution = 2;
    
                var value = this.myList.selectedItem[props[propIndex]];
                if(props[propIndex]=='baseValue') value = CREDIT_PREFIX.short + numeral(value).format(`0,0[.]00`);
                if(props[propIndex]=='rarity') value = RARITY_NAMES[this.myList.selectedItem[props[propIndex]]];
                if(props[propIndex]=='storageClass') value = CARGO_STORAGE_CLASS_NAMES[this.myList.selectedItem[props[propIndex]]];
                if(props[propIndex]=='mass') value = this.myList.selectedItem.readableMass;
                if(props[propIndex]=='energyConsumption') value = `${numeral(value).format('0,0')} kW`;
                if(props[propIndex]=='fuelConsumption') value = `${numeral(value).format('0,0.0')} units/sec`;
                if(props[propIndex]=='thrust') value = `${numeral(value).format('0,0')} kN`;
                if(props[propIndex]=='range') value = `${numeral(value).format('0,0')} m`;
                if(props[propIndex]=='capacity') value = `${numeral(value).format('0,0')} kWh`;
                if(props[propIndex]=='fuelCapacity') value = `${numeral(value).format('0,0')} units`;
                if(props[propIndex]=='fuelAmount') value = `${numeral(value).format('0,0')} units`;
    
                var propValue = this.game.add.text(
                    infoX+this.infoWidth-16,propY,
                    value, 
                    { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'right'},
                    this.propsGroup
                )
                if(props[propIndex]=='rarity') propValue.tint = RARITY_COLOR[this.myList.selectedItem[props[propIndex]]];
                propValue.anchor.set(1,0);
                propValue.resolution = 2;
                
                propIndex++;
            };
            infoBgHeight = this.game.camera.height - 83;            
            this.infoTitleLabel.x = infoX+16;
            this.infoTitleLabel.y = infoY+8;
            this.infoTitleLabel.visible = true;
            this.infoTitleLabel.setText(this.myList.selectedItem.name);

            this.infoSubtitleLabel.x = infoX+this.infoWidth-16;
            this.infoSubtitleLabel.y = this.infoTitleLabel.y;

            if(this.myList.selectedItem.type!=undefined) this.infoSubtitleLabel.setText(this.myList.selectedItem.type);
            if(this.myList.selectedItem.equipped) this.infoSubtitleLabel.setText('Equipped');
            if(!this.myList.selectedItem.equipped) this.infoSubtitleLabel.setText('Unequipped');
            if(this.myList.selectedItem.isConsumable) this.infoSubtitleLabel.setText('Consumable');
            
        } else {
            // Item Empty
            this.infoTitleLabel.visible = false;
            this.infoDescription.setText('');
            infoBgHeight = this.game.camera.height-83;
        }

        this.itemInfoBg.beginFill(0x3F3C46);
        this.itemInfoBg.drawRect(infoX,infoY,
            this.infoWidth,
            infoBgHeight,
            0
        )
        this.itemInfoBg.endFill();

        this.itemInfoTitleBg.beginFill(0x4D4B56);
        this.itemInfoTitleBg.drawRect(infoX,infoY,
            this.itemInfoBg.width,
            30,
        )
        this.itemInfoTitleBg.endFill(); 
    }
    
    toggleEquipForSelectedItem(){
        if(this.myList.selectedItem.isEquippable){
            if(this.myList.selectedItem.equipped){
               this.myList.selectedItem.unequip(); 
            } else {
               this.myList.selectedItem.equipTo(this.game.player.ship); 
            }
        }
        this.update();
        this.myList.layout();
    }
    
    consumeSelectedItem(){        
        if(this.myList.selectedItem.isConsumable){
           this.myList.selectedItem.consume(); 
        }
        this.refreshItems();
        this.myList.layout();
    }

    jettisonSelectedItem(){        
        this.jettisonSound.play();
        this.myList.selectedItem.remove();         
        
        this.refreshItems();
        this.myList.layout();
    }
    
    refreshItems(){
        this.myList.items = this.game.player.ship.inventory;
    }

        
    show(){
        super.show();

        this.refreshItems();
        this.wrapper.visible = true;
        this.setupKeys();
        this.update();
    }

    didShow(){
        super.didShow();        
        this.game.player.controlMode = CONTROL_MODE.inventory;
    }
    
    hide(){
        super.hide();
        this.cleanup();
        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.game.hud.showSystemInfo();
        }, this);
    }

    didHide(){
        super.didHide();
    }
    
    cleanup(){
        this.escKey.onUp.remove(this.escKeyOnUp, this);
        this.upKey.onUp.remove(this.upKeyOnUp, this);
        this.downKey.onUp.remove(this.downKeyOnUp, this);
        this.iKey.onUp.remove(this.iKeyOnUp, this);
        this.eKey.onUp.remove(this.eKeyOnUp, this);
        this.spaceKey.onUp.remove(this.spaceKeyOnUp, this);
        this.jKey.onUp.remove(this.jKeyOnUp, this);
    }    
}