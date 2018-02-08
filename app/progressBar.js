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
            y-15, 'pixelmix_normal',
            this.title,
            8
        );
        label.tint = 0xFFFFFF;
        this.hud.group.add(label)

        this.amountDisplay = new Phaser.BitmapText(
            this.game.game,
            x+100,
            label.y, 'pixelmix_normal',
            '',
            8
        );
        this.amountDisplay.tint = 0x948f9c;
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