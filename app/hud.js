class HUD {
    constructor(game) {
        this.game = game;
        this.group = this.game.hudGroup;
        this.group.fixedToCamera = true;
        var x = this.game.camera.width - 120;
        var y = 160;
        var lineHeight = 12;
        var padding = 8;
        var width = 100;
        var borderRadius = 5;
        var backgroundColor = 0x3f3c46;
        this.background = this.group.add(new Phaser.Graphics(this.game.game,0,0));


        this.sidebar = this.group.add(new Phaser.Graphics(this.game.game,0,0));
        this.sidebar.beginFill(0x111111);
        this.sidebar.drawRect(
            x-20,
            0,
            200,
            this.game.camera.height,
            
        )
        this.sidebar.endFill();

        // Date
        this.stardateLabel = new Phaser.BitmapText(
            this.game.game, 
            this.game.camera.width-8,
            10,
            'pixelmix_8',
            this.game.starDate,
            5
        );
        this.stardateLabel.anchor.set(1,0);
        this.stardateLabel.tint = 0x948f9c;
        this.group.add(this.stardateLabel)

        // System 
        this.systemLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            10,
            'pixelmix_8',
            `${this.game.system.name}`,
            5
        );
        this.systemLabel.anchor.set(0,0);
        this.group.add(this.systemLabel)

        // Minimap        
        this.minimap = new Minimap(this.game,this);
        
        // Navigation
        this.navigationGroup = this.game.add.group()
/*
        this.navBackground = this.navigationGroup.add(new Phaser.Graphics(this.game.game,0,0));
        this.navBackground.beginFill(backgroundColor);
        this.navBackground.drawRoundedRect(
            20,
            20,
            this.minimap.width,
            53,
            borderRadius
        )
        this.background.endFill();
*/
        this.group.add(this.navigationGroup)
        
/*
        this.navLabel = new Phaser.BitmapText(
            this.game.game, 
            20,
            20,
            'pixelmix_8',
            'NAVIGATION',
            5
        );  
        this.navLabel.tint = 0x948f9c;
        this.navigationGroup.add(this.navLabel)
*/

        this.navDestDisplay = new Phaser.BitmapText(
            this.game.game, 
            20,
            20,
            'pixelmix_8',
            'USS Ajax (Fuel Tanker)',
            5
        );  
        this.navigationGroup.add(this.navDestDisplay)

        // ETA
        this.navETALabel = new Phaser.BitmapText(
            this.game.game, 
            20,
            34,
            'pixelmix_8',
            'ETA',
            5
        );  
        this.navETALabel.tint = 0x948f9c;
        this.navigationGroup.add(this.navETALabel)

        this.navETADisplay = new Phaser.BitmapText(
            this.game.game, 
            70,
            34,
            'pixelmix_8',
            '59:59',
            5
        );  
        this.navETADisplay.anchor.set(1,0);
        this.navigationGroup.add(this.navETADisplay)

        // Distance
        this.navDistanceLabel = new Phaser.BitmapText(
            this.game.game, 
            90,
            34,
            'pixelmix_8',
            'Dist.',
            5
        );  
        this.navDistanceLabel.tint = 0x948f9c;
        this.navigationGroup.add(this.navDistanceLabel)

        this.navDistanceDisplay = new Phaser.BitmapText(
            this.game.game, 
            120,
            34,
            'pixelmix_8',
            '9999m',
            5
        );  
        this.navDistanceDisplay.anchor.set(0,0);
        this.navigationGroup.add(this.navDistanceDisplay)

        // EFI
        this.fuelProgressBar = new ProgressBar(this.game,this,'FUEL',x-8,y+8);
        this.game.register(this.fuelProgressBar)

        this.energyProgressBar = new ProgressBar(this.game,this,'ENERGY',x-8,y+43);
        this.game.register(this.energyProgressBar)

        // Credits
        this.creditsText = new Phaser.BitmapText(
            this.game.game, 
            x+108,
            this.energyProgressBar.y + this.energyProgressBar.height + 11,
            'pixelmix_8',
            '',
            5
        );  
        this.group.add(this.creditsText);
        this.creditsText.anchor.set(1,0);
        this.creditsLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            this.creditsText.y,
            'pixelmix_8',
            CREDIT_PREFIX.long.toUpperCase(),
            5
        );  
        this.creditsLabel.tint = 0x948f9c;
        this.group.add(this.creditsLabel)
