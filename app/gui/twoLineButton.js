class TwoLineButton extends Button {
    constructor(game,key,callbacks,textStyle = null) {        
        super(game,key,callbacks,textStyle);
        this.buttonHeight = 50;
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
        
        this.label.x = this.buttonX+this.padding;
        this.label.y = this.buttonY+this.padding;
        this.label.setStyle({ font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.label.setText(this.text);
        this.label.anchor.set(0);

        this.subLabel.x = this.buttonX+this.padding;
        this.subLabel.y = this.buttonY+this.buttonHeight/2+this.lineHeight
        this.subLabel.setStyle({ font: `11px ${FONT}`, fill: '#948f9c', align: 'left'})
        this.subLabel.setText(this.subText);
        this.subLabel.anchor.set(0);
    }
}