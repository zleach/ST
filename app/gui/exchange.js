class ExchangeScreen extends GuiScreen {
    constructor(game,group,destination) {
        super(game,group);

        this.destination = destination;
        this.serviceButtons = [];
      
        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromRight;

        this.setupKeys();

        this.insetX = 32;
        this.insetBottom = 32;
        this.top = 94;

        // BG
        this.bg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.panelBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));

        // Background
        this.bg.clear();
        this.bg.beginFill(this.styles.darkGrey);
        this.bg.drawRect(0,this.top,
            this.game.camera.width,
            this.game.camera.height,
            0
        )
        this.bg.endFill();
        
        // Lists
        this.myList = new GuiInventoryList(this.game,this.screen);
        this.myList.title = 'My Ship'
        this.myList.x = this.insetX;
        this.myList.y = this.top;
        this.myList.itemCursorStyle = INVENTORY_LIST_CURSOR_STYLE.right;
        
        this.exchangeList = new GuiInventoryList(this.game);
        this.exchangeList.title =  `${this.destination.name} ${PLANET_SERVICES_TITLE.market}` 
        this.exchangeList.x = (this.game.camera.width - this.insetX) - this.exchangeList.listWidth; 
        this.exchangeList.y = this.top;
        this.exchangeList.itemCursorStyle = INVENTORY_LIST_CURSOR_STYLE.left;
        
        this.screen.add(this.myList);
        this.screen.add(this.exchangeList);
        
        this.myListDelta = []
        this.exchangeListDelta = [];

        this.activeList = this.myList;
        this.activeList.focus = true;

        // Item Info
        // Background
        this.itemInfoBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.itemInfoTitleBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.infoTitleLabel = this.game.add.text(
            0,0, 
            'Item', 
            { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this.screen
        )
        this.infoTitleLabel.resolution = 2;
        
        // Props
        this.propsGroup = this.game.add.group();
        this.screen.add(this.propsGroup);

        // Back Button
        this.backButton = new Button(this.game,'back-button',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.backButton.buttonX = this.insetX;
        this.backButton.buttonY = this.myList.listHeight+this.top+16;
        this.backButton.text = `${String.fromCharCode(0x2190)} Back`;
        this.screen.add(this.backButton);

        // Help Text
        this.helpText = this.game.add.text(
            this.insetX,this.game.camera.height - this.insetBottom-16, 
            '(UP/DOWN) Select Item   (SPACEBAR) Buy/Sell Item   (TAB) Switch List   (RETURN) Accept', 
            { font: `12px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )
        this.infoTitleLabel.resolution = 2;


        // Sale Amount
        // Background
        this.saleAmountBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.saleTotalLabel = this.game.add.text(
            0,0,
            'Total', 
            { font: `14px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )
        this.saleTotalLabel.resolution = 2;

        this.saleAmountLabel = this.game.add.text(
            0,0,
            '', 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this.screen
        )
        this.saleAmountLabel.anchor.set(1,0);
        this.saleAmountLabel.resolution = 2;

        this.acceptButton = new Button(this.game,'accept-button',{
            onReleased : function() {
                this.acceptTransaction();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.screen.add(this.acceptButton);
    }

    update(){
        super.update();
        this.updateItemInfo();        
    }
    
    updateSaleAmount(){
        var saleAmountMargin = 16;
        var saleAmountHeight = 70;
        var saleAmountX = this.myList.x+this.myList.listWidth+saleAmountMargin;
        var saleAmountY = this.exchangeList.listHeight + this.top - saleAmountHeight;
        var saleAmountWidth = this.game.camera.width-(this.exchangeList.listWidth*2)-(this.insetX*2)-(saleAmountMargin*2);
            
        // Labels
        this.saleTotalLabel.x = saleAmountX + 8;
        this.saleTotalLabel.y = saleAmountY + 8;

        this.saleAmountLabel.x = saleAmountX - 8 + saleAmountWidth;
        this.saleAmountLabel.y = saleAmountY + 8;
        
        var saleAmount = this.calculateSaleAmount();

        var formattedSaleAmount = CREDIT_PREFIX.short + numeral(Math.abs(saleAmount)).format('0,0');
        if(saleAmount>0) formattedSaleAmount = '+' + formattedSaleAmount
        if(saleAmount<0) formattedSaleAmount = '-' + formattedSaleAmount
        if(saleAmount!=0){
            // BG
            this.saleAmountBg.clear();
            this.saleAmountBg.beginFill(0x3F3C46);
            this.saleAmountBg.drawRect(saleAmountX,saleAmountY,
                saleAmountWidth,
                saleAmountHeight,
                0
            )
            this.saleAmountBg.endFill();
            this.saleTotalLabel.visible = true;
            this.saleAmountBg.visible = true;
            this.acceptButton.visible = true;
        } else {
            this.saleTotalLabel.visible = false;
            this.saleAmountBg.visible = false;
            this.acceptButton.visible = false;
        }

        this.acceptButton.buttonX = saleAmountX + 8;
        this.acceptButton.buttonY = saleAmountY + 8 + 24;
        this.acceptButton.buttonWidth = saleAmountWidth-16;
        this.acceptButton.text = `Accept ${formattedSaleAmount}`;
        this.acceptButton.color = 0x1aae5c;
    }
    
    calculateSaleAmount(){
        var myListDeltaTotal = 0;
        var exchangeListDeltaTotal = 0;
        for (let item of this.myListDelta) {
            if(item.containedIn == this.destination){
                myListDeltaTotal += item.buyValue
            } else {
                myListDeltaTotal += item.baseValue
            }               
        } 

        for (let item of this.exchangeListDelta) {
            if(item.containedIn == this.destination){
                exchangeListDeltaTotal += item.buyValue;
            } else {
                exchangeListDeltaTotal += item.baseValue;
            }               
        } 


        return exchangeListDeltaTotal - myListDeltaTotal;        
    }
    
    updateItemInfo(){
        var item = this.activeList.selectedItem;
                        
        var infoMargin = 16;
        var infoWidth = this.game.camera.width-(this.exchangeList.listWidth*2)-(this.insetX*2)-(infoMargin*2)
        var infoX = this.myList.x+this.myList.listWidth+infoMargin;
        var infoY = this.top;

        // Properites
        this.itemInfoBg.clear();
        this.itemInfoTitleBg.clear();
        var infoBgHeight = 100;
        this.propsGroup.removeAll(true);
        if(item){
            var props = ['baseValue','mass','rarity','storageClass'];
            var labels = ['Value','Weight','Rarity','Container'];
            var propIndex = 0;
            var propLineHeight = 20;
            for (let prop of props) {
                var propY = (propIndex*propLineHeight)+infoY+40;
                if(item[prop]==undefined) return;
                
                var propTitle = this.game.add.text(
                    infoX+8,propY, 
                    labels[propIndex], 
                    { font: `13px ${FONT}`, fill: '#929292', align: 'left'},
                    this.propsGroup
                )
                propTitle.resolution = 2;
    
                var value = item[props[propIndex]];
                if(props[propIndex]=='baseValue') {
                    if(item.containedIn == this.destination){
                        // Prices are higher when buying ;)
                        value = CREDIT_PREFIX.short + numeral(item.buyValue).format(`0,0[.]00`);
                    } else {
                        value = CREDIT_PREFIX.short + numeral(value).format(`0,0[.]00`);
                    }   
                }
                if(props[propIndex]=='rarity') value = RARITY_NAMES[item[props[propIndex]]];
                if(props[propIndex]=='storageClass') value = CARGO_STORAGE_CLASS_NAMES[item[props[propIndex]]];
                if(props[propIndex]=='mass') value = item.readableMass;
    
                var propValue = this.game.add.text(
                    infoX+infoWidth-8,propY,
                    value, 
                    { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'right'},
                    this.propsGroup
                )
                if(props[propIndex]=='rarity') propValue.tint = RARITY_COLOR[item[props[propIndex]]];
                propValue.anchor.set(1,0);
                propValue.resolution = 2;
                
                propIndex++;
            };
            infoBgHeight = propIndex*propLineHeight+30+16

            this.itemInfoBg.beginFill(0x3F3C46);
            this.itemInfoBg.drawRect(infoX,infoY,
                infoWidth,
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
            
            this.infoTitleLabel.x = infoX+8;
            this.infoTitleLabel.y = infoY+8;
            this.infoTitleLabel.visible = true;
            this.infoTitleLabel.setText(item.readableType);
        } else {
            // Item Empty
            this.infoTitleLabel.visible = false;
        }

        this.updateSaleAmount();
    }
    
    transferSelectedItem(){
        var item = this.activeList.selectedItem;
        if(item) {
            if(this.activeList==this.myList){
                this.exchangeList.addItem(item);
                this.exchangeListDelta.push(item);
                
                this.myList.removeItem(item);

                var index = this.myListDelta.indexOf(item);
                if (index > -1) this.myListDelta.splice(index, 1);
            }
            if(this.activeList==this.exchangeList){
                this.myList.addItem(item);
                this.myListDelta.push(item);
                
                this.exchangeList.removeItem(item);

                var index = this.exchangeListDelta.indexOf(item);
                if (index > -1) this.exchangeListDelta.splice(index, 1);
            }
        }        
    }
    
    toggleActiveList(){
        this.activeList.focus = false;
        if(this.activeList==this.myList){
            this.activeList=this.exchangeList
        } else {
            this.activeList=this.myList            
        }
        this.activeList.focus = true;
        this.update();
    }
    
    acceptTransaction(){
        var saleAmount = this.calculateSaleAmount();
        if(saleAmount!=0){
            if(saleAmount<0){
                // Buy. We will deduct credits.
                if(this.game.player.debitCredits(Math.abs(saleAmount))){
                    // Valid transaction
                    this.completeTransaction(saleAmount);
                } else {
                    // Not Enough.
                    this.showNotEnoughCreditsNotification();
                }
            }
            if(saleAmount>0){
                // Sell. We will add credits.
                this.game.player.addCredits(Math.abs(saleAmount))
                this.completeTransaction(saleAmount);
            }
        }
    }

    completeTransaction(saleAmount){
        this.game.player.ship.emptyCargoHold();
        for (let item of this.myList.items) {
            this.game.player.ship.addItemsToInventory(1,item);
        }
    
        this.destination.emptyCargoHold();
        for (let item of this.exchangeList.items) {
            this.destination.addItemsToInventory(1,item);
        }
        
        // Clear deltas
        this.myListDelta = [];
        this.exchangeListDelta = [];
        
        // Notify
        this.showPurchaseNotification(saleAmount);

        // Cleanup
        this.hide();        
    }
    

    showPurchaseNotification(amount){
        var notification = new Notification(this.game);
        notification.text = 'Transaction Complete';
        notification.subText = 'Items have been transferred.';
        notification.accessoryText = numeral(amount).format('$0,0[.]00');
        notification.show();
    }

    showNotEnoughCreditsNotification(){
        var notification = new Notification(this.game);
        notification.text = 'Not Enough Credits';
        notification.subText = 'Cannot accept this transaction.';
        notification.show();
    }
    
    
    setupKeys(){
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.downKeyOnUp = function(){
            this.activeList.selectNextItem();
            this.update();
        }
        this.downKey.onUp.add(this.downKeyOnUp, this);

        this.upKeyOnUp = function(){
            this.activeList.selectPreviousItem();
            this.update();
        }
        this.upKey.onUp.add(this.upKeyOnUp, this);

        this.spaceKeyOnUp = function(){
            this.transferSelectedItem();
            this.update();
        }
        this.spaceKey.onUp.add(this.spaceKeyOnUp, this);

        this.tabKeyOnUp = function(){
            this.toggleActiveList();
            this.update();
        }
        this.tabKey.onUp.add(this.tabKeyOnUp, this);

        this.enterKeyOnUp = function(){
            this.acceptTransaction();
            this.update();
        }
        this.enterKey.onUp.add(this.enterKeyOnUp, this);
    }
        
    layout(){        
        this.cleanup();
    }
    
    show(){
        super.show();

        this.myList.items = this.game.player.ship.inventory.slice(0);
        this.exchangeList.items = this.destination.inventory.slice(0);

        this.update();        
    }

    didShow(){
        super.didShow();        

        this.game.player.controlMode = CONTROL_MODE.exchange;
    }
    
    hide(){
        super.hide();
    }

    didHide(){
        super.didHide();
    }    
    
    cleanup(){
        this.downKey.onUp.remove(this.downKeyOnUp, this);
        this.upKey.onUp.remove(this.upKeyOnUp, this);
        this.spaceKey.onUp.remove(this.spaceKeyOnUp, this);
        this.tabKey.onUp.remove(this.tabKeyOnUp, this);
        this.enterKey.onUp.remove(this.enterKeyOnUp, this);
   }
}