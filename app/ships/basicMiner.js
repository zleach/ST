class BasicMiner extends Ship {
    constructor(game) {
        super(game);
        
        this.specs = {
            name : 'MV Fair Rosamond',
            description : 'Cobalt Class Mining Vessel',
            turnDecay: 15,
            turnAccel: 30,
            maxTurning: 150,
            maxFuel : 2200,
            maxEnergy: 100,
            equipmentSlots : 4,
            centerOfGravity : {
                x : .5,
                y : .5,
            },
            size : {
                width : 45,
                height : 45,
                offsetX : 3,
                offsetY : -8,
            },
            dockingConnectorPosition : {
                x : -10,
                y : 20,
            },
            weaponSlots : [
                {
                    position : {
                        x: 40,
                        y: 10
                    },
                    typesAllowed: [WEAPON_TYPES.miningLaser],
                },
                {
                    position : {
                        x: 23,
                        y: -10
                    },
                    typesAllowed: [WEAPON_TYPES.miningLaser],
                }
            ],
            engineSlots : [{
                anchor : {
                    x: 2.45,
                    y: 0.53
                },
                angle : 0,
            }],
            storage : {
                bulk : 300,
                passengers : 2,
                gas : 0,
                liquid : 0,
            }
        }

        // Sprites
        this.sprite = this.game.add.sprite(this.game.world.centerX,this.game.world.centerX, 'mining_ship');
        this.sprite.anchor.set(this.specs.centerOfGravity.x,this.specs.centerOfGravity.y);

        this.setupSprite(this.sprite);

        // Weapons
        var miningLaser = new BasicMiningLaser(this.game,this);
        this.equipWeaponInSlot(miningLaser,1);

        //var blaster = new BasicBlaster(this.game,this);
        //this.equipWeaponInSlot(blaster,1);

        // Engine
        var engine = new BasicEngine(this.game,this);
        this.equipEngineInSlot(engine,0);
        this.refuel();

        // Reactor
        var reactor = new Reactor(this.game,this);
        this.equipEquipmentInSlot(reactor,0);
        this.recharge();
        
        // Cargo
        this.emptyCargoHold();
    }
}
