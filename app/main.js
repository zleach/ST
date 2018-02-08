define(function (require) {
    var constants = require('./_constants');
    //var game = require('./game');

    // Game Objects
    require('./gameObjects/_gameObject.js')
    require('./equipment/_equipment.js')

    // Base Classes
    require('./engines/_engine.js')
    require('./weapons/_weapon.js')
    require('./ships/_ship.js')

    // Items
    require('./items/flake.js')
    require('./items/paladium.js')
    require('./items/metoricIron.js')

    // Weapons
    require('./weapons/basicMiningLaser.js')

    // Ships
    require('./ships/miner1.js')

    // Objects
    require('./gameObjects/pickup.js')
    require('./gameObjects/flake.js')
    require('./gameObjects/asteroid.js')

    // Player
    require('./player.js')
    require('./inventoryObject.js')
});