class FuelTanker extends Ship {
    constructor(game) {
        super(game);
                
        this.specs = {
            name : 'USS Ajax',
            description : 'Fuel Tanker',
            turnDecay: .4,
            turnAccel: .8,
            maxTurning: 30,
            maxFuel : 12200,
            maxEnergy: 100,
            equipmentSlots : 4,
            centerOfGravity : {
                x : .5,
                y : .6,
            },
            size : {
                width : 80,
                height : 100,
                offsetX : 10,
                offsetY : 20,
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
                    x: 4,
                    y: .49
                },
                angle : 0,
            }],
            dockingPorts : [{
                position : {
                    x: 16,
                    y: -31,
                    angle : 90,
                },
                inUse: false,
            }],
            canBeDockedTo: true,
        }
    
        // Sprites
        this.sprite = this.game.add.sprite(this.game.world.centerX,this.game.world.centerX, 'fuelTanker');
        this.sprite.anchor.set(this.specs.centerOfGravity.x,this.specs.centerOfGravity.y);

        this.setupSprite(this.sprite);

        // Engine
        var engine = new BasicEngine(this.game,this);
        this.equipEngineInSlot(engine,0);
        this.refuel();

        // Reactor
        var reactor = new Reactor(this.game,this);
        this.equipEquipmentInSlot(reactor,0);
        this.recharge();
    }
}