/*
        this.background.beginFill(backgroundColor);
        this.background.drawRoundedRect(
            x-padding,
            this.creditsText.y-padding,
            width+padding*2,
            lineHeight+padding+4,
            borderRadius)
        this.background.endFill();
*/

        // Cargo
        this.cargoText = {};
        var cargoHeight = 0;
        this.cargoLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            y+105,
            'pixelmix_8',
            'CARGO',
            5
        );  
        this.cargoLabel.tint = 0x948f9c;
        this.group.add(this.cargoLabel)
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            var cargoType = this.game.player.ship.specs.storage[key];
            this.cargoText[key] = new Phaser.BitmapText(
                this.game.game, 
                x+108,
                (this.cargoLabel.y+padding)+(lineHeight*index)+padding,
                'pixelmix_8',
                '0',
                5
            );
            
            this.group.add(this.cargoText[key]);
            this.cargoText[key].anchor.set(1,0);
    
            var cargoTypeLabel = new Phaser.BitmapText(
                this.game.game, 
                x-8,
                this.cargoText[key].y,
                'pixelmix_8',
                key.charAt(0).toUpperCase() + key.slice(1),
                5
            );
            cargoTypeLabel.tint = 0x948f9c;
            this.group.add(cargoTypeLabel);
            cargoHeight = (index*lineHeight)+padding*4;
        }.bind(this));

        // Equipment
        this.equipmentText = {};
        var eIndex = 0;
        var equipmentHeight = 0;
        this.equipmentLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            this.cargoLabel.y + cargoHeight + padding,
            'pixelmix_8',
            'EQUIPMENT',
            5
        );  
        this.equipmentLabel.tint = 0x948f9c;
        this.group.add(this.equipmentLabel)
        var equipmentList = this.game.player.ship.equipment.concat(this.game.player.ship.weapons);        
        for (let equipment of equipmentList) {
            var name = equipment.name;
            if(equipment.isWeapon && equipment.equiped){
                name = `> ${name}`
            }

            var equipmentNameLabel = new Phaser.BitmapText(
                this.game.game, 
                x-8,
                (this.equipmentLabel.y+padding)+(lineHeight*eIndex)+padding,
                'pixelmix_8',
                name,
                5
            );
            this.group.add(equipmentNameLabel);
            equipmentNameLabel.anchor.set(0,0);

            var equipmentStatusLabel = new Phaser.BitmapText(
                this.game.game, 
                x+108,
                equipmentNameLabel.y,
                'pixelmix_8',
                equipment.status,
                5
            );
            equipmentStatusLabel.tint = 0x948f9c;
            this.group.add(equipmentStatusLabel);
            equipmentStatusLabel.anchor.set(1,0);


            eIndex++;
        }


