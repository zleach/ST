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

        this.masterAlarmSound = game.add.audio('master_alarm');
        this.titleNotificationSound = game.add.audio('title-notification');
        this.panelToggleSound = game.add.audio('panel-toggle');

        // Updaters
        game.time.events.loop(Phaser.Timer.SECOND * .35, this.slowUpdate, this);
        game.time.events.loop(Phaser.Timer.SECOND * 1, this.verySlowUpdate, this);

        // Sidebar
        this.sidebarWidth = 140;
        this.sidebar = this.group.add(new Phaser.Graphics(this.game.game,0,0));
        this.sidebar.beginFill(0x111111);
        this.sidebar.drawRect(
            x-20,
            0,
            this.sidebarWidth,
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
        this.group.add(this.navigationGroup)

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
        this.healthProgressBar = new ProgressBar(this.game,this,'HULL',x-8,y+8);
        this.fuelProgressBar = new ProgressBar(this.game,this,'FUEL',x-8,y+43);
        this.energyProgressBar = new ProgressBar(this.game,this,'ENERGY',x-8,y+78);


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

        // Cargo
        this.cargoText = {};
        var cargoHeight = 0;
        this.cargoLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            y+142,
            'pixelmix_8',
            'CARGO (kg)',
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
/*
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
*/
        var equipmentList = this.game.player.ship.equipment.concat(this.game.player.ship.weapons);        
/*
        for (let equipment of equipmentList) {
            var name = equipment.name;
            if(equipment.equipped){
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
            }
            eIndex++;
        }
*/

        // Master Alarm
        this.masterAlarmSprite = this.game.add.sprite(this.game.camera.width-200,10, 'master-alarm');
        this.masterAlarmSprite.animations.add('blink');    
        this.masterAlarmSprite.animations.play('blink', 5, true);
        this.masterAlarmSprite.visible = false;
        this.masterAlarmSprite.inputEnabled = true;
        this.masterAlarmSprite.events.onInputUp.add(this.masterAlarmClicked, this);
        this.group.add(this.masterAlarmSprite);

        // O2
        this.o2gauge = this.game.add.group();
        this.group.add(this.o2gauge);
        
        this.o2gaugeBg = this.game.add.sprite(0,0, 'oxygen-gauge');
        this.o2gaugeArrow = this.game.add.sprite(0,0, 'gauge-arrow');
        this.group.add(this.o2gaugeBg);
        this.group.add(this.o2gaugeArrow);
        
        this.o2gaugeBg.x = 32 - 100
        this.o2gaugeArrow.x = this.o2gaugeBg.x + 8;
        this.o2gaugeBg.y = this.game.camera.height - this.o2gaugeBg.height - 100;
        this.o2gaugeArrow.y = this.o2gaugeBg.y + 29;

        // FTL
        this.ftlPanel = this.game.add.group();
        this.group.add(this.ftlPanel);
        this.ftlPanelBg = this.game.add.sprite(0,0, 'ftl-panel');
        this.ftlPanel.add(this.ftlPanelBg);

        this.ftlPanelText = new Phaser.BitmapText(
            this.game.game, 
            25,
            17,
            'pixelmix_8_leaded',
            '',
            5
        );
        this.ftlPanelText.tint = 0x15ae5c;
        this.ftlPanel.add(this.ftlPanelText);

        this.ftlPanelStatusText = new Phaser.BitmapText(
            this.game.game, 
            132,
            17,
            'pixelmix_8_leaded',
            '',
            5
        );
        
        this.ftlPanelStatusText.tint = 0x15ae5c;
        this.ftlPanel.add(this.ftlPanelStatusText);
        this.ftlPanelStatusBlink = game.add.tween(this.ftlPanelStatusText).to(
            { alpha:0 }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, -1)
        this.ftlPanelHelpText = new Phaser.BitmapText(
            this.game.game, 
            18,
            135,
            'pixelmix_8',
            '(H) Hide',
            5
        );
        this.ftlPanel.add(this.ftlPanelHelpText);

        this.ftlPanelX = this.game.camera.width-150-this.ftlPanelBg.width;
        this.ftlPanelY = this.game.camera.height-this.ftlPanelBg.height-10+200;
        
        this.ftlPanel.y = this.ftlPanelY;
        this.ftlPanel.x = this.ftlPanelX;

        // Storage
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            if(this.equipmentText[key]){
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
            }
        }.bind(this));


        // MESSAGES
        // Title
        this.message__title = this.game.add.text(
            0,0,
            '', 
            { font: `16px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.message__title.alpha = 0;
        this.group.add(this.message__title)
        
        // Subtitle
        this.message__subTitle = this.game.add.text(
            0,0, 
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


        // Blinky
        this.blinkyMessageText = this.game.add.text(
            this.game.camera.width/2,
            this.game.camera.height-70, 
            '', 
            { font: `18px ${FONT}`, fill: "#FFFFFF", align: 'center' }, 
        );
        this.blinkyMessageText.anchor.x = .5;
        this.blinkyMessageText.fixedToCamera = true;
        this.blinkyMessageText.tint = 0xe74c3c;

        this.verySlowUpdate();
        this.slowUpdate();
    }
    
    title(message,submessage){
        this.titleNotificationSound.play();

        var delay = 2000;        
        
        this.message__title.x = 32;
        this.message__title.y = this.game.camera.height-50;
        this.message__subTitle.x = 32;
        this.message__subTitle.y = this.game.camera.height-25;
        
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
            (this.game.camera.width/2)-50,
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
        this.blinkyMessageText.setText(message);
            
        var blink = this.game.add.tween(this.blinkyMessageText).to({
            alpha: .5,
        }, 300, "Quart.easeOut", true, 0, 0, true).loop(true);
    }
    
    updateNavigationDisplay(){
        if(this.navDestDisplay!=undefined){
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
                }
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
    
    showSystemInfo(){
        this.title(`${this.game.system.name} System`,moment(this.game.starDate).format('MMMM Do YYYY, HH:mm'));
    }
    
    set masterAlarm(alarm){
        this.masterAlarmSprite.visible = alarm;
        if(alarm){
            this.masterAlarmSound.loopFull();
        } else {
            this.masterAlarmSound.stop();            
        }
    }
    
    masterAlarmClicked(){
        this.masterAlarm = false;
    }
    
    showO2Panel(){
        this.masterAlarm = true;
        game.add.tween(this.o2gaugeBg).to( {x: '+100'}, 600, "Quart.easeOut", true);
        game.add.tween(this.o2gaugeArrow).to( {x: '+100'}, 600, "Quart.easeOut", true);        
    }
    
    set o2Percent(o2){
        this.o2gaugeArrow.y = (this.o2gaugeBg.y + 29) - (107*o2) + 107;
    }
    
    toggleFTLPanel(){
        if(this.ftlPanel.y == this.ftlPanelY){
            this.showFTLPanel();
        } else {
            this.hideFTLPanel();
        }
    }
    
    showFTLPanel(){
        this.updateFTLPanel(true);
        if(this.ftlPanel.y == this.ftlPanelY){
            this.panelToggleSound.play();
            this.ftlPanel.visible = true;
            var showPanelTween = game.add.tween(this.ftlPanel).to( {y: '-200'}, 400, "Quart.easeOut", true);
        }
    }

    hideFTLPanel(){
        this.updateFTLPanel(true);
        if(this.ftlPanel.y == this.ftlPanelY-200){
            this.panelToggleSound.play();
            var hidePanelTween = game.add.tween(this.ftlPanel).to( {y: '+200'}, 400, "Quart.easeOut", true);
            hidePanelTween.onComplete.add(function(){
                this.ftlPanel.visible = false;
            }, this);
        }
    }
    
    abortFTL(){
        if(this.game.mapScreen.map.currentPath){
            this.panelToggleSound.play();
            this.game.mapScreen.map.currentPath = false;
            this.game.mapScreen.map.navigationDestination = null;
            this.updateFTLPanel(true);
        }
    }
        
    updateFTLPanel(force){
        if(this.ftlPanel.y == this.ftlPanelY-200 || force){ // If is showing
            var panelText = '';
            var path = this.game.mapScreen.map.currentPath
            if(!this.game.mapScreen.map.navigationDestination) path = false;
                if(path.length>0 || path!=false){
                    if(path.length==2) {
                        var destination = path[path.length-1];
                        var destinationName = destination.name.substring(0,12);
                        var formattedDistance = numeral(this.game.system.distanceToStarSystem(destination)*PIXEL_TO_LIGHTYEAR).format('0,0.0a');                    
                        panelText = `FTL DRIVE\nDESTINATION\n${destinationName} (${formattedDistance} ly)\n\nPRESS J TO JUMP`;
                    } else {
                        panelText = 'FTL DRIVE\nCOURSE SET\n';
                        for (var i = 0; i < path.length; i++) {
                            var system;
                            if(path[i+1]!=undefined) {
                                system = path[i+1];
                            } else {
                                system = false;
                            }
                            if(i<4 && system){
                                panelText += `${i+1}. ${system.name.substring(0,18)}\n`;                            
                            }
                            if(i==5){
                                panelText += `... ${path.length-i} more`;                            
                            }
                        }
                    }

                    this.ftlPanelHelpText.setText('(J) Jump  (A) Abort  (H) Hide')
                } else {
                    panelText = 'FTL DRIVE\n';
                    panelText += `NO DESTINATION\n\nPRESS M TO VIEW MAP`;

                    this.ftlPanelHelpText.setText('(H) Hide')
                }
            this.ftlPanelText.setText(panelText);
            this.ftlPanelStatusText.setText('JUMPS (3/3)');
            this.ftlPanelStatusText.x = 101;
        }
    }

    slowUpdate(){
        this.minimap.update();
    }

    verySlowUpdate(){
        // Credits
        this.creditsText.setText(`${this.game.player.credits}`);

        // Cargo
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            var usedSpace = this.game.player.ship.usedSpaceForStorageClass(key);
            var maxSpace = this.game.player.ship.maxSpaceForStorageClass(key);
            this.cargoText[key].setText(`${usedSpace}/${maxSpace}`);
        }.bind(this));

        // FTL
        this.updateFTLPanel();
    
        // System
        this.systemLabel.setText(this.game.system.name);        
    }
    
    update() {
        // Navigation
        this.updateNavigationDisplay();

        // EFI
        if(this.healthValue_cache!=this.game.player.ship.health || this.healthMaxValue_cache!=this.game.player.ship.maxHealth){
            this.healthProgressBar.value = this.game.player.ship.health;
            this.healthProgressBar.max = this.game.player.ship.maxHealth;
        }
        this.healthValue_cache = this.healthProgressBar.value
        this.healthMaxValue_cache = this.healthProgressBar.max

        
        if(this.fuelPercentage_cache!=this.game.player.ship.fuelPercentage)
            this.fuelProgressBar.valuePercent = this.game.player.ship.fuelPercentage;
        
        if(this.energyPercentage_cache!=this.game.player.ship.energyPercentage)        
            this.energyProgressBar.valuePercent = this.game.player.ship.energyPercentage;
        
        this.fuelPercentage_cache = this.fuelProgressBar.valuePercent;
        this.energyPercentage_cache = this.energyProgressBar.valuePercent;

        // O2
        this.o2Percent = this.game.player.ship.o2Percent;
    }
}
