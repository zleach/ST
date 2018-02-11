// Convert from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

// Convert from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}

const P2BODY_DEBUG = false;

const DEG_IN_RAD_90 = 1.5708;

const CREDIT_PREFIX = {
    short : '$',
    long: 'Credits ',
}

const NAVIGATION_MODE = {
    free : 'free',
    stationKeeping : 'stationKeeping',
    followWaypoints : 'followWaypoints',
}

const CARGO_STORAGE_CLASS = {
    bulk : 'bulk',
    passengers : 'passengers',
    gas : 'gas',
    liquid : 'liquid',
}

const ASTEROID_FIELD_SIZE = {
    small : 400,
    medium : 800,
    large: 1200,
    huge: 2000
}

const PLANET_SERVICES = {
    refinery : 'refinery',
    fuelDepot : 'fuelDepot',
    shipyard : 'shipyard',
    market : 'market',
    recruitmentCenter : 'recruitmentCenter',
}

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
    epic :      'epic',
    legendary : 'legendary',
}

const RARITY_COLOR = {
    common :    0xFFFFFF,
    uncommon :  0x3DD20B,
    rare :      0x2F78FF,
    epic :      0x9132C8,
    legendary : 0xCF4747,
}

const RARITY_INDEX = {
    common :    1,
    uncommon :  2,
    rare :      3,
    epic :      4,
    legendary : 5,
}

const RARITY_MINING_CHANCE = {
    common :    1,
    uncommon :  .1,
    rare :      .01,
    epic :      .001,
    legendary : .0001,
}