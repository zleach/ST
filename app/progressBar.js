class ProgressBar {
    constructor(game,hud,title,x,y) {
        this.game = game;
        this.phaserGame = game.game;
        this.x = x;
        this.y = y;
        this.height = 26;
        
        this.hud = hud;

        this.valuePercent = 0;
        this._valuePercent = 0;
        this.value = null;
        this._value = null;
        this.max = 0;
        this._max = 0;
        this.displayTotal = false;
        this.title = title;

        this.barBitmapData = this.phaserGame.add.bitmapData(116);
        this.barBitmapData.ctx.fillStyle = '#EEEEEE';

        this.phaserGame.cache.addBitmapData('progbar', this.barBitmapData);
        this.barSprite = this.hud.group.create(
            x,
            y+12,
            this.phaserGame.cache.getBitmapData('progbar')
        )

        var label = new Phaser.BitmapText(
            this.game.game,
            x,
            y, 'pixelmix_8',
            this.title,
            5,
        );
        label.tint = 0x948f9c;
        this.hud.group.add(label)

        this.amountDisplay = new Phaser.BitmapText(
            this.game.game,
            x+116,
            label.y, 'pixelmix_8',
            '',
            5
        );
        this.amountDisplay.tint = 0xFFFFFF;
        this.amountDisplay.anchor.set(1,0);
        this.hud.group.add(this.amountDisplay)   
    }

    set valuePercent(valuePercent){
        this._valuePercent = valuePercent;
        this.draw();
    }
    
    get valuePercent(){
        return this._valuePercent;
    }

    set value(value){
        this._value = value;
        this.draw();
    }
    
    get value(){
        return this._value;
    }

    set max(max){
        this._max = max;
        this.draw();
    }
    
    get max(){
        return this._max;
    }

    draw(){
        if(this.barBitmapData!=undefined){
            this.barBitmapData.clear();
            this.barBitmapData.ctx.fillStyle = '#504d54';
            this.barBitmapData.rect(0,0,116,10);
            if(this.value){
                this.barBitmapData.ctx.fillStyle = '#EEEEEE';
                this.barBitmapData.rect(0,0,Math.round(((this.value/this.max)*100)*1.16),10);
                this.amountDisplay.setText(`${Math.round(this.value)}/${Math.round(this.max)}`); 
            } else {
                if(isNaN(this.valuePercent)) this.valuePercent = 0;
                this.barBitmapData.ctx.fillStyle = '#EEEEEE';
                this.barBitmapData.rect(0,0,Math.round(this.valuePercent*1.16),10);
                this.amountDisplay.setText(this.valuePercent+"%");
            }
    
            this.barBitmapData.dirty = true;                    
        }
    }

    update(){    
    
    }
    
}