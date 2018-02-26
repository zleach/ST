class Notification extends Phaser.Group {
    constructor(game) {
        super(game.game);
        this.phaserGame = game.game;
        game.notificationGroup.add(this)
        
        this.sound = game.add.audio('success');

        this.buttonTextStyle = {font: `12px ${FONT}`, fill: '#FFFFFF', align: 'center'};

        this.bg2 = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
                
        this.label = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.label.resolution = 2;

        this.subLabel = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.subLabel.resolution = 2;

        this.accessoryLabel = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.accessoryLabel.resolution = 2;

        this._text = '';
        this._subText = '';
        this._accessoryText = '';
        this._color = 0x4d4b56;

        this.notificationWidth = 250;
        this.notificationHeight = 50;
        this.lineHeight = 3;
        this.padding = 8;

        this._notificationX = (this.game.camera.width/2)-(this.notificationWidth/2);
        this._notificationY = 0;
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

    set accessoryText(accessoryText){
        this._accessoryText = accessoryText;
        this.layout();
    }
    
    get accessoryText(){
        return this._accessoryText;
    }

    show(){
        var delay = 3000;
        
        var fadeIn = this.game.add.tween(this).to( { alpha: 1 }, 300, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(this).to( { y: '+'+this.notificationHeight/2 }, 300, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(this).to( { alpha: 0 }, 300, "Quart.easeOut", false, delay);
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 5, this.destroy, this);
        
        this.sound.play();
    }

    destroyObject(){
        this.destroy();        
    } 

    layout(){
        this.bg2.clear();
        this.bg2.beginFill(0x948f9c);
        this.bg2.drawRoundedRect(this._notificationX-1,this._notificationY-1,
            this.notificationWidth+2,
            this.notificationHeight+2,
            5
        )
        this.bg2.endFill();  

        this.bg.clear();
        this.bg.beginFill(this._color);
        this.bg.drawRoundedRect(this._notificationX,this._notificationY,
            this.notificationWidth,
            this.notificationHeight,
            5
        )
        this.bg.endFill();  

        this.label.x = this._notificationX+this.padding;
        this.label.y = this._notificationY+this.padding;
        this.label.setStyle({ font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.label.setText(this.text);
        this.label.anchor.set(0);

        this.subLabel.x = this._notificationX+this.padding;
        this.subLabel.y = this._notificationY+this.padding+20;
        this.subLabel.setStyle({ font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.subLabel.setText(this.subText);
        this.subLabel.anchor.set(0);

        this.accessoryLabel.x = this._notificationX + this.notificationWidth - this.padding;
        this.accessoryLabel.y = this._notificationY + 3 + this.notificationHeight/2;
        this.accessoryLabel.setStyle({ font: `15px ${FONT}`, fill: '#FFFFFF', align: 'right'})
        this.accessoryLabel.setText(this.accessoryText);
        this.accessoryLabel.anchor.set(1,.5);

    }
}