class HUD {
    constructor(game) {
        this.game = game;
        this.group = game.add.group();
        this.group.fixedToCamera = true;
        var x = this.game.camera.width-132;
        var y = 160

        this.background = this.group.add(new Phaser.Graphics(this.game.game,0,0));
        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,24,120,200,5)
        this.background.endFill();

        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,232,120,28,5)
        this.background.endFill();

        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,268,120,52,5)
        this.background.endFill();

        this.background.alpha = .05;
    
        // HUD Elements        
        this.minimap = new Minimap(this.game,this);

        this.fuelProgressBar = new ProgressBar(this.game,this,'FUEL',x,y);
        this.game.register(this.fuelProgressBar)

        this.energyProgressBar = new ProgressBar(this.game,this,'ENERGY',x,y+43);
        this.game.register(this.energyProgressBar)

        // Credits
        this.creditsText = new Phaser.BitmapText(
            this.game.game, 
            x+100,
            y+82,
            'pixelmix_normal',
            '',
            8
        );  
        this.group.add(this.creditsText);
        this.creditsText.anchor.set(1,0);

        this.creditsLabel = new Phaser.BitmapText(
            this.game.game, 
            x,
            this.creditsText.y,
            'pixelmix_normal',
            CREDIT_PREFIX.long.toUpperCase(),
            8
        );  
        this.creditsLabel.tint = 0x948f9c;
        this.group.add(this.creditsLabel)

        // Cargo
        this.cargoText = new Phaser.BitmapText(
            this.game.game, 
            x+100,
            y+138,
            'pixelmix_normal',
            '0',
            8
        );
        this.group.add(this.cargoText);
        this.cargoText.anchor.set(1,0);

        this.bulkText = new Phaser.BitmapText(
            this.game.game, 
            x,
            y+138,
            'pixelmix_normal',
            'BULK',
            8
        );
        this.group.add(this.bulkText);


        this.cargoLabel = new Phaser.BitmapText(
            this.game.game, 
            x,
            y+118,
            'pixelmix_normal',
            'CARGO HOLD USAGE',
            8
        );  
        this.cargoLabel.tint = 0x948f9c;
        this.group.add(this.cargoLabel)

    }
    
    title(message,submessage){
        var delay = 2000;
        
        var messageText = new Phaser.BitmapText(this.game.game, 32, this.game.camera.height-50, 'pixelmix_normal2x',message,8);  
        messageText.alpha = 0;      
        this.group.add(messageText)

        var submessageText = new Phaser.BitmapText(this.game.game, 32, this.game.camera.height-25, 'pixelmix_normal2x',submessage,6);        
        submessageText.alpha = 0;      
        this.group.add(submessageText)
            
        var fadeIn1 = this.game.add.tween(messageText).to( { alpha: 1 }, 1000, "Quart.easeOut", false);
    	var moveUp1 = this.game.add.tween(messageText).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut1 = this.game.add.tween(messageText).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay);
        fadeIn1.chain(fadeOut1);
        fadeIn1.start();

        var submessageDelay = 300;
        var fadeIn2 = this.game.add.tween(submessageText).to( { alpha: 1 }, 1000, "Quart.easeOut", false, submessageDelay);
    	var moveUp2 = this.game.add.tween(submessageText).to( { y: '-30' }, 300, "Quart.easeOut", true, submessageDelay);
        var fadeOut2 = this.game.add.tween(submessageText).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay-submessageDelay);    
        fadeIn2.chain(fadeOut2);
        fadeIn2.start();
    }
    message(message){
        var delay = 2000;
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-100, 
            'pixelmix_normal',
            message,
            12
        );
        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.alpha = 0;
    
        var fadeIn = this.game.add.tween(messageText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(messageText).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(messageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, delay);
    
        fadeIn.chain(fadeOut);
        fadeIn.start();
    }

    warning(message){
        var delay = 2000;
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-100, 
            'pixelmix_normal',
            message,
            12
        );
        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
        messageText.alpha = 0;
    
        var fadeIn = this.game.add.tween(messageText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(messageText).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(messageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, delay);
    
        fadeIn.chain(fadeOut);
        fadeIn.start();
    }
    blinkingWarning(message){
        var delay = 2000;
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-70, 
            'pixelmix_normal',
            message,
            12
        );
        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
            
        var blink = this.game.add.tween(messageText).to({
            alpha: .5,
        }, 300, "Quart.easeOut", true, 0, 0, true).loop(true);
    }
    
    update() {
        this.minimap.update();
        this.fuelProgressBar.valuePercent = this.game.player.ship.fuelPercentage;
        this.energyProgressBar.valuePercent = this.game.player.ship.energyPercentage;
        
        this.creditsText.setText(`${this.game.player.credits}`);
        
        this.cargoText.setText(`${this.game.player.ship.bulkUsedSpace}/${this.game.player.ship.bulkMaxSpace}`);
    }
}