/*
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            var equipmentType = this.game.player.ship.specs.storage[key];
    
            var equipmentTypeLabel = new Phaser.BitmapText(
                this.game.game, 
                x-8,
                this.equipmentText[key].y,
                'pixelmix_8',
                key.charAt(0).toUpperCase() + key.slice(1),
                5
            );
            equipmentTypeLabel.tint = 0x948f9c;
            this.group.add(equipmentTypeLabel);
            equipmentHeight = (index*lineHeight)+padding*4;
        }.bind(this));
*/


        // MESSAGES
        // Title
        this.message__title = this.game.add.text(
            32,this.game.camera.height-50, 
            '', 
            { font: `16px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.message__title.alpha = 0;
        this.group.add(this.message__title)
        
        // Subtitle
        this.message__subTitle = this.game.add.text(
            32,this.game.camera.height-25, 
            '', 
            { font: `12px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.message__subTitle.alpha = 0;
        this.group.add(this.message__subTitle)

        this.navigationArrow = this.game.make.sprite(0,0, 'nav-arrow');
        this.navigationArrow.anchor.set(-10,.5);
        this.navArrowResetPostionTween = this.game.add.tween(this.navigationArrow).to({
            angle: 0,
            x: 0,
            y: 0,
        }, 300, "Quart.easeOut", false);

        this.group.add(this.navigationArrow);

    }
    
    title(message,submessage){
        var delay = 2000;
        
        this.message__title.setText(message);
        this.message__subTitle.setText(submessage);
                    
        var fadeIn1 = this.game.add.tween(this.message__title).to( { alpha: 1 }, 1000, "Quart.easeOut", false);
    	var moveUp1 = this.game.add.tween(this.message__title).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut1 = this.game.add.tween(this.message__title).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay);
        fadeIn1.chain(fadeOut1);
        fadeIn1.start();

        var submessageDelay = 300;
        var fadeIn2 = this.game.add.tween(this.message__subTitle).to( { alpha: 1 }, 1000, "Quart.easeOut", false, submessageDelay);
    	var moveUp2 = this.game.add.tween(this.message__subTitle).to( { y: '-30' }, 300, "Quart.easeOut", true, submessageDelay);
        var fadeOut2 = this.game.add.tween(this.message__subTitle).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay-submessageDelay);    
        fadeIn2.chain(fadeOut2);
        fadeIn2.start();
    }
    message(message){
        var delay = 2000;
        var messageText = this.game.add.text(
            this.game.camera.width/2,
            this.game.camera.height-100, 
            message, 
            { font: `18px ${FONT}`, fill: "#FFFFFF", align: 'center' }, 
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
        var messageText = this.game.add.text(
            this.game.camera.width/2,
            this.game.camera.height-100, 
            message, 
            { font: `18px ${FONT}`, fill: "#FFFFFF", align: 'center' }, 
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
    blinkingWarning(message){
        var delay = 2000;
        var messageText = this.game.add.text(
            this.game.camera.width/2,
            this.game.camera.height-70, 
            message, 
            { font: `18px ${FONT}`, fill: "#FFFFFF", align: 'center' }, 
        );

        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
            
        var blink = this.game.add.tween(messageText).to({
            alpha: .5,
        }, 300, "Quart.easeOut", true, 0, 0, true).loop(true);
    }
    
    updateNavigationDisplay(){
        var player = this.game.player.ship;
        var target = player.navigationTarget;
        if(target==null){
            this.navDestDisplay.setText('Navigation Off');
            this.navigationGroup.visible = false;
            this.navigationArrow.visible = false;
        } else {
            this.navDestDisplay.setText(`> ${target.name} (${target.description})`);
            this.navETADisplay.setText(`${this.game.player.ship.formattedTimeToCurrentNavigationTarget}`);
            this.navDistanceDisplay.setText(`${this.game.player.ship.formattedDistanceToCurrentNavigationTarget}`);        
            this.navigationGroup.visible = true;
                        
            if(player.distanceToCurrentNavigationTarget>150){
                this.navigationArrow.visible = true;
                
                this.navigationArrow.angle = player.angleToCurrentNavigationTarget;
                this.navigationArrow.x = this.game.player.ship.sprite.x - this.game.camera.x;
                this.navigationArrow.y = this.game.player.ship.sprite.y - this.game.camera.y;                
            } else {
                
                this.game.add.tween(this.navigationArrow).to({
                    angle: 90,
                    x: target.sprite.x - this.game.camera.x,
                    y: ((target.sprite.y - target.sprite.height/2) - this.game.camera.y)-100,
                }, 300, "Quart.easeOut", true);
/*
                this.game.add.tween(this.navigationArrow.anchor).to({
                    x: .5,
                    y: .5,
                }, 300, "Quart.easeOut", true);
*/
                
               // this.navigationArrow.anchor.set(1,.5);
            }
        }
    }
    
    purchaseReceipt(title,message,amount){
        var notification = new Notification(this.game);
        notification.text = title;
        notification.subText = message;
        notification.accessoryText = numeral(-amount).format('$0,0[.]00');
        this.game.notificationGroup.add(notification);

        notification.show();
    }
    
    update() {
        // Date
        this.stardateLabel.setText(moment(this.game.starDate).format('MMM Do'));

        // Map
        this.minimap.update();

        // Navigation
        this.updateNavigationDisplay();
        
        // EFI
        this.fuelProgressBar.valuePercent = this.game.player.ship.fuelPercentage;
        this.energyProgressBar.valuePercent = this.game.player.ship.energyPercentage;
        
        // Credits
        this.creditsText.setText(`${this.game.player.credits}`);

        // Cargo
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            var usedSpace = this.game.player.ship.usedSpaceForStorageClass(key);
            var maxSpace = this.game.player.ship.maxSpaceForStorageClass(key);
            
            this.cargoText[key].setText(`${usedSpace}/${maxSpace}`);
        }.bind(this));

    }
}
