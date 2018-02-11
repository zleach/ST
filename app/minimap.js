class Minimap {
    constructor(game,hud) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.hud = hud;
        this.defaultScale = .03;
        this.scale = this.defaultScale;
        this.distanceFactor = 45;
            
        this.background = this.hud.group.create(32,32,'minimap-bg')
        this.background.tint = 0x504d54;

        this.dotsBitmapData = this.phaserGame.add.bitmapData(100);
        this.dotsBitmapData.ctx.fillStyle = '#EEEEEE';
        
        this.phaserGame.cache.addBitmapData('minimap-display', this.dotsBitmapData);
        this.mapDots = this.hud.group.create(
            this.background.x,
            this.background.y,
            this.phaserGame.cache.getBitmapData('minimap-display')
        )
    }
    update(){
        this.dotsBitmapData.clear();
        this.game.gameObjects.forEach(function(gameObject) {
                if(gameObject.sprite!=undefined){
                    var distance = this.game.physics.arcade.distanceBetween(gameObject.sprite, this.game.player.sprite);
                    if(distance<(this.distanceFactor/this.scale)){
                        var x = ((gameObject.sprite.x-this.game.player.ship.sprite.x)*this.scale)+50;
                        var y = ((gameObject.sprite.y-this.game.player.ship.sprite.y)*this.scale)+50;
                        var size = 1; // Default dot size
                        if(gameObject.minimapSize!=undefined){
                            size = gameObject.minimapSize;
                        }
                                                
                        this.dotsBitmapData.circle(x,y,size);
                    }
                    //this.dotsBitmapData.rect(0,0,100,100);
                }
        }.bind(this));
        this.dotsBitmapData.dirty = true;        
    }
    
}