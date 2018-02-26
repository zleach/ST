class Shuttle extends Ship {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'Shuttle',
            description : 'Shuttle',
            health: 100,
            turnDecay: .03,
            turnAccel: .1,
            leftRightThrust: 100,
            maxTurning: 10,
            reverseThrust: 100,
            maxReverse: 90,
            maxFuel : 2200,
            maxEnergy: 100,
            mass: 1, // Tons
            equipmentSlots : 4,
            centerOfGravity : {
                x : .5,
                y : .5,
            },
            polygon: [
                {
                    "shape": [   8, 24  ,  19, 24  ,  18, 33  ,  9, 33  ]
                } ,
                {
                    "shape": [   27, 22  ,  19, 24  ,  8, 24  ,  0, 16  ,  7, 12  ,  21, 14  ,  27, 16  ]
                } ,
                {
                    "shape": [   0, 16  ,  8, 24  ,  0, 22  ]
                } ,
                {
                    "shape": [   7, 12  ,  12, 0  ,  17, 2  ,  21, 14  ]
                }
            ],
            weaponSlots : [],
            engineSlots : [{
                anchor : {
                    x: 0.57,
                    y: -1.6,
                },
                angle : 0,
            }],
            RCS :{
                forward_left : {
                    x: 10,
                    y: 3,
                    angle : 90,
                },
                forward_right : {
                    x: 17,
                    y: 8,
                    angle : 270,                    
                },
                aft_left : {
                    x : 8,
                    y : 25,
                    angle : 90,
                },
                aft_right : {
                    x: 19,
                    y: 31,
                    angle : 270,                    
                },
                retro_a : {
                    x: 7,
                    y: 17,
                    angle : 180,
                    retro : true,                   
                },
                retro_b : {
                    x: 25,
                    y: 17,
                    angle : 180,
                    retro : true,                   
                },
            },
            dockingConnector : {
                position : {
                    x: 0,
                    y: -18,
                    angle : 90,
                },
                inUse: false,
            },
            storage : {
                passengers : 6,
            }
        }

        // Sprites
        
        this.sprite = this.game.add.sprite(x,y, 'shuttle');
        this.sprite.anchor.set(this.specs.centerOfGravity.x,this.specs.centerOfGravity.y);

        this.setupSprite(this.sprite);

        // Engine
        var engine = new SmallEngine(this.game,this);
        this.equipEngineInSlot(engine,0);
        this.refuel();

        // Reactor
        var reactor = new Batteries(this.game,this);
        this.equipEquipmentInSlot(reactor,0);
        this.recharge();
        
        // Cargo
        this.emptyCargoHold();
    }
}
