class Button extends Phaser.Group {
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

        this.subLabel = this.phaserGame.add.text(
            0,0, 
            this._subText, 
            this.buttonTextStyle,
            this
        )
        this.subLabel.resolution = 2;
        this.subLabel.anchor.set(0.5)

        this._text = '';
        this._subText = '';
        this._buttonX = 0;
        this._buttonY = 0;
        this._color = 0x4d4b56;

        this.buttonWidth = 100;
        this.buttonHeight = 27;
        this.lineHeight = 3;
        this.padding = 8;

        this.key = 'button_'+key;

        this.buttonTextStyle = textStyle || { font: `12px ${FONT}`, fill: '#FFFFFF', align: 'center'};

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

    set subText(subText){
        this._subText = subText;
        this.layout();
    }
    
    get subText(){
        return this._subText;
    }

    set color(color){
        this._color = color;
        this.layout();
    }
    
    get color(){
        return this._color;
    }
        
    layout(){
        this.bg.clear();
        if(this.over){
            var c = tinycolor(this._color.toString(16)).darken().toHex();
            this.bg.beginFill(parseInt(c,16));
        } else {
            this.bg.beginFill(this.color);
        }
        this.bg.drawRoundedRect(this.buttonX,this.buttonY,
            this.buttonWidth,
            this.buttonHeight,
            5
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