class Minimap {
    constructor(game,hud) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.size = 116;
        this.width = this.size;
        this.height = this.size;
        this.x = this.game.camera.width - 128;
        this.y = 30;
        
        this.hud = hud;
        this.defaultScale = .03;
        this.scale = this.defaultScale;
        this.distanceFactor = 55;
            
        this.background = this.hud.group.create(this.x,this.y,'minimap-bg')
        this.background.width = this.size;
        this.background.height = this.size;
        this.background.tint = 0x1A1A1A;

        this.dotsBitmapData = this.phaserGame.add.bitmapData(this.width);
        
        this.phaserGame.cache.addBitmapData('minimap-display', this.dotsBitmapData);
        this.mapDots = this.hud.group.create(
            this.background.x,
            this.background.y,
            this.phaserGame.cache.getBitmapData('minimap-display')
        )
    }
    update(){
        this.dotsBitmapData.clear();
        this.game.system.stellarObjects.forEach(this.drawDotsForGameObject,this);
        this.game.system.planets.forEach(this.drawDotsForGameObject,this);
        this.dotsBitmapData.dirty = true;        
    }
    
    drawDotsForGameObject(gameObject){
        if(gameObject.sprite!=undefined){
            var distance = this.game.physics.arcade.distanceBetween(gameObject.sprite, this.game.player.sprite);
            if(distance<(this.distanceFactor/this.scale)){
                var x = ((gameObject.sprite.x-this.game.player.ship.sprite.x)*this.scale)+this.size/2;
                var y = ((gameObject.sprite.y-this.game.player.ship.sprite.y)*this.scale)+this.size/2;
                var size = 1; // Default dot size
                if(gameObject.minimapSize!=undefined){
                    size = gameObject.minimapSize;
                }
                var a = Math.abs(distance*(this.distanceFactor/100000)-1)+.1
                
                if(this.game.player.ship.navigationTarget == gameObject){
                    this.dotsBitmapData.circle(x,y,size+3,`rgba(255,255,255,${a})`);                            
                    this.dotsBitmapData.circle(x,y,size+2,`#3f3c46`);                            
                    this.dotsBitmapData.circle(x,y,size,`rgba(255,255,255,${a})`);                            
                } else {
                    this.dotsBitmapData.circle(x,y,size,`rgba(255,255,255,${a})`);                            
                }
                
                // Player
                this.dotsBitmapData.circle(this.size/2,this.size/2,1,`rgba(255,255,255,1)`);                            
            }
        }
    }
    
}