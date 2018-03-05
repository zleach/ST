class BasicMiner extends Ship {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'MV Fair Rosamond',
            description : 'Cobalt Class Mining Vessel',
            health: 130,
            turnDecay: .03,
            turnAccel: .1,
            leftRightThrust: 100,
            maxTurning: 10,
            reverseThrust: 100,
            maxReverse: 90,
            maxFuel : 2200,
            maxEnergy: 0,
            mass: 2, // Tons
            equipmentSlots : 4,
            centerOfGravity : {
                x : .5,
                y : .5,
            },
            polygon: [
                {
                    "shape": [ 5,36, 6,7, 21,39, 20,51, 6,50 ]
                },
                {
                    "shape": [ 28,38, 21,39, 6,7, 9,0, 18,0 ]
                },
                {
                    "shape": [ 28,38, 20,7, 28,7 ]
                },
                {
                    "shape": [ 6,7, 5,36, 0,36, 0,7 ]
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
                        x: 9,
                        y: -22
                    },
                    typesAllowed: [WEAPON_TYPES.miningLaser],
                }
            ],
            engineSlots : [{
                anchor : {
                    x: 0.57,
                    y: -1.5
                },
                angle : 0,
            }],
            RCS :{
                forward_left : {
                    x: 0,
                    y: 8,
                    angle : 90,
                },
                forward_right : {
                    x: 26,
                    y: 14,
                    angle : 270,                    
                },
                aft_left : {
                    x : 5,
                    y : 41,
                    angle : 90,
                },
                aft_right : {
                    x: 21,
                    y: 46,
                    angle : 270,                    
                },
                retro_a : {
                    x: 11,
                    y: 3,
                    angle : 180,
                    retro : true,                   
                },
                retro_b : {
                    x: 21,
                    y: 3,
                    angle : 180,
                    retro : true,                   
                },
            },
            dockingConnector : {
                position : {
                    x: -3,
                    y: -24,
                    angle : 90,
                },
                inUse: false,
            },
            storage : {
                equipment : 500,
                bulk : 800,
            }
        }

        // Sprites
        this.sprite = this.game.add.sprite(x,y, 'mining_ship');
        this.sprite.anchor.set(this.specs.centerOfGravity.x,this.specs.centerOfGravity.y);

        this.setupSprite(this.sprite);
        
        // Cargo
        this.emptyCargoHold();
    }
}