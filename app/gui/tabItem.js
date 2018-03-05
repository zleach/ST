class TabItem extends Phaser.Group {
    constructor(game,key,callbacks,textStyle = null) {
        super(game.game);
        this.phaserGame = game.game;
        this.callbacks = callbacks;
            
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.label = this.phaserGame.add.text(
            0,0, 
            this._text, 
            this.buttonTextStyle,
            this
        )
        this.label.resolution = 2;
        this.label.anchor.set(0.5)

        this._text = '';
        this._active = false;
        this._buttonX = 0;
        this._buttonY = 0;
        this.color = 0x282731;
        this.activeColor = 0x3F3C46;

        this.buttonWidth = 100;
        this.buttonHeight = 45;
        this.lineHeight = 3;
        this.padding = 8;

        this.key = 'tab_item'+key;

        this.buttonTextStyle = textStyle || { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'center'};

        this.sprite = this.create(this.buttonX,this.buttonY,'null') 
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputUp.add(this.onReleased, this);
        this.sprite.events.onInputDown.add(this.onDown, this);
        this.sprite.events.onInputOver.add(this.onOver, this);
        this.sprite.events.onInputOut.add(this.onOut, this);
    }
    
    onOver(){
        this.over = true;   
        this.layout();
    }

    onOut(){
        this.over = false;
        this.layout();
    }
    
    onDown() {
        if(this.callbacks.onDown) this.callbacks.onDown(this);
    }

    onReleased() {
        if(this.callbacks.onReleased) this.callbacks.onReleased(this);
    }
    
    set buttonX(x){
        this._buttonX = x
        this.layout();
    }

    set buttonY(y){
        this._buttonY = y
        this.layout();
    }

    get buttonX(){
        return this._buttonX;
    }

    get buttonY(){
        return this._buttonY;
    }

    set text(text){
        this._text = text;
        this.layout();
    }
    
    get text(){
        return this._text;
    }

    set active(active){
        this._active = active;
        this.layout();
    }
    
    get active(){
        return this._active;
    }
        
    layout(){
        this.bg.clear();
        if(!this.active){
            if(this.over){
                this.bg.beginFill(this.activeColor);
            } else {
                this.bg.beginFill(this.color);
            }            
        } else {
            this.bg.beginFill(this.activeColor);
        }

        this.bg.drawRect(this.buttonX,this.buttonY,
            this.buttonWidth,
            this.buttonHeight,
        )
        this.bg.endFill();  

        this.sprite.width = this.buttonWidth;
        this.sprite.height = this.buttonHeight;
        this.sprite.x = this.buttonX;
        this.sprite.y = this.buttonY;
        
        this.label.x = this.buttonX+this.buttonWidth/2;
        this.label.y = this.buttonY+this.buttonHeight/2+this.lineHeight
        this.label.setStyle(this.buttonTextStyle)
        this.label.setText(this.text);
    }
}