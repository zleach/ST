class FuelTanker extends Ship {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'AOG Belvidera',
            description : 'Fuel Tanker',
            health : 100,
            turnDecay: .005,
            turnAccel: .007,
            leftRightThrust: 100,
            maxTurning: 10,
            reverseThrust: 40,
            maxReverse: 60,
            maxFuel : 9000,
            maxEnergy: 150,
            mass: 10, // Tons
            equipmentSlots : 4,
            centerOfGravity : {
                x : .5,
                y : .5,
            },
            polygon: [
                {
                    "shape": [ 51,54, 37,53, 36,32, 86,32, 87,54 ]
                },
                {
                    "shape": [ 36,32, 37,53, 0,54, 0,32 ]
                },
                {
                    "shape": [ 36,93, 37,53, 51,54, 52,93 ]
                },
                {
                    "shape": [ 37,27, 51,32, 36,32 ]
                },
                {
                    "shape": [ 35,5, 50,27, 51,32, 37,27 ]
                },
                {
                    "shape": [ 46,1, 51.83333206176758,4.333335876464844, 50,27, 35,5, 40,1 ]
                }
            ],
            size : {
                width : 45,
                height : 45,
                offsetX : 3,
                offsetY : -8,
            },
            weaponSlots : [
                {
                    position : {
                        x: 0,
                        y: 0
                    },
                    typesAllowed: [WEAPON_TYPES.miningLaser],
                },
                {
                    position : {
                        x: 9,
                        y: -22
                    },
                    typesAllowed: [WEAPON_TYPES.miningLaser],
                }
            ],
            engineSlots : [{
                anchor : {
                    x: 0.55,
                    y: -2.8
                },
                angle : 0,
            }],
            RCS :{
                forward_left : {
                    x: 35,
                    y: 16,
                    angle : 90,
                },
                forward_right : {
                    x: 52,
                    y: 22,
                    angle : 270,                    
                },
                aft_left : {
                    x: 35,
                    y : 71,
                    angle : 90,
                },
                aft_right : {
                    x: 52,
                    y: 76,
                    angle : 270,                    
                },
                retro_a : {
                    x: 41,
                    y: 3,
                    angle : 180,
                    retro : true,                   
                },
                retro_b : {
                    x: 51,
                    y: 3,
                    angle : 180,
                    retro : true,                   
                },
            },
            storage : {
                bulk : 300,
                passengers : 2,
                gas : 0,
                liquid : 0,
            },
            dockingPorts : [{
                position : {
                    x: 0,
                    y: -47,
                    angle : 90,
                },
                inUse: false,
            }],
            dockingConnector : {
                position : {
                    x: 0,
                    y: -50,
                    angle : 90,
                },
                inUse: false,
            },
            canBeDockedTo: true,
        }

        // Sprites
        this.sprite = this.game.add.sprite(x,y, 'fuelTanker2');
        this.sprite.anchor.set(this.specs.centerOfGravity.x,this.specs.centerOfGravity.y);

        this.setupSprite(this.sprite);

        //var blaster = new BasicBlaster(this.game,this);
        //this.equipWeaponInSlot(blaster,1);

        // Engine
/*
        var engine = new BasicEngine(this.game,this);
        this.equipEngineInSlot(engine,0);
        this.refuel();

        // Reactor
        var reactor = new Reactor(this.game,this);
        this.equipEquipmentInSlot(reactor,0);
        this.recharge();
*/
        
        // Cargo
        this.emptyCargoHold();
    }
}
