class GuiInventoryList extends Phaser.Group {
    constructor(game) {
        super(game.game);
        this.phaserGame = game.game;

        this._title = '';
        this._items = [];
        this._focus = false;

        this.clickSound = game.add.audio('gui_click_soft');
        this.txSound = game.add.audio('gui_click');

        this.selectedItemIndex = 0;
        this.currentPage = 1;
        this.itemsPerPage = 8;

        this.itemCursorHeight = 32;
        this.listWidth = 240;
        this.listHeight = this.itemCursorHeight*(this.itemsPerPage+1);
        this.headerHeight = 30;

        // Background            
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        
        // Title Label
        this.titleBg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.titleLabel = this.phaserGame.add.text(
            16,8, 
            '', 
            { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this
        )
        this.titleLabel.resolution = 2;

        // Empty Label
        this.emptyLabel = this.phaserGame.add.text(
            0,0,
            'No Items', 
            { font: `16px ${FONT}`, fill: '#948f9c', align: 'center'},
            this
        )
        this.emptyLabel.resolution = 2;
        this.add(this.emptyLabel);

        // Cursor
        this.itemCursor = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.itemCursorLeftPolygon = new Phaser.Polygon(
            0,0,
            -8,this.itemCursorHeight/2, 
            0,this.itemCursorHeight,
            0,this.itemCursorHeight,
            this.listWidth,this.itemCursorHeight,
            this.listWidth,0,
        );
        this.itemCursorRightPolygon = new Phaser.Polygon(
            0,0,
            this.listWidth,0, 
            this.listWidth+8,this.itemCursorHeight/2,
            this.listWidth,this.itemCursorHeight,
            0,this.itemCursorHeight,
        );

        // Lables
        this.labels = this.game.add.group();
        this.add(this.labels);

        this.layout();
    }

    set focus(focus){ 
        if(focus) this.clickSound.play();
               
        this._focus = focus
        this.selectedItemIndex = 0;
        this.layout();
    }

    get focus(){
        return this._focus;
    }
        
    set title(title){
        this._title = title
        this.layout();
    }

    get title(){
        return this._title;
    }

    set items(items){
        this._items = [];
        items.sort((a, b) => a.name.localeCompare(b.name));
        
        this._groupedItems = _.groupBy(items, item => item.key);
        Object.keys(this._groupedItems).forEach(function(key,index) {
            var group = this._groupedItems[key];
            this._items.push(group)
        }.bind(this));

        this.layout();
    }

    get items(){
        return this._items;
    }
    
    get valueOfAllItems(){
        var totalValue = 0;
        if(this._items.length>0){
            for (let item of this._items) {
                totalValue += item.baseValue;
            }
        }
        return totalValue;
    }
    
    addItem(addedItem){
        this.txSound.play();

        var allItems = [].concat.apply([], this._items); // Flatten
        allItems.push(addedItem);
        this.items = allItems;
        
        this.layout();
    }

    removeItem(item){
        // Find + Remove Item
        var allItems = [].concat.apply([], this._items); // Flatten

        var index = allItems.indexOf(item);
        if (index > -1) allItems.splice(index, 1);

        this.items = allItems;        
        
        // Update Selected Index for last item
        if(this.selectedItemIndex == this._items.length) this.selectedItemIndex--;
        
        this.layout();
    }
    
    get selectedItem(){
        if(this.items.length>0) {
            try{
                if(this.currentPage>1){
                    return this._items[(this.selectedItemIndex+this.itemsPerPage*(this.currentPage-1))-2][0]                            
                } else {
                    return this._items[this.selectedItemIndex][0]            
                }                
            } catch(e){
                return null;
            }
            
        } else {
            return null;
        }
    }

    get colorForSelectedItem(){
        if(this.selectedItem) return RARITY_COLOR[this.selectedItem.rarity];
    }
    
    selectNextItem(){
        this.clickSound.play();

        try {
            if(this.selectedItem==this.items[this.items.length-1][0]) return;
        } catch(e){}
            
        if(this.selectedItemIndex<=this.items.length) this.selectedItemIndex++;
        if(this.selectedItemIndex>=this.itemsPerPage-1) {
            this.currentPage++;
            this.selectedItemIndex=0;
        }
        
        this.layout();
    }

    selectPreviousItem(){
        this.clickSound.play();
        
        if(this.selectedItemIndex>0) this.selectedItemIndex--;
        if(this.selectedItemIndex==0 && this.currentPage>1){
            this.selectedItemIndex=this.itemsPerPage-2;
            this.currentPage--;
        }
        if(this.selectedItemIndex==0 && this.currentPage==1){
            this.selectedItemIndex=0;
        }
        this.layout();
    }
       
    updateCursorPosition(){
        if(this.currentPage>1 && this.selectedItemIndex==0){
            this.selectedItemIndex++;
        }

        this.itemCursor.clear();
        this.itemCursor.beginFill(this.colorForSelectedItem);
        if(this.itemCursorStyle == INVENTORY_LIST_CURSOR_STYLE.left){
            this.itemCursor.drawPolygon(this.itemCursorLeftPolygon);
        }
        if(this.itemCursorStyle == INVENTORY_LIST_CURSOR_STYLE.right){
            this.itemCursor.drawPolygon(this.itemCursorRightPolygon);
        }
        this.itemCursor.endFill();
        this.itemCursor.visible = true;
    
        this.itemCursor.y = this.itemCursorHeight*this.selectedItemIndex + this.headerHeight;        
    }
    
    layout(){    
        // BG
        this.bg.clear();
        this.bg.beginFill(0x3F3C46);
        this.bg.drawRect(0,0,
            this.listWidth,
            this.listHeight,
        )
        this.bg.endFill();  
                
        // Title
        this.titleBg.clear();
        this.titleBg.beginFill(0x4D4B56);
        this.titleBg.drawRect(0,0,
            this.listWidth,
            this.headerHeight,
        )
        this.titleBg.endFill();
        this.titleLabel.setText(this._title);
        
        
        // Items
        this.labels.removeAll(true);
        var index = 0;

        // Cursor
        if(this.selectedItem && this.focus){
            this.updateCursorPosition();
        } else {
            this.itemCursor.visible = false;
        }

        // Empty Label
        this.emptyLabel.visible = false;
        if(this.items.length==0) this.emptyLabel.visible = true;
        this.emptyLabel.x = (this.listWidth/2)-(this.emptyLabel.width/2);
        this.emptyLabel.y = (this.listHeight/2)-(this.emptyLabel.height/2);

        var indexStart = (this.currentPage-1)*this.itemsPerPage;
        var indexEnd = this.currentPage*this.itemsPerPage;
        var indexOffset = 0;

        if(this.items.length>this.itemsPerPage){
            //indexEnd--;
        }
        if(this.currentPage>1){
            indexOffset =-2;
            indexStart-=2
            indexEnd-=2;
        }

        // Items
        for (var i = indexStart; i < indexEnd; i++) {
            if(this.items[i]!=undefined){
                var group = this.items[i]
                var item = group[0];
                var text = item.name
                if(group.length>1){
                    text += ` (${group.length})`;
                }
                
                var arrow = false;
        
                // Arrows

                if(index==this.itemsPerPage-1){
                    text = String.fromCharCode(0x2193);
                    arrow = true;
                }
                if(index==0 && this.currentPage>1){
                    text = String.fromCharCode(0x2191);
                    arrow = true;
                }
                
                // Label
                var itemLabel = this.phaserGame.add.text(
                    16,this.itemCursorHeight*(index) + this.headerHeight + 8, 
                    text, 
                    { font: `15px ${FONT}`, fill: '#FFFFFF', align: 'left'},
                    this
                )
                this.labels.add(itemLabel);
                
                if(index==this.selectedItemIndex && this.focus){
                    itemLabel.addColor("#000000", 0)
                } else {
                    if(!arrow) itemLabel.tint = RARITY_COLOR[item.rarity];
                }
                
                if(!arrow) itemLabel.tint = RARITY_COLOR[item.rarity];
                itemLabel.resolution = 2;
                index++;
            }
       }
    }
}