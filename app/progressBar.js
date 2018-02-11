class ProgressBar {
    constructor(game,hud,title,x,y) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.hud = hud;

        this.valuePercent = 0;
        this.title = title;

        this.barBitmapData = this.phaserGame.add.bitmapData(100);
        this.barBitmapData.ctx.fillStyle = '#EEEEEE';

        this.phaserGame.cache.addBitmapData('progbar', this.barBitmapData);
        this.barSprite = this.hud.group.create(
            x,
            y,
            this.phaserGame.cache.getBitmapData('progbar')
        )

        var label = new Phaser.BitmapText(
            this.game.game,
            x,
            y-15, 'pixelmix_8',
            this.title,
            5,
        );
        label.tint = 0x948f9c;
        this.hud.group.add(label)

        this.amountDisplay = new Phaser.BitmapText(
            this.game.game,
            x+100,
            label.y, 'pixelmix_8',
            '',
            5
        );
        this.amountDisplay.tint = 0xFFFFFF;
        this.amountDisplay.anchor.set(1,0);
        this.hud.group.add(this.amountDisplay)
        
    }
    update(){
        this.barBitmapData.clear();
        this.barBitmapData.ctx.fillStyle = '#504d54';
        this.barBitmapData.rect(0,0,100,10);

        this.barBitmapData.ctx.fillStyle = '#EEEEEE';
        this.barBitmapData.rect(0,0,this.valuePercent,10);

        this.amountDisplay.setText(this.valuePercent+"%");

        this.barBitmapData.dirty = true;        
    
    
    }
    
}