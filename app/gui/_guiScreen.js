class GuiScreen {
    constructor(game,group) {                
        this.game = game;
        this.screen = this.game.add.group();
    
        this.screen.visible = false;
        this.parentScreen = null;

        this.fontFamily = FONT;
        this.fontFamilyLarge = FONT;
        this.fontSizeOffset = 0;
        this.textResolution = 2;
        
        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom; // Default
        
        this.styles = {
            borderRadius: 5,
            darkGrey: 0x282731,
            midGrey: 0x3f3c46,
            lightGrey: 0x4d4b56,
            veryLightGrey : 0x948f9c,
            red: 0xc03b2b,
            green: 0x1aae5c,
            baseText : { font: `${15+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
            smallWhiteText : { font: `${15+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
            smallGreyText : { font: `italic ${13+this.fontSizeOffset}px ${this.fontFamilyLarge}`, fill: '#948f9c', align: 'left'},
            title : { font: `${18}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
        }
    }
    
    // Showing
    show(){
        this.previousControlMode = this.game.player.controlMode;
        this.screen.visible = true;

        switch(this.transitionStyle) {
            case SCREEN_TRANSITION_STYLE.fromBottom:
                this.screen.y = this.game.camera.height;
                var transition = this.game.add.tween(this.screen.position).to({y: 0}, 600, Phaser.Easing.Back.InOut, true);
                break;
            case SCREEN_TRANSITION_STYLE.fromRight:
                this.screen.x = this.game.camera.width;
                var transition = this.game.add.tween(this.screen.position).to({x: 0}, 600, "Quart.easeOut", true);
                break;
            default:
                // None
        }
        if(transition!=undefined) transition.onComplete.add(this.didShow, this);
    }

    didShow(){
        if(this.parentScreen) this.parentScreen.childScreenDidShow();
    }
    
    // Hiding
    hide(){
        switch(this.transitionStyle) {
            case SCREEN_TRANSITION_STYLE.fromBottom:
                var transition = this.game.add.tween(this.screen.position).to({y: this.game.camera.height}, 600, Phaser.Easing.Back.InOut, true);
                break;
            case SCREEN_TRANSITION_STYLE.fromRight:
                var transition = this.game.add.tween(this.screen.position).to({x: this.game.camera.width}, 600, "Quart.easeOut", true);
                break;
            default:
                // None
        }
        transition.onComplete.add(this.didHide, this);

        if(this.parentScreen) this.parentScreen.childScreenWillHide();
    }
 
    didHide(){
        this.screen.visible = false;        
        this.game.player.controlMode = this.previousControlMode;
        
        this.cleanup();

        if(this.parentScreen) this.parentScreen.childScreenDidHide();
    }
    
    cleanup(){
        
    }
    
    childScreenDidHide(){
        
    }

    childScreenWillHide(){
        
    }

    childScreenWillShow(){
        
    }

    childScreenDidShow(){
        
    }

    update(){

    }

}