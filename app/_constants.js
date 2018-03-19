//alert("5678".toHHMMSS());
function TIME_FORMAT(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    if(time==Infinity || isNaN(time)){
        return '--';
    } else {
        return minutes+':'+seconds;
    }
}

FONT = 'Fira Code';

DISTANCE_FACTOR_PLANETS = 1000;
DISTANCE_FACTOR_SHIPS = .2;
PIXEL_TO_LIGHTYEAR = .1;

AMBIENT_VOLUME = .95;

// Convert from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

// Convert from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}

Array.prototype.lastItem = function() {
    return this[this.length-1];
};


function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function decimalToHexString(number) {
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}

function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}


const P2BODY_DEBUG = false;

const DEG_IN_RAD_90 = 1.5708;

const CONTROL_MODE = {
    gui : 'gui',
    play: 'play',
    landed: 'landed',
    exchange: 'exchange',
}

const SCREEN_TRANSITION_STYLE = {
    none : 'none',
    fromBottom : 'fromBottom',
    fromRight : 'fromRight',
}

const CREDIT_PREFIX = {
    short : '$',
    long: 'Credits ',
}

const BUTTON_STYLE = {
    simple : 'simple',
    twoLine : 'twoLine',
}

const NAVIGATION_MODE = {
    free : 'free',
    target : 'target',
    stationKeeping : 'stationKeeping',
    followWaypoints : 'followWaypoints',
}

const CARGO_STORAGE_CLASS = {
    bulk : 'bulk',
    passengers : 'passengers',
    gas : 'gas',
    liquid : 'liquid',
    equipment : 'equipment',
}

const CARGO_STORAGE_CLASS_NAMES = {
    bulk : 'Bulk',
    passengers : 'Passenger',
    gas : 'Gas',
    liquid : 'Liquid',
    equipment : 'Equipment',
}


const ASTEROID_FIELD_SIZE = {
    small : 1400,
    medium : 1800,
    large: 2200,
    huge: 4000
}

const PLANET_SERVICES = {
    refinery : 'refinery',
    fuelDepot : 'fuelDepot',
    shipyard : 'shipyard',
    market : 'market',
    tavern : 'tavern',
    casino : 'casino',
    passengerTerminal : 'passengerTerminal',
}

const PLANET_SERVICES_TITLE = {
    refinery : 'Refinery',
    fuelDepot : 'Fuel Depot',
    shipyard : 'Shipyard',
    market : 'Marketplace',
    tavern : 'Tavern',
    casino : 'Clubhouse',
    passengerTerminal : 'Starport',
}

const PLANET_SERVICES_DESC = {
    refinery : 'Process raw materials',
    fuelDepot : 'Refuel and recharge',
    shipyard : 'Trade and repair ships',
    market : 'Buy, sell & trade goods',
    tavern : 'Drink with the locals',
    casino : 'Members only gambling',
    passengerTerminal : 'Find transport jobs',
}

const PLANET_SERVICES_REQUIREMENTS = [
    {
        service : 'refinery',
        requirement : 'industry',
        level : 6,
    },
    {
        service : 'fuelDepot',
        requirement : 'industry',
        level : 3,
    },
    {
        service : 'shipyard',
        requirement : 'science',
        level : 7,
    },
    {
        service : 'market',
        requirement : 'trade',
        level : 5,
    },
    {
        service : 'tavern',
        requirement : 'culture',
        level : 5,
    },
    {
        service : 'casino',
        requirement : 'culture',
        level : 8,
    },
    {
        service : 'passengerTerminal',
        requirement : 'trade',
        level : 7,
    }
];

const WEAPON_TYPES = {
    miningLaser :    'miningLaser',
    kinetic :  'kinetic',
    blaster :  'blaster',
    missleLauncher :  'missleLauncher',
}

const ENGINE_TYPES = {
    rocket :    'rocket',
    reactionControlThruster :  'reactionControlThruster',
}

const RARITY = {
    common :    'common',
    uncommon :  'uncommon',
    rare :      'rare',
    exquisite :      'exquisite',
    exotic : 'exotic',
}

const RARITY_NAMES = {
    common :    'Common',
    uncommon :  'Uncommon',
    rare :      'Rare',
    exquisite : 'Exquisite',
    exotic : 'Exotic',
}

const RARITY_COLOR = {
    common :    0xFFFFFF,
    uncommon :  0x3DD20B,
    rare :      0x2F78FF,
    exquisite : 0x9132C8,
    exotic : 0xCF4747,
}

const RARITY_INDEX = {
    common :    1,
    uncommon :  2,
    rare :      3,
    exquisite : 4,
    exotic : 5,
}

const RARITY_MINING_CHANCE = {
    common :    1,
    uncommon :  .1,
    rare :      .01,
    exquisite :      .001,
    exotic : .0001,
}

const INVENTORY_LIST_CURSOR_STYLE = {
    none : 'none',
    left : 'left',
    right : 'right',
}

const STELLAR_TYPES = [
{
    class : 'O5',
    color : '#9db4ff',
},
{
    class : 'B1',
    color : '#a2b9ff',
},
{
    class : 'B3',
    color : '#a7bcff',
},
{
    class : 'B5',
    color : '#aabfff',
},
{
    class : 'B8',
    color : '#afc3ff',
},
{
    class : 'A1',
    color : '#baccff',
},
{
    class : 'A3',
    color : '#c0d1ff',
},
{
    class : 'A5',
    color : '#cad8ff',
},
{
    class : 'F0',
    color : '#e4e8ff',
},
{
    class : 'F2',
    color : '#edeeff',
},
{
    class : 'F5',
    color : '#fbf8ff',
},
{
    class : 'F8',
    color : '#fff9f9',
},
{
    class : 'G2',
    color : '#fff5ec',
},
{
    class : 'G5',
    color : '#fff4e8',
},
{
    class : 'G8',
    color : '#fff1df',
},
{
    class : 'K0',
    color : '#ffebd1',
},
{
    class : 'K4',
    color : '#ffd7ae',
},
{
    class : 'K7',
    color : '#ffc690',
},
{
    class : 'M2',
    color : '#ffbe7f',
},
{
    class : 'M4',
    color : '#ffbb7b',
},
{
    class : 'M6',
    color : '#ffbb7b',
}    
]

const GREEK_ALPHABET = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta',
    'Epsilon',
    'Zeta',
    'Eta',
    'Theta',
    'Omicron',
    'Pi',
    'Sigma',
    'Tau',
    'Upsilon',
    'Omega',
]