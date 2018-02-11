

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js from "js.txt" begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/* Last merge : Sun Feb 11 12:55:17 PST 2018  */

/* Merging order :

- lib/numeral.js
- app/_constants.js
- app/_inventoryObject.js
- app/gameObjects/_gameObject.js
- app/equipment/_equipment.js
- app/equipment/reactor.js
- app/weapons/_weapon.js
- app/ships/_ship.js
- app/engines/_engine.js
- app/engines/basicEngine.js
- app/engines/smallEngine.js
- app/engines/_thruster.js
- app/gameObjects/pickup.js
- app/gameObjects/flake.js
- app/gameObjects/asteroid.js
- app/gameObjects/asteroidField.js
- app/items/flake.js
- app/items/paladium.js
- app/items/metoricIron.js
- app/ships/basicMiner.js
- app/ships/fuelTanker.js
- app/ships/shuttle.js
- app/weapons/basicMiningLaser.js
- app/weapons/basicBlaster.js
- app/planets/_planet.js
- app/planets/basicPlanet.js
- app/planets/basicMoon.js
- app/player.js
- app/hud.js
- app/minimap.js
- app/progressBar.js
- app/game.js

*/


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: lib/numeral.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof module&&module.exports?module.exports=b():a.numeral=b()}(this,function(){function a(a,b){this._input=a,this._value=b}var b,c,d="2.0.6",e={},f={},g={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},h={currentLocale:g.currentLocale,zeroFormat:g.zeroFormat,nullFormat:g.nullFormat,defaultFormat:g.defaultFormat,scalePercentBy100:g.scalePercentBy100};return b=function(d){var f,g,i,j;if(b.isNumeral(d))f=d.value();else if(0===d||"undefined"==typeof d)f=0;else if(null===d||c.isNaN(d))f=null;else if("string"==typeof d)if(h.zeroFormat&&d===h.zeroFormat)f=0;else if(h.nullFormat&&d===h.nullFormat||!d.replace(/[^0-9]+/g,"").length)f=null;else{for(g in e)if(j="function"==typeof e[g].regexps.unformat?e[g].regexps.unformat():e[g].regexps.unformat,j&&d.match(j)){i=e[g].unformat;break}i=i||b._.stringToNumber,f=i(d)}else f=Number(d)||null;return new a(d,f)},b.version=d,b.isNumeral=function(b){return b instanceof a},b._=c={numberToFormat:function(a,c,d){var e,g,h,i,j,k,l,m=f[b.options.currentLocale],n=!1,o=!1,p=0,q="",r=1e12,s=1e9,t=1e6,u=1e3,v="",w=!1;if(a=a||0,g=Math.abs(a),b._.includes(c,"(")?(n=!0,c=c.replace(/[\(|\)]/g,"")):(b._.includes(c,"+")||b._.includes(c,"-"))&&(j=b._.includes(c,"+")?c.indexOf("+"):0>a?c.indexOf("-"):-1,c=c.replace(/[\+|\-]/g,"")),b._.includes(c,"a")&&(e=c.match(/a(k|m|b|t)?/),e=e?e[1]:!1,b._.includes(c," a")&&(q=" "),c=c.replace(new RegExp(q+"a[kmbt]?"),""),g>=r&&!e||"t"===e?(q+=m.abbreviations.trillion,a/=r):r>g&&g>=s&&!e||"b"===e?(q+=m.abbreviations.billion,a/=s):s>g&&g>=t&&!e||"m"===e?(q+=m.abbreviations.million,a/=t):(t>g&&g>=u&&!e||"k"===e)&&(q+=m.abbreviations.thousand,a/=u)),b._.includes(c,"[.]")&&(o=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],k=c.indexOf(","),p=(c.split(".")[0].split(",")[0].match(/0/g)||[]).length,i?(b._.includes(i,"[")?(i=i.replace("]",""),i=i.split("["),v=b._.toFixed(a,i[0].length+i[1].length,d,i[1].length)):v=b._.toFixed(a,i.length,d),h=v.split(".")[0],v=b._.includes(v,".")?m.delimiters.decimal+v.split(".")[1]:"",o&&0===Number(v.slice(1))&&(v="")):h=b._.toFixed(a,0,d),q&&!e&&Number(h)>=1e3&&q!==m.abbreviations.trillion)switch(h=String(Number(h)/1e3),q){case m.abbreviations.thousand:q=m.abbreviations.million;break;case m.abbreviations.million:q=m.abbreviations.billion;break;case m.abbreviations.billion:q=m.abbreviations.trillion}if(b._.includes(h,"-")&&(h=h.slice(1),w=!0),h.length<p)for(var x=p-h.length;x>0;x--)h="0"+h;return k>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+m.delimiters.thousands)),0===c.indexOf(".")&&(h=""),l=h+v+(q?q:""),n?l=(n&&w?"(":"")+l+(n&&w?")":""):j>=0?l=0===j?(w?"-":"+")+l:l+(w?"-":"+"):w&&(l="-"+l),l},stringToNumber:function(a){var b,c,d,e=f[h.currentLocale],g=a,i={thousand:3,million:6,billion:9,trillion:12};if(h.zeroFormat&&a===h.zeroFormat)c=0;else if(h.nullFormat&&a===h.nullFormat||!a.replace(/[^0-9]+/g,"").length)c=null;else{c=1,"."!==e.delimiters.decimal&&(a=a.replace(/\./g,"").replace(e.delimiters.decimal,"."));for(b in i)if(d=new RegExp("[^a-zA-Z]"+e.abbreviations[b]+"(?:\\)|(\\"+e.currency.symbol+")?(?:\\))?)?$"),g.match(d)){c*=Math.pow(10,i[b]);break}c*=(a.split("-").length+Math.min(a.split("(").length-1,a.split(")").length-1))%2?1:-1,a=a.replace(/[^0-9\.]+/g,""),c*=Number(a)}return c},isNaN:function(a){return"number"==typeof a&&isNaN(a)},includes:function(a,b){return-1!==a.indexOf(b)},insert:function(a,b,c){return a.slice(0,c)+b+a.slice(c)},reduce:function(a,b){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof b)throw new TypeError(b+" is not a function");var c,d=Object(a),e=d.length>>>0,f=0;if(3===arguments.length)c=arguments[2];else{for(;e>f&&!(f in d);)f++;if(f>=e)throw new TypeError("Reduce of empty array with no initial value");c=d[f++]}for(;e>f;f++)f in d&&(c=b(c,d[f],f,d));return c},multiplier:function(a){var b=a.toString().split(".");return b.length<2?1:Math.pow(10,b[1].length)},correctionFactor:function(){var a=Array.prototype.slice.call(arguments);return a.reduce(function(a,b){var d=c.multiplier(b);return a>d?a:d},1)},toFixed:function(a,b,c,d){var e,f,g,h,i=a.toString().split("."),j=b-(d||0);return e=2===i.length?Math.min(Math.max(i[1].length,j),b):j,g=Math.pow(10,e),h=(c(a+"e+"+e)/g).toFixed(e),d>b-e&&(f=new RegExp("\\.?0{1,"+(d-(b-e))+"}$"),h=h.replace(f,"")),h}},b.options=h,b.formats=e,b.locales=f,b.locale=function(a){return a&&(h.currentLocale=a.toLowerCase()),h.currentLocale},b.localeData=function(a){if(!a)return f[h.currentLocale];if(a=a.toLowerCase(),!f[a])throw new Error("Unknown locale : "+a);return f[a]},b.reset=function(){for(var a in g)h[a]=g[a]},b.zeroFormat=function(a){h.zeroFormat="string"==typeof a?a:null},b.nullFormat=function(a){h.nullFormat="string"==typeof a?a:null},b.defaultFormat=function(a){h.defaultFormat="string"==typeof a?a:"0.0"},b.register=function(a,b,c){if(b=b.toLowerCase(),this[a+"s"][b])throw new TypeError(b+" "+a+" already registered.");return this[a+"s"][b]=c,c},b.validate=function(a,c){var d,e,f,g,h,i,j,k;if("string"!=typeof a&&(a+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",a)),a=a.trim(),a.match(/^\d+$/))return!0;if(""===a)return!1;try{j=b.localeData(c)}catch(l){j=b.localeData(b.locale())}return f=j.currency.symbol,h=j.abbreviations,d=j.delimiters.decimal,e="."===j.delimiters.thousands?"\\.":j.delimiters.thousands,k=a.match(/^[^\d]+/),null!==k&&(a=a.substr(1),k[0]!==f)?!1:(k=a.match(/[^\d]+$/),null!==k&&(a=a.slice(0,-1),k[0]!==h.thousand&&k[0]!==h.million&&k[0]!==h.billion&&k[0]!==h.trillion)?!1:(i=new RegExp(e+"{2}"),a.match(/[^\d.,]/g)?!1:(g=a.split(d),g.length>2?!1:g.length<2?!!g[0].match(/^\d+.*\d$/)&&!g[0].match(i):1===g[0].length?!!g[0].match(/^\d+$/)&&!g[0].match(i)&&!!g[1].match(/^\d+$/):!!g[0].match(/^\d+.*\d$/)&&!g[0].match(i)&&!!g[1].match(/^\d+$/))))},b.fn=a.prototype={clone:function(){return b(this)},format:function(a,c){var d,f,g,i=this._value,j=a||h.defaultFormat;if(c=c||Math.round,0===i&&null!==h.zeroFormat)f=h.zeroFormat;else if(null===i&&null!==h.nullFormat)f=h.nullFormat;else{for(d in e)if(j.match(e[d].regexps.format)){g=e[d].format;break}g=g||b._.numberToFormat,f=g(i,j,c)}return f},value:function(){return this._value},input:function(){return this._input},set:function(a){return this._value=Number(a),this},add:function(a){function b(a,b,c,e){return a+Math.round(d*b)}var d=c.correctionFactor.call(null,this._value,a);return this._value=c.reduce([this._value,a],b,0)/d,this},subtract:function(a){function b(a,b,c,e){return a-Math.round(d*b)}var d=c.correctionFactor.call(null,this._value,a);return this._value=c.reduce([a],b,Math.round(this._value*d))/d,this},multiply:function(a){function b(a,b,d,e){var f=c.correctionFactor(a,b);return Math.round(a*f)*Math.round(b*f)/Math.round(f*f)}return this._value=c.reduce([this._value,a],b,1),this},divide:function(a){function b(a,b,d,e){var f=c.correctionFactor(a,b);return Math.round(a*f)/Math.round(b*f)}return this._value=c.reduce([this._value,a],b),this},difference:function(a){return Math.abs(b(this._value).subtract(a).value())}},b.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),function(){b.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(a,c,d){var e,f=b._.includes(c," BPS")?" ":"";return a=1e4*a,c=c.replace(/\s?BPS/,""),e=b._.numberToFormat(a,c,d),b._.includes(e,")")?(e=e.split(""),e.splice(-1,0,f+"BPS"),e=e.join("")):e=e+f+"BPS",e},unformat:function(a){return+(1e-4*b._.stringToNumber(a)).toFixed(15)}})}(),function(){var a={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},c={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},d=a.suffixes.concat(c.suffixes.filter(function(b){return a.suffixes.indexOf(b)<0})),e=d.join("|");e="("+e.replace("B","B(?!PS)")+")",b.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(e)},format:function(d,e,f){var g,h,i,j,k=b._.includes(e,"ib")?c:a,l=b._.includes(e," b")||b._.includes(e," ib")?" ":"";for(e=e.replace(/\s?i?b/,""),h=0;h<=k.suffixes.length;h++)if(i=Math.pow(k.base,h),j=Math.pow(k.base,h+1),null===d||0===d||d>=i&&j>d){l+=k.suffixes[h],i>0&&(d/=i);break}return g=b._.numberToFormat(d,e,f),g+l},unformat:function(d){var e,f,g=b._.stringToNumber(d);if(g){for(e=a.suffixes.length-1;e>=0;e--){if(b._.includes(d,a.suffixes[e])){f=Math.pow(a.base,e);break}if(b._.includes(d,c.suffixes[e])){f=Math.pow(c.base,e);break}}g*=f||1}return g}})}(),function(){b.register("format","currency",{regexps:{format:/(\$)/},format:function(a,c,d){var e,f,g,h=b.locales[b.options.currentLocale],i={before:c.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:c.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(c=c.replace(/\s?\$\s?/,""),e=b._.numberToFormat(a,c,d),a>=0?(i.before=i.before.replace(/[\-\(]/,""),i.after=i.after.replace(/[\-\)]/,"")):0>a&&!b._.includes(i.before,"-")&&!b._.includes(i.before,"(")&&(i.before="-"+i.before),g=0;g<i.before.length;g++)switch(f=i.before[g]){case"$":e=b._.insert(e,h.currency.symbol,g);break;case" ":e=b._.insert(e," ",g+h.currency.symbol.length-1)}for(g=i.after.length-1;g>=0;g--)switch(f=i.after[g]){case"$":e=g===i.after.length-1?e+h.currency.symbol:b._.insert(e,h.currency.symbol,-(i.after.length-(1+g)));break;case" ":e=g===i.after.length-1?e+" ":b._.insert(e," ",-(i.after.length-(1+g)+h.currency.symbol.length-1))}return e}})}(),function(){b.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(a,c,d){var e,f="number"!=typeof a||b._.isNaN(a)?"0e+0":a.toExponential(),g=f.split("e");return c=c.replace(/e[\+|\-]{1}0/,""),e=b._.numberToFormat(Number(g[0]),c,d),e+"e"+g[1]},unformat:function(a){function c(a,c,d,e){var f=b._.correctionFactor(a,c),g=a*f*(c*f)/(f*f);return g}var d=b._.includes(a,"e+")?a.split("e+"):a.split("e-"),e=Number(d[0]),f=Number(d[1]);return f=b._.includes(a,"e-")?f*=-1:f,b._.reduce([e,Math.pow(10,f)],c,1)}})}(),function(){b.register("format","ordinal",{regexps:{format:/(o)/},format:function(a,c,d){var e,f=b.locales[b.options.currentLocale],g=b._.includes(c," o")?" ":"";return c=c.replace(/\s?o/,""),g+=f.ordinal(a),e=b._.numberToFormat(a,c,d),e+g}})}(),function(){b.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(a,c,d){var e,f=b._.includes(c," %")?" ":"";return b.options.scalePercentBy100&&(a=100*a),c=c.replace(/\s?\%/,""),e=b._.numberToFormat(a,c,d),b._.includes(e,")")?(e=e.split(""),e.splice(-1,0,f+"%"),e=e.join("")):e=e+f+"%",e},unformat:function(a){var c=b._.stringToNumber(a);return b.options.scalePercentBy100?.01*c:c}})}(),function(){b.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(a,b,c){var d=Math.floor(a/60/60),e=Math.floor((a-60*d*60)/60),f=Math.round(a-60*d*60-60*e);return d+":"+(10>e?"0"+e:e)+":"+(10>f?"0"+f:f)},unformat:function(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}})}(),b});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/_constants.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/_inventoryObject.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class InventoryObject {
    constructor(game) {
        this.game = game;

        this.name = 'Unkown Object';
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/_gameObject.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class GameObject {
    constructor(game) {                
        this.game = game;
        this.game.register(this);
    
        this.showInfoDistance = 200;

        // Basics
        this.health = 0;
        this.alive = true;
        this.isInvinsible = false;

        // Damage Managment        
        this.damageAccumulating = false;
        this.damageAccumulationAmount = 0;        
    
        // Item Managment
        this.inventory = [];
        this.itemsAccumulating = false;
        this.itemsAccumulator = [];        
    }

    inflictDamage(amount){
        if(!this.isInvinsible){            
            if(!this.damageAccumulating){
                this.damageAccumulating = true;
                this.damageAccumulationAmount +=amount;
                setTimeout(function(){
                    this.damageAccumulating = false;
                    this.showDamage(this.damageAccumulationAmount);
                    this.damageAccumulationAmount = 0;
                }.bind(this), 250)
            } else {
                this.damageAccumulationAmount +=amount;                
            }
            
            if(this.health>0){
                this.health -= amount;
            } else if(this.health<=0 && this.alive){
                this.kill();
            }        
        }
    }
        
    showDamage(amount){
        var x = this.sprite.x + game.rnd.integerInRange(-this.sprite.width/5, this.sprite.width/5);
        var damageText = game.add.bitmapText(x, this.sprite.y, 'pixelmix_8',amount,10);
        damageText.anchor.x = 0.5;
        damageText.alpha = 0;
        damageText.tint = 0xf1c40f;
                
        var fadeIn = this.game.add.tween(damageText).to( { alpha: 1 }, 200, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(damageText).to( { y: '-30' }, 800, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(damageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 150);        
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, damageText);
    }
    
    collectNumberOfItems(amount,item){
        if(this.addItemsToInventory(amount,item)){
            if(!this.itemsAccumulating){
                this.itemsAccumulating = true;
                this.itemsAccumulator[item.name] = { item: item, amount: amount };
                
                setTimeout(function(){
                    this.itemsAccumulating = false;
                    this.showItemsCollected(this.itemsAccumulator);
                    this.itemsAccumulator = [];
                }.bind(this), 500)
            } else {
                if(this.itemsAccumulator[item.name]==undefined){
                    this.itemsAccumulator[item.name] = { item: item, amount: amount };
                } else {
                    this.itemsAccumulator[item.name]['amount'] +=amount;                
                }
            }
            return true;
        } else {
            return false;
        }
    }
        
    showItemsCollected(items){
        var context = this;
        Object.keys(items).forEach(function(key,index) {
            var verticalSpacing = 18;
            var itemGroup = items[key];
            var itemMessage = `+${itemGroup.amount} ${itemGroup.item.name}`;
            var itemText = game.add.bitmapText(this.sprite.x, this.sprite.y-(verticalSpacing*index), 'pixelmix_8',itemMessage,8);
            itemText.anchor.x = .5;
            itemText.alpha = 0;
            itemText.tint = RARITY_COLOR[itemGroup.item.rarity];
        
            var fadeIn = this.game.add.tween(itemText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
        	var moveUp = this.game.add.tween(itemText).to( { y: '-30' }, 300, "Quart.easeOut", true);
            var fadeOut = this.game.add.tween(itemText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 1000);        
    
            fadeIn.chain(fadeOut);
            fadeIn.start();

            game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, itemText);

        }.bind(this));
    }

    // Inventory
    get bulkFreeSpace(){
        return numeral(this.freeSpace[CARGO_STORAGE_CLASS.bulk]).format('0a')
    }
    get bulkUsedSpace(){
        return numeral(this.specs.storage.bulk-this.freeSpace[CARGO_STORAGE_CLASS.bulk]).format('0a')
    }

    get bulkMaxSpace(){
        return numeral(this.specs.storage.bulk).format('0a')
    }

    calculateFreeSpaceForStorageClass(storageClass){
        return this.freeSpace[storageClass];
    }
    
    hasEnoughSpaceForItemOfStorageClassWithMass(storageClass,mass){
        if(this.calculateFreeSpaceForStorageClass(storageClass) >= mass){
            return true;
        } else {
            return false;
        }
    }
    
    addItemsToInventory(amount,item){
        for (var i = 0; i < amount; i++) { 
            if(this.hasEnoughSpaceForItemOfStorageClassWithMass(item.storageClass,item.mass)){
                this.inventory.push(item);
                this.freeSpace[item.storageClass] -= item.mass;
                return true;
            } else {
                this.game.hud.message('Not Enough Cargo Space');
                return false;
            }
        }
    }
    
    kill(){
        this.alive = false;
        this.game.unregister(this);        

        if(this.sprite!=undefined){
            //this.sprite.body.kill();
            this.sprite.kill();
        }
    }

    destroy(){
        this.alive = false;

        this.game.unregister(this);        
        if(this.sprite!=undefined){
            this.sprite.destroy();
        }
    }

    destroyEmitter(){
        this.destroy();        
    } 

    destroyObject(){
        this.destroy();        
    } 

    update(){
        
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/equipment/_equipment.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Equipment extends GameObject {
    constructor(game,parentObject) {
        super(game);
        this.parentObject = parentObject;
        
        this.equiped = false;
    }
    
    update(){
        super.update();
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/equipment/reactor.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Reactor extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);
        
        this.chargeRate = .1;
    }

    update(){
        super.update();
        this.parentObject.charge(this.chargeRate);
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/weapons/_weapon.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Weapon extends Equipment {
    constructor(game,parentObject) {
        super(game);
        this.parentObject = parentObject;
        
        this.energyConsumption = 0;
    }

    update(){
        super.update();
    }

    postUpdate(){
        // Bullet updates
        if(this.weapon!=undefined && this.alive){        
            var hits = this.game.physics.p2.hitTest(this.position);
            if(hits.length) this.weapon.hit(this,hits)
        }

        if (this.customRender) this.key.render();
        if (this.components.PhysicsBody) Phaser.Component.PhysicsBody.postUpdate.call(this);
        if (this.components.FixedToCamera) Phaser.Component.FixedToCamera.postUpdate.call(this);
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].postUpdate();
        }
    }

    hit(bullet,hits){
        for (let hit of hits) {
            var target = hit.parent.sprite.parentObject;

            if(this.game.player.ship == target){
                return; // Can't hit yourself.
            }
            
            target.inflictDamage(bullet.damage);
            bullet.kill();
        }
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/ships/_ship.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Ship extends GameObject {
    constructor(game,x,y) {
        super(game);
        
        // Basic Ship
        this.specs = {
            name : 'Unknown Ship',
            description : 'Unknown Class',
        }
        
        this.xStart = x;
        this.yStart = y;

        this.dockingDistance = 250;
        this.dockedShips = [];
        this.isDocked = false;

        this.fuelQuantity = 0;
        this.energyQuantity = 0;

        this.weapons = [];
        this.engines = [];    
        this.equipment = [];
        
        this.canPickThingsUp = true;
    
        this.navigation = {
            waypoints : [
            {
                x: this.game.world.centerX+200,
                y: this.game.world.centerY-200,
            },
            {
                x: this.game.world.centerX+200,
                y: this.game.world.centerY+1000,
            },
            {
                x: this.game.world.centerX-200,
                y: this.game.world.centerY+1000,
            },
            {
                x: this.game.world.centerX-200,
                y: this.game.world.centerY-200,
            },
            ],
            currentWaypoint: 0,
        }
        this.navigationMode = NAVIGATION_MODE.free;
    }
    
    setupSprite(sprite){
        // Physics
        this.game.physics.p2.enable(sprite,P2BODY_DEBUG);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon(null,this.specs.polygon);       
        this.sprite.body.damping = 0.01;
        this.sprite.body.mass = this.specs.mass;
        this.sprite.parentObject = this;
        
        this.dockingConnector = this.sprite.addChild(this.game.make.sprite(0, 0, 'null'));
        this.dockingConnector.x = this.specs.dockingConnector.position.x;
        this.dockingConnector.y = this.specs.dockingConnector.position.y;

        if(this.specs.canBeDockedTo){
            this.dockingPort = this.sprite.addChild(this.game.make.sprite(0, 0, 'dock-arrow'));
            this.dockingPort.x = this.specs.dockingPorts[0].position.x;
            this.dockingPort.y = this.specs.dockingPorts[0].position.y;
            this.dockingPort.anchor.set(.5,2.5);
            this.dockingPort.visible = false;

            this.dockingPortBlink = this.game.add.tween(this.dockingPort).to({
                alpha: 1,
                y: '5'
            }, 600, "Quart.easeOut", true, 0, 0, true).loop(true);
        }
        
        this.setupRCSThrusters();
        this.game.ships.add(this.sprite);        
        
        this.health = this.specs.health;
        
        // Info
        this.nameText = this.game.add.bitmapText(0,0, 'pixelmix_8', this.specs.name, 8);
        this.nameText.alpha = 0;

        this.subText = this.game.add.bitmapText(0,0, 'pixelmix_8', this.specs.description, 5);
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.bitmapText(0,0, 'pixelmix_8', 'Cleared to Dock', 5);
        this.landingMessage.alpha = 0;
    }
    
    positionInfo(){
        var x = 20+this.sprite.x + this.sprite.width/2;
        var y = this.sprite.y;
        
        this.nameText.x = x; 
        this.nameText.y = y-40; 

        this.subText.x = x; 
        this.subText.y = y-20; 

        this.landingMessage.x = x; 
        this.landingMessage.y = y+20;             
    }
    
    // Weapons
    firePrimaryWeapon(){
        for (let weapon of this.weapons) {
            if(this.hasEnergy){
                this.consumeEnergy(weapon.energyConsumption)
                if(this.energyPercentage>1) weapon.weapon.fire();
            }
        }
    }

    equipWeaponInSlot(weapon,slot){
        this.weapons.push(weapon);
        
        weapon.weapon.trackSprite(
            this.sprite,
            this.specs.weaponSlots[slot].position.x,
            this.specs.weaponSlots[slot].position.y,
            true,
            270,
        );
    }

    // Engines
    equipEngineInSlot(engine,slot){
        // Equip
        this.engines.push(engine);
        engine.slot = slot;
        
        // Calculate new max speed (average of engine max speeds)
        var maxSpeed = 0;
        for (let engine of this.engines) {
            maxSpeed += engine.maxSpeed;
        }
        this.maxSpeed = maxSpeed/10 // No idea.
    }
    
    setupRCSThrusters(){
        if(this.specs.RCS != undefined){
            this.thrusters = {};
            for (var thruster in this.specs.RCS) {
                this.addThruster(thruster,this.specs.RCS[thruster])
            }
        }
    }    
    
    addThruster(thruster,layout){
        this.thrusters[thruster] = new Thruster(this.game,this,layout)
        
        // Hande retro thrusters
        if(layout.retro !=undefined){
            this.thrusters[thruster].retro = layout.retro
        }
    }
    
    fireThruster(thrusterKey){
        if(this.thrusters[thrusterKey]!=undefined && this.hasFuel){
            var thruster = this.thrusters[thrusterKey];
            this.consumeFuel(thruster.fuelConsumption)
            thruster.fire();
        }
    }

    shutdownThruster(thruster){
        this.thrusters[thruster].shutdown();
    }
    
    shutdownAllThrusters(){
        for (var thruster in this.specs.RCS) {
            this.shutdownThruster(thruster)
        }        
    }
    
    // Equipment
    equipEquipmentInSlot(equipment,slot){
        this.equipment.push(equipment);
    }

    
    // Movement
    get speed(){
        var body = this.sprite.body
        var vx, vy;
        
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        
        return vx * vx + vy * vy;
    }
    
    get heading(){
        return this.sprite.angle;
    }
    
    accelerate() {
        if(!this.isDocked){
            // Not Docked
            var totalThurst = 0;
            for (let engine of this.engines) {
                if(this.hasFuel){
                    this.consumeFuel(engine.fuelConsumption)
                    totalThurst += engine.thrust;
                    engine.accelerate();
                } else {
                    engine.deaccelerate();                
                }
            }
            this.sprite.body.thrust(totalThurst)
        } else {
            // Docked
            for (let engine of this.engines) {
                engine.deaccelerate();
            }
        }
    }
    
    get totalThurst(){
        var totalThurst = 0;
        for (let engine of this.engines) {
            totalThurst += engine.thrust;
        }
        return totalThurst;
    }
    
    limitSpeed() {
        var maxVelocity = this.maxSpeed;
        var sprite = this.sprite;

        var body = sprite.body
        var angle, currVelocitySqr, vx, vy;
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.data.velocity[0] = vx;
            body.data.velocity[1] = vy;
        }
    };
        
    deaccelerate() {
        if(this.sprite){
            this.sprite.body.acceleration = 0;
    
            for (let engine of this.engines) {
                engine.deaccelerate();
            }            
        }
    }

    goInReverse() {
        if(!this.isDocked && this.hasFuel) {
            if(this.speed<this.specs.maxReverse){
                this.sprite.body.reverse(this.specs.reverseThrust)
            }

            this.fireThruster('retro_a');
            this.fireThruster('retro_b');
        }
    }
    
    turnLeft(){
        if(!this.isDocked && this.sprite.body.angularVelocity>-this.specs.maxTurning && this.hasFuel) {
            this.sprite.body.angularVelocity -= this.specs.turnAccel;
        
            this.fireThruster('forward_right');
            this.fireThruster('aft_left');
        }
    }

    turnRight(){
        if(!this.isDocked && this.sprite.body.angularVelocity<this.specs.maxTurning && this.hasFuel) {
            this.sprite.body.angularVelocity += this.specs.turnAccel;

            this.fireThruster('forward_left');
            this.fireThruster('aft_right');
        }
    }

    moveLeft(){
        if(!this.isDocked && this.hasFuel) {
            this.sprite.body.thrustLeft(this.specs.leftRightThrust)

            this.fireThruster('forward_right');
            this.fireThruster('aft_right');
        }
    }

    moveRight(){
        if(!this.isDocked && this.hasFuel) {
            this.sprite.body.thrustRight(this.specs.leftRightThrust)

            this.fireThruster('forward_left');
            this.fireThruster('aft_left');
        }
    }

    deaccelerateTurning(){
        if(this.sprite){
            if(this.sprite.body.angularVelocity>0){
                this.sprite.body.angularVelocity = Math.max(this.sprite.body.angularVelocity-this.specs.turnDecay,0);
            }
            if(this.sprite.body.angularVelocity<0){
                this.sprite.body.angularVelocity = Math.min(this.sprite.body.angularVelocity+this.specs.turnDecay,0);
            }
        }
        
        this.shutdownAllThrusters();
    }
    
    
    // Navigation
    navigate(){
        if(this.navigationMode.free) return;

        if(this.navigationMode.stationKeeping) this.keepStation();
        
        if(this.navigationMode == NAVIGATION_MODE.followWaypoints) {
            this.goToWayPoint(this.navigation.waypoints[this.navigation.currentWaypoint]);
        }
    }

    goToWayPoint(waypoint){
        var shipAngle = this.sprite.rotation;
        
        // Heading
        var angleToWaypoint = this.game.physics.arcade.angleToXY(this.sprite, waypoint.x, waypoint.y) + 1.5708;
        var vx = this.sprite.body.velocity.x;
        var vy = this.sprite.body.velocity.y;
        var eta = this.distanceToWaypoint/Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2)); // Seconds until impact.
        
        var difference = Phaser.Math.wrapAngle(Math.degrees(angleToWaypoint - this.sprite.body.rotation));

        var distanceTolerance = 30;
        if(this.distanceToWaypoint<distanceTolerance){
            this.deaccelerate();
            this.sprite.body.setZeroVelocity();
            this.sprite.body.setZeroRotation();
            this.reachedWaypoint();
        } else {
            var turnSpeed = Math.abs(difference)*.02;
            //sconsole.log(`turn:${turnSpeed.toFixed(2)} | dist: ${this.distanceToWaypoint.toFixed(2)} | eta: ${eta.toFixed(2)}s`);
            if(difference<-3 && difference>-180){
                if(Math.abs(this.sprite.body.angularVelocity)< turnSpeed){
                    this.turnLeft();
                } else {
                    this.deaccelerateTurning();                
                }
                this.deaccelerate();
            } else if(difference>3 && difference<180) {
                if(Math.abs(this.sprite.body.angularVelocity)< turnSpeed){
                    this.turnRight();
                } else {
                    this.deaccelerateTurning();                
                }
                this.deaccelerate();
            } else {
                if(eta < 8){
                    if(this.distanceToWaypoint>distanceTolerance){
                        this.goInReverse();                    
                    }
                    this.deaccelerate();
                } else {
                    this.accelerate();
                }
            }
        }
    }

    reachedWaypoint(){
        console.log("reached");
        if(this.navigationMode == NAVIGATION_MODE.followWaypoints) {
            var w = this.navigation.currentWaypoint + 1;
            if(w>this.navigation.waypoints.length-1){
                w = 0;
            }
            
            this.navigation.currentWaypoint = w;
        }
    }
            
    get distanceToWaypoint(){
        var waypoint = this.navigation.waypoints[this.navigation.currentWaypoint];
        return this.game.physics.arcade.distanceToXY(this.sprite, waypoint.x,waypoint.y);
    }
    
    navigateWaypoints(){
        this.navigationMode = NAVIGATION_MODE.followWaypoints;
    }
    
    keepStation(){
        // Holds steady speed and heading
    }
    
    // Fuel Mgmt
    refuel(){
        this.fuelQuantity = this.specs.maxFuel;
        this.lowFuelLightShown = false;
    }
    
    lowFuelLight(){
        if(!this.lowFuelLightShown) {
            this.game.hud.message("Low Fuel");
            this.lowFuelLightShown = true;
        }
    }
    
    consumeFuel(amount){
        this.fuelQuantity -= amount;

        if(this.fuelPercentage<25){
            this.lowFuelLight();
        }

        if(!this.hasFuel){
            this.game.hud.blinkingWarning("Out of Fuel");
        }
    }
    
    get fuelPercentage(){
        return Math.round((this.fuelQuantity/this.specs.maxFuel)*100)        
    }
        
    get hasFuel(){
        if(this.fuelQuantity>=0){
            return true;
        } else {
            return false;
        }
    }
    
    // Energy Management
    recharge(){
        this.energyQuantity = this.specs.maxEnergy;
    }
    
    charge(amount){
        if(this.energyQuantity <= this.specs.maxEnergy){
            this.energyQuantity += amount;
        }
        
        if(this.energyQuantity>=this.specs.maxEnergy){
            this.energyQuantity = this.specs.maxEnergy;
        }
    }
            
    consumeEnergy(amount){
        this.energyQuantity -= amount;

        if(!this.hasEnergy){
            //this.game.hud.blinkingWarning("Not Enough Energy");
        }
    }
    
    get energyPercentage(){
        var value = Math.round((this.energyQuantity/this.specs.maxEnergy)*100);
        return Math.max(value,0);
    }
        
    get hasEnergy(){
        if(this.energyQuantity>=0){
            return true;
        } else {
            return false;
        }
    }

    // Docking
    attemptToDock(){        
        if(this.isDocked){
            if(this.dockingInProgress){
                this.abortDocking();
            } else {
                this.releaseDock();
            }
            return;
        }
        
        // Dock initiator calls this (ie. Dockee connects to Docker)
        var closestShip = false;
        var shipsInRange = [];
        for (let ship of this.game.gameObjects) {
            if(ship.specs!=undefined && ship!=this){
                var distance = this.game.physics.arcade.distanceBetween(ship.sprite, this.sprite);
                    shipsInRange.push({
                        distance: distance,
                        ship: ship,
                    })
            }
        }
        if(shipsInRange.length>0){
            shipsInRange.sort(function(a, b) {
                return a.distance - b.distance;
            });

            var shipToDockTo = shipsInRange[0].ship;
            var maxSpeedWhenDocking = 10;
            
            

            if((this.sprite.body.speed-shipToDockTo.sprite.body.speed)>maxSpeedWhenDocking){
                this.game.hud.message("Moving too fast to dock");
                return;
            }
            
            if(!this.okToDock){
                this.game.hud.message("Not aligned for docking");
            } else {
                this.dockWith(shipToDockTo);
            }
        } else {
            this.game.hud.message("No Dock Available");
        }
    }
    
    dockWith(ship){
        var dockingSpeed = 3000;
        
        var dockingPortNumber = 0;

        this.sprite.body.clearShapes();
        ship.sprite.body.clearShapes();
        ship.sprite.body.static = true;        
        
        var dockingPosition = ship.specs.dockingPorts[dockingPortNumber].position

        var dockingAngle = 180 * Math.PI / 180;        
        this.dockingConstraint = game.physics.p2.createLockConstraint(this.sprite, ship.sprite, [0, 72], dockingAngle, 500);
        this.dockedToShip = ship;

        this.isDocked = true;
        this.dockingTarget = ship;
        ship.landingMessage.setText('Docking...');

        game.time.events.add(Phaser.Timer.SECOND * .5, this.dockingComplete, {
            target: ship,
            dockedShip: this,
            portNumber: dockingPortNumber,
            game: this.game,
        });
    }
    
    dockingComplete(){
        var target = this.target;
        var dockedShip = this.dockedShip;
        var portNumber = this.portNumber; // What docking port am i at?
        
        target.sprite.body.loadPolygon(null,target.specs.polygon);       
        target.sprite.body.dynamic = true
        target.sprite.body.mass = true

        dockedShip.sprite.body.loadPolygon(null,dockedShip.specs.polygon)
        dockedShip.dockedToShip.sprite.body.dynamic = true;        
        dockedShip.dockedToShip.sprite.body.mass = dockedShip.specs.mass;        

        dockedShip.isDocked = true;
        dockedShip.dockedAtPortNumber = portNumber;
        dockedShip.hardDocked = true;
        dockedShip.dockingInProgress = false;

        target.dockedShips.push(dockedShip);

        this.game.hud.message("Docking Successful");
        target.landingMessage.setText('Press D to Release');
    }    

    releaseDock(){
        if(this.hardDocked && this.isDocked){
            game.physics.p2.removeConstraint(this.dockingConstraint);
            // Docking animation completed and ship is completely docked
/*
            this.game.physics.arcade.accelerationFromRotation(
                this.sprite.rotation - Math.PI,
                1000,
                this.sprite.body.acceleration
            );
*/
    	    var emitter = this.game.add.emitter(0,0,100);
            this.dockingConnector.addChild(emitter);
                
            emitter.makeParticles('cloud');
            emitter.gravity = 0;
            emitter.maxRotation = 100;
            emitter.minRotation = 30;
            emitter.minParticleScale = .01;
            emitter.maxParticleScale = .1;
            emitter.explode(200, game.rnd.integerInRange(7, 10));
            this.game.time.events.add(500, this.destroyEmitter, emitter);  
        }

        // Reset Docking
        this.abortDocking();
    }

    abortDocking(){
        //this.dockedToShip.landingMessage.setText('Press D to Dock');


        this.isDocked = false;
        this.dockedToShip = null;
        this.dockedAtPortNumber = null;
        this.hardDocked = false;
        this.dockingInProgress = false;
        this.dockingTarget = null;
    }
    
    // Cargo
    emptyCargoHold(){
        this.freeSpace = {};
        this.freeSpace[CARGO_STORAGE_CLASS.bulk] = this.specs.storage.bulk;
        this.freeSpace[CARGO_STORAGE_CLASS.passengers] = this.specs.storage.passengers;
        this.freeSpace[CARGO_STORAGE_CLASS.gas] = this.specs.storage.gas;
        this.freeSpace[CARGO_STORAGE_CLASS.liquid] = this.specs.storage.liquid;
    }

    // Info
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            //this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            //this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
            //this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
        
            this.infoShowing = true;
            this.dockingPort.visible = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
            this.dockingPort.visible = false;
        }
    }
    
    hideInfo(){
        this.game.add.tween(this.nameText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.subText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.landingMessage).to( { alpha: 0 }, 300, "Quart.easeOut", true);

        this.game.add.tween(this.subText).to( { y: '+30' }, 0, "Quart.easeOut", true);                
        this.game.add.tween(this.nameText).to( { y: '+30' }, 0, "Quart.easeOut", true);    
        this.game.add.tween(this.landingMessage).to( { y: '+30' }, 0, "Quart.easeOut", true);                

        this.infoShowing = false;
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }
    // Weapons + Damage Collisions

    processBulletCollision(ship, bullet){
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);
        
        //this.inflictDamage(bullet.damage);
        
        bullet.kill();
        return false; // Never collides, just dies.
    }

    
    // Rendering
    update() {
        super.update(); 
        this.positionInfo();        
        this.navigate();

        this.limitSpeed();

        if(this.specs.canBeDockedTo && this.sprite != this.game.player.ship.sprite){
            var a = this.dockingPort.worldPosition.x - this.game.player.ship.dockingConnector.worldPosition.x;
            var b = this.dockingPort.worldPosition.y - this.game.player.ship.dockingConnector.worldPosition.y;
            var d = Math.sqrt(a*a + b*b);
           
            // Rotation
            var r = Math.abs(Math.abs(this.sprite.angle - this.game.player.ship.sprite.angle) - 180); 

            if(d<15 && r<20){
                this.game.player.ship.okToDock = true;
                this.landingMessage.setText("Press D to Dock");
            } else {
                this.game.player.ship.okToDock = false;
                this.landingMessage.setText("Cleared to Dock");
            }
            
            // Update distance for info
            this.distanceToPlayer = this.game.physics.arcade.distanceBetween(
                this.sprite,
                this.game.player.sprite
            );

            this.showInfoIfNeeded();
        }

        if(this.isDocked || this.dockingInProgress){
            this.sprite.x += this.dockingTarget.sprite.deltaX;
            this.sprite.y += this.dockingTarget.sprite.deltaY;
        }

    }   
}



/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/engines/_engine.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Engine extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.currentSpool = 0;

        this.fuelConsumption = 1;

        this.thrust = 100;
        this.spoolUpSpeed = 1;
        this.spoolDownSpeed = .04;
    }

    set slot(slot){
        var slotAnchor = this.parentObject.specs.engineSlots[slot].anchor;
        this.flames.angle = this.parentObject.specs.engineSlots[slot].angle;
        this.flames.anchor.set(slotAnchor.x,slotAnchor.y);
    }

    accelerate(){
        if(this.currentSpool<=1){
            this.currentSpool = Math.min(this.currentSpool+this.spoolUpSpeed,1);
        }
        if(this.retro) {
            this.currentSpool = 1
        }
    }

    deaccelerate(){
        if(!this.retro) {
            this.currentSpool = Math.max(this.currentSpool-this.spoolDownSpeed,0)
        } else {
            this.currentSpool = Math.max(this.currentSpool-.1,0)            
        }
    }

    fire(){
        this.accelerate();
    }
    
    shutdown(){
        this.deaccelerate();    
    }

    update(){
        this.flames.alpha = this.currentSpool;    
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/engines/basicEngine.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicEngine extends Engine {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.thrust = 200;
        this.maxSpeed = 150;
        this.spoolUpSpeed =.08;
        this.spoolDownSpeed = .04;
        this.fuelConsumption = 1;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'blue_flame'));
        this.flames.blendMode = PIXI.blendModes.ADD;    
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/engines/smallEngine.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class SmallEngine extends Engine {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.thrust = 130;
        this.maxSpeed = 150;
        this.spoolUpSpeed =.08;
        this.spoolDownSpeed = .04;
        this.fuelConsumption = .8;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'blue_flame'));
        this.flames.blendMode = PIXI.blendModes.ADD;
        this.flames.scale.set(.6);
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/engines/_thruster.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Thruster extends Engine {
    constructor(game,parentObject,layout) {
        super(game,parentObject);

        this.engineType = ENGINE_TYPES.reactionControlThruster;
        this.thrust = 0;
        this.fuelConsumption = .1;

        this.spoolUpSpeed = .3;
        this.spoolDownSpeed = .6;

        this.layout = layout;

        this.flames = this.parentObject.sprite.addChild(this.game.make.sprite(0, 0, 'rcs_flame'));
        this.flames.x = layout.x-this.parentObject.sprite.width/2;
        this.flames.y = layout.y-this.parentObject.sprite.height/2;
        this.flames.angle = layout.angle;
        this.flames.scale.set(.9);
        this.flames.anchor.set(0,0);
        this.flames.blendMode = PIXI.blendModes.ADD;    

        var smoke = {
            image: 'smoke-trail',
            blendMode: 'HARD_LIGHT',
            lifespan: { min: 150, max: 400 },
            scale: { value: { min: .03, max: .1 } },
            vx: { value: { min: 0, max: 0 } },
            vy: { value: { min: 0, max: 0 }, delta: .2, control: [ { x: 0, y: 1 }, { x: 0, y: 0 } ] },
            alpha: { value: .3, control :[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }] },
            rotation: { value: 0, delta: { min: -2.0, max: 2.0 } }
        };

        this.emitter = this.game.ps.createEmitter(); 
        this.emitter.addToWorld();

        this.game.ps.addData('smoke', smoke);

    }
    accelerate(){
        super.accelerate();
        this.puff();
    }
    puff(){
        var px = this.flames.worldPosition.x + game.camera.x;
        var py = this.flames.worldPosition.y + game.camera.y;

        this.emitter.emit('smoke', px, py, { total: 1 });
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/pickup.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Pickup extends GameObject {
    constructor(game,group,x,y) {
        super(game);
     
        this.group = group        
        this.magneticDistance = 150;
    
        this.contents = new InventoryObject(this.game);
    }

    pickedUpBy(object){
        this.destroy();
        return object.collectNumberOfItems(1,this.contents);
    }

    processCollision(pickup,object){
        this.pickedUpBy(this.game.player.ship)
    }
            
    kill(){
        var fadeOut = this.game.add.tween(this.sprite).to( { alpha: 0 }, 2000, "Quart.easeIn", true);
        fadeOut.onComplete.add(function(){
            this.destroy();            
        }, this);
    }
           
    // Rendering
    update() {
        super.update();

        if(this.alive){
            var hits = this.game.physics.p2.hitTest(this.sprite.position);
            for (let hit of hits) {
                var target = hit.parent.sprite.parentObject;                
                if(target.canPickThingsUp) this.pickedUpBy(target);                
            }
        }
    }
    
    
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/flake.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class FlakePickup extends Pickup {
    constructor(game,group,x,y) {
        super(game);
     
        this.group = group

        // Basic Physics
        this.sprite = this.group.create(x,y,'asteroid-flake-'+game.rnd.integerInRange(1,3))
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.bounce.setTo(1, 1);
        this.sprite.body.collideWorldBounds = true;

        // Flake
        this.lifespan = game.rnd.realInRange(30,60);
        this.game.time.events.add(Phaser.Timer.SECOND * this.lifespan, this.kill, this);
        this.sprite.body.velocity.setTo(game.rnd.integerInRange(-20, 20),game.rnd.integerInRange(-20, 20));
        this.sprite.body.mass = 3;
        this.sprite.body.setSize(30, 30, 6, 6);
        this.sprite.body.checkCollision.up = false;
        this.sprite.body.checkCollision.down = false;
        this.sprite.body.checkCollision.left = false;
        this.sprite.body.checkCollision.right = false;
        this.roationSpeed = game.rnd.integerInRange(-50,50);
        this.sprite.anchor.set(0.5);

        var scale = game.rnd.realInRange(.5,1.25)
        this.sprite.scale.setTo(scale, scale);
        
        // Item
        var chance = game.rnd.realInRange(0,1);
        if(chance<RARITY_MINING_CHANCE.rare){
            this.contents = new Item_Paladium(this.game);            
        } else if(chance<RARITY_MINING_CHANCE.uncommon){
            this.contents = new Item_MeteoricIron(this.game);
        } else {
            this.contents = new Item_Flake(this.game);
        }            
    }

    processCollision(pickup,player){
        super.processCollision(pickup,player);
    }
        
    update() {
        super.update();
        // Spin
        if(this.sprite.alive){
            this.sprite.body.angularVelocity = this.roationSpeed;
    
            var distance = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
            if(distance<this.magneticDistance){
                this.game.physics.arcade.moveToObject(this.sprite, this.game.player.sprite, 100)
            }            
        }
    }
    
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/asteroid.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Asteroid extends GameObject {
    constructor(game,group,size,x,y) {
        super(game);
     
        this.group = group
           
        if(x==undefined) x = this.game.world.centerX+game.rnd.integerInRange(-1000, 1000);
        if(y==undefined) y = this.game.world.centerY+game.rnd.integerInRange(-1000, 1000);
        if(size==undefined) size = 'large';
        this.size = size;
        
        this.sprite = this.game.asteroids.create(x,y,'asteroid-'+size);
        this.sprite.parentObject = this;
        this.game.physics.p2.enable(this.sprite,P2BODY_DEBUG);

        this.sprite.body.clearShapes();
        this.sprite.body.damping = 0;

        if(size=='large'){
            this.health = game.rnd.integerInRange(150, 200);
            this.sprite.body.mass = 100;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(32);
            this.sprite.body.applyImpulseLocal([0,100],0,0)

            this.minimapSize = 1.2;
        } else if(size=='medium'){
            this.health = game.rnd.integerInRange(70, 100);

            this.sprite.body.mass = 50;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(20);
            this.sprite.body.applyImpulseLocal([0,10],0,0)

            this.minimapSize = .8;
        } else if(size=='small'){
            // Small
            this.health = game.rnd.integerInRange(20, 30);

            this.sprite.body.mass = 10;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(14);
            this.sprite.body.applyImpulseLocal([0,1],0,0)

            this.minimapSize = .5;
        }

        this.sprite.body.rotation = game.rnd.integerInRange(0, 360)
        this.sprite.anchor.set(0.5);

    }

    processBulletCollision(asteroid, bullet){        
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);
        
        this.inflictDamage(bullet.damage);
        
        bullet.kill();
        return false; // Never collides, just dies.
    }
        
    kill(){
        if(this.size=='large'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.explode();
            this.destroy();
            var a1 = new Asteroid(this.game,this.group,'medium',x-20,y-game.rnd.integerInRange(0,10));            
            var a2 = new Asteroid(this.game,this.group,'medium',x+20,y+game.rnd.integerInRange(0,10));
        } else if(this.size=='medium'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.destroy();
            var a1 = new Asteroid(this.game,this.group,'small',x-15,y-game.rnd.integerInRange(0,10));            
            var a2 = new Asteroid(this.game,this.group,'small',x+15,y+game.rnd.integerInRange(0,10));
        } else if(this.size=='small'){
            var x = this.sprite.x;
            var y = this.sprite.y;
            this.explode();         
            this.destroy();
            var flakeCount = game.rnd.integerInRange(3,6);

            for (var i = 0; i < flakeCount; i++) { 
                new FlakePickup(this.game,this.group,this.sprite.x,this.sprite.y)
            }

        }     
    } 
       
    explode(){
	    var emitter = this.game.add.emitter(this.sprite.x,this.sprite.y, 100);
        emitter.makeParticles('asteroid-flake-1');
        emitter.gravity = 0;
        emitter.maxRotation = 100;
        emitter.minRotation = 30;
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.explode(3500, game.rnd.integerInRange(5, 10));
        this.game.time.events.add(5000, this.destroyEmitter, emitter);        
    }
    
    // Rendering
    update() {
        super.update();
        
        // Spin
        this.sprite.body.angularVelocity = this.roationSpeed;
                
        // Collide with player's weapons
        for (let weapon of this.game.player.ship.weapons) {
            this.game.physics.arcade.collide(
                this.sprite, 
                weapon.weapon.bullets, 
                this.didCollide, 
                this.processBulletCollision, 
                this
            );
        }
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/asteroidField.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class AsteroidField extends GameObject {
    constructor(game,size,x,y) {
        super(game);

        if(x==undefined) x = this.game.world.centerX+game.rnd.integerInRange(-1500, 1500);
        if(y==undefined) y = this.game.world.centerY+game.rnd.integerInRange(-1500, 1500);
        if(size==undefined) size = 800;
        var densityLowerBound = 200;
        var densityUpperBound = 200;
        
        this.asteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.asteroids = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.asteroidsCount; i++) { 
            var xPos = this.game.world.centerX+game.rnd.integerInRange(x-size, x+size);
            var yPos = this.game.world.centerY+game.rnd.integerInRange(y-size, y+size);
            var asteroid = new Asteroid(this.game,this.asteroids,'large',xPos,yPos);
        }
    }
    
    update(){
        super.update();
        
        this.game.physics.arcade.collide(this.asteroids, this.asteroids);
    }
    
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/items/flake.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Item_Flake extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Asteroid Flake';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.common;
        this.mass = 10;
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/items/paladium.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Item_Paladium extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Raw Paladium';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.rare;
        this.mass = 20;
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/items/metoricIron.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Item_MeteoricIron extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Meteoric Iron';
        this.storageClass = CARGO_STORAGE_CLASS.bulk
        this.rarity = RARITY.uncommon;
        this.mass = 15;
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/ships/basicMiner.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicMiner extends Ship {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'MV Fair Rosamond',
            description : 'Cobalt Class Mining Vessel',
            health: 100,
            turnDecay: .03,
            turnAccel: .1,
            leftRightThrust: 100,
            maxTurning: 10,
            reverseThrust: 100,
            maxReverse: 90,
            maxFuel : 2200,
            maxEnergy: 100,
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
                bulk : 300,
                passengers : 2,
                gas : 0,
                liquid : 0,
            }
        }

        // Sprites
        
        
        this.sprite = this.game.add.sprite(x,y, 'mining_ship');
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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/ships/fuelTanker.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/ships/shuttle.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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
            size : {
                width : 45,
                height : 45,
                offsetX : 3,
                offsetY : -8,
            },
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
                    x: -3,
                    y: -24,
                    angle : 90,
                },
                inUse: false,
            },
            storage : {
                bulk : 10,
                passengers : 6,
                gas : 0,
                liquid : 0,
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
        var reactor = new Reactor(this.game,this);
        this.equipEquipmentInSlot(reactor,0);
        this.recharge();
        
        // Cargo
        this.emptyCargoHold();
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/weapons/basicMiningLaser.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicMiningLaser extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.baseBulletSpeed = 400;

        this.weapon = game.add.weapon(40, 'laser-sparkle');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 150;
        this.weapon.bulletSpeed = this.baseBulletSpeed;
        this.weapon.fireRate = 20;
        this.weapon.bulletAngleVariance = 1.5;
        this.weapon.bulletSpeedVariance = 90;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('scale.x', 0.3);
        this.weapon.bullets.setAll('scale.y', 0.1);
        this.weapon.bullets.setAll('damage',1);
        this.weapon.bullets.setAll('smoothed',false);
        this.weapon.setBulletBodyOffset(6, 6, 50, 30);
        
        // Should be on the ships
        this.game.ships.addChild(this.weapon.bullets)
        
        this.weapon.bullets.forEach(function(bullet){
            bullet.weapon = this;
            bullet.postUpdate = this.postUpdate;
        },this);

        this.energyConsumption = .3;
    }
    
    update(){
        this.weapon.bulletSpeed = this.parentObject.speed + this.baseBulletSpeed;
    }
}




/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/weapons/basicBlaster.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicBlaster extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.weapon = game.add.weapon(40, 'blasterBullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        this.weapon.bulletLifespan = 1000;
        this.weapon.bulletSpeed = 450;
        this.weapon.fireRate = 250;
        this.weapon.bulletAngleVariance = 0;
        this.weapon.bulletSpeedVariance = 10;
        this.weapon.bullets.alpha = 1;
        this.weapon.bullets.blendMode = PIXI.blendModes.ADD;
        this.weapon.bullets.setAll('damage',2);
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/planets/_planet.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Planet extends GameObject{
    constructor(game,x,y) {
        super(game);

        this.minimapSize = 2.3;
        this.distanceToPlayer;
        
        this.showInfoDistance = 90;
        this.infoShowing = false;
    }

    setupSprite(){
        this.sprite.anchor.setTo(.5, .5);
        this.sprite.smoothed = false;
                
        this.nameText = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y-20, 
            'pixelmix_8',
            this.name,
            8
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y, 
            'pixelmix_8',
            this.planetClass+' '+this.stellarObjectType,
            5
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.bitmapText(
            20+this.sprite.x + this.sprite.width/2, 
            this.sprite.y+40, 
            'pixelmix_8',
            'Press L to Land',
            5
        );
        this.landingMessage.alpha = 0;

        //messageText.alpha = 0;
        //this.game.planets.add(this);
        this.game.register(this);
    }
    
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
            this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
        
            this.infoShowing = true;
        }
        
        if(!this.shouldShowInfo && this.infoShowing){
            this.hideInfo();
            this.infoShowing = false;
        }
    }
    
    hideInfo(){
        this.game.add.tween(this.nameText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.subText).to( { alpha: 0 }, 300, "Quart.easeOut", true);        
        this.game.add.tween(this.landingMessage).to( { alpha: 0 }, 300, "Quart.easeOut", true);

        this.game.add.tween(this.subText).to( { y: '+30' }, 0, "Quart.easeOut", true);                
        this.game.add.tween(this.nameText).to( { y: '+30' }, 0, "Quart.easeOut", true);    
        this.game.add.tween(this.landingMessage).to( { y: '+30' }, 0, "Quart.easeOut", true);                

        this.infoShowing = false;
    }
    
    update() {
        super.update();
        //this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
        //this.showInfoIfNeeded();
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/planets/basicPlanet.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicPlanet extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'planet-1');
        this.sprite.scale.setTo(2, 2);

        this.name = "Blerreon IV"
        this.planetClass = "Class D"
        this.stellarObjectType = "Planet"

        this.setupSprite();
    }

    update() {
        super.update();
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/planets/basicMoon.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicMoon extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'moon-1');
        this.sprite.scale.setTo(1.3, 1.3);

        this.name = "Odros Moon"
        this.planetClass = "Mining Complex"
        this.stellarObjectType = ""
        this.showInfoDistance = 120;

        this.setupSprite();
    }

    update() {
        super.update();
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/player.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Player extends GameObject {
    constructor(game) {
        super(game);

        this.ship = new BasicMiner(game,this.game.world.centerX,this.game.world.centerY);
        this.sprite = this.ship.sprite;

        this.name = 'Dash Riprock';
        this._credits = 5000;

        // Keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);  

        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        dKey.onDown.add(this.ship.attemptToDock, this.ship);
    }
    
    get credits(){
        if(this._credits<999999){
            return CREDIT_PREFIX.short + numeral(this._credits).format('0,0');
        } else {
            return CREDIT_PREFIX.short + numeral(this._credits).format('(0.00 a)');
        }
    }
    
    update() {
        super.update();

        if (this.cursors.down.isDown) {
            this.ship.goInReverse();
        } else {
            this.ship.deaccelerate();
        }

        if (this.cursors.up.isDown) {
            this.ship.accelerate();
        } else {
            this.ship.deaccelerate();
        }
    
        if (this.cursors.left.isDown) {
            if(this.cursors.left.shiftKey){
                this.ship.moveLeft();
            } else {
                this.ship.turnLeft();
            }
        } else if (this.cursors.right.isDown) {
            if(this.cursors.right.shiftKey){
                this.ship.moveRight();
            } else {
                this.ship.turnRight();
            }
        } else {
            this.ship.deaccelerateTurning();
        }
        
        if (this.fireButton.isDown) {
            this.ship.firePrimaryWeapon();
        }
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/hud.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class HUD {
    constructor(game) {
        this.game = game;
        this.group = this.game.hudGroup;
        this.group.fixedToCamera = true;
        var x = this.game.camera.width-132;
        var y = 160

        this.background = this.group.add(new Phaser.Graphics(this.game.game,0,0));
        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,24,120,200,5)
        this.background.endFill();

        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,232,120,28,5)
        this.background.endFill();

        this.background.beginFill(0xFFFFFF);
        this.background.drawRoundedRect(x-8,268,120,52,5)
        this.background.endFill();

        this.background.alpha = .05;
    
        // HUD Elements        
        this.minimap = new Minimap(this.game,this);

        this.fuelProgressBar = new ProgressBar(this.game,this,'FUEL',x,y);
        this.game.register(this.fuelProgressBar)

        this.energyProgressBar = new ProgressBar(this.game,this,'ENERGY',x,y+43);
        this.game.register(this.energyProgressBar)

        // Credits
        this.creditsText = new Phaser.BitmapText(
            this.game.game, 
            x+100,
            y+82,
            'pixelmix_8',
            '',
            5
        );  
        this.group.add(this.creditsText);
        this.creditsText.anchor.set(1,0);

        this.creditsLabel = new Phaser.BitmapText(
            this.game.game, 
            x,
            this.creditsText.y,
            'pixelmix_8',
            CREDIT_PREFIX.long.toUpperCase(),
            5
        );  
        this.creditsLabel.tint = 0x948f9c;
        this.group.add(this.creditsLabel)

        // Cargo
        this.cargoText = new Phaser.BitmapText(
            this.game.game, 
            x+100,
            y+138,
            'pixelmix_8',
            '0',
            5
        );
        this.group.add(this.cargoText);
        this.cargoText.anchor.set(1,0);

        this.bulkText = new Phaser.BitmapText(
            this.game.game, 
            x,
            y+138,
            'pixelmix_8',
            'BULK',
            5
        );
        this.group.add(this.bulkText);


        this.cargoLabel = new Phaser.BitmapText(
            this.game.game, 
            x,
            y+118,
            'pixelmix_8',
            'CARGO',
            5
        );  
        this.cargoLabel.tint = 0x948f9c;
        this.group.add(this.cargoLabel)
    }
    
    title(message,submessage){
        var delay = 2000;
        
        var messageText = new Phaser.BitmapText(this.game.game, 32, this.game.camera.height-50, 'pixelmix_8',message,10);  
        messageText.alpha = 0;      
        this.group.add(messageText)

        var submessageText = new Phaser.BitmapText(this.game.game, 32, this.game.camera.height-25, 'pixelmix_8',submessage,8);        
        submessageText.alpha = 0;      
        this.group.add(submessageText)
            
        var fadeIn1 = this.game.add.tween(messageText).to( { alpha: 1 }, 1000, "Quart.easeOut", false);
    	var moveUp1 = this.game.add.tween(messageText).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut1 = this.game.add.tween(messageText).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay);
        fadeIn1.chain(fadeOut1);
        fadeIn1.start();

        var submessageDelay = 300;
        var fadeIn2 = this.game.add.tween(submessageText).to( { alpha: 1 }, 1000, "Quart.easeOut", false, submessageDelay);
    	var moveUp2 = this.game.add.tween(submessageText).to( { y: '-30' }, 300, "Quart.easeOut", true, submessageDelay);
        var fadeOut2 = this.game.add.tween(submessageText).to( { alpha: 0 }, 1500, "Quart.easeOut", false, delay-submessageDelay);    
        fadeIn2.chain(fadeOut2);
        fadeIn2.start();
    }
    message(message){
        var delay = 2000;
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-100, 
            'pixelmix_8',
            message,
            10
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
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-100, 
            'pixelmix_8',
            message,
            10
        );
        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
        messageText.alpha = 0;
    
        var fadeIn = this.game.add.tween(messageText).to( { alpha: 1 }, 300, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(messageText).to( { y: '-30' }, 300, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(messageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, delay);
    
        fadeIn.chain(fadeOut);
        fadeIn.start();
    }
    blinkingWarning(message){
        var delay = 2000;
        var messageText = this.game.add.bitmapText(
            this.game.camera.width/2, 
            this.game.camera.height-70, 
            'pixelmix_8',
            message,
            10
        );
        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
            
        var blink = this.game.add.tween(messageText).to({
            alpha: .5,
        }, 300, "Quart.easeOut", true, 0, 0, true).loop(true);
    }
    
    update() {
        this.minimap.update();
        this.fuelProgressBar.valuePercent = this.game.player.ship.fuelPercentage;
        this.energyProgressBar.valuePercent = this.game.player.ship.energyPercentage;
        
        this.creditsText.setText(`${this.game.player.credits}`);
        
        this.cargoText.setText(`${this.game.player.ship.bulkUsedSpace}/${this.game.player.ship.bulkMaxSpace}`);
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/minimap.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Minimap {
    constructor(game,hud) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.hud = hud;
        this.defaultScale = .03;
        this.scale = this.defaultScale;
        this.distanceFactor = 45;
            
        this.background = this.hud.group.create(32,32,'minimap-bg')
        this.background.tint = 0x504d54;

        this.dotsBitmapData = this.phaserGame.add.bitmapData(100);
        this.dotsBitmapData.ctx.fillStyle = '#EEEEEE';
        
        this.phaserGame.cache.addBitmapData('minimap-display', this.dotsBitmapData);
        this.mapDots = this.hud.group.create(
            this.background.x,
            this.background.y,
            this.phaserGame.cache.getBitmapData('minimap-display')
        )
    }
    update(){
        this.dotsBitmapData.clear();
        this.game.gameObjects.forEach(function(gameObject) {
                if(gameObject.sprite!=undefined){
                    var distance = this.game.physics.arcade.distanceBetween(gameObject.sprite, this.game.player.sprite);
                    if(distance<(this.distanceFactor/this.scale)){
                        var x = ((gameObject.sprite.x-this.game.player.ship.sprite.x)*this.scale)+50;
                        var y = ((gameObject.sprite.y-this.game.player.ship.sprite.y)*this.scale)+50;
                        var size = 1; // Default dot size
                        if(gameObject.minimapSize!=undefined){
                            size = gameObject.minimapSize;
                        }
                                                
                        this.dotsBitmapData.circle(x,y,size);
                    }
                    //this.dotsBitmapData.rect(0,0,100,100);
                }
        }.bind(this));
        this.dotsBitmapData.dirty = true;        
    }
    
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/progressBar.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class ProgressBar {
    constructor(game,hud,title,x,y) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.hud = hud;

        this.valuePercent = 0;
        this.title = title;

        this.barBitmapData = this.phaserGame.add.bitmapData(100);
        this.barBitmapData.ctx.fillStyle = '#EEEEEE';

        this.phaserGame.cache.addBitmapData('progbar', this.barBitmapData);
        this.barSprite = this.hud.group.create(
            x,
            y,
            this.phaserGame.cache.getBitmapData('progbar')
        )

        var label = new Phaser.BitmapText(
            this.game.game,
            x,
            y-15, 'pixelmix_8',
            this.title,
            5,
        );
        label.tint = 0x948f9c;
        this.hud.group.add(label)

        this.amountDisplay = new Phaser.BitmapText(
            this.game.game,
            x+100,
            label.y, 'pixelmix_8',
            '',
            5
        );
        this.amountDisplay.tint = 0xFFFFFF;
        this.amountDisplay.anchor.set(1,0);
        this.hud.group.add(this.amountDisplay)
        
    }
    update(){
        this.barBitmapData.clear();
        this.barBitmapData.ctx.fillStyle = '#504d54';
        this.barBitmapData.rect(0,0,100,10);

        this.barBitmapData.ctx.fillStyle = '#EEEEEE';
        this.barBitmapData.rect(0,0,this.valuePercent,10);

        this.amountDisplay.setText(this.valuePercent+"%");

        this.barBitmapData.dirty = true;        
    
    
    }
    
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/game.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


const screenWith = 1280/1.3
const screenHeight = 800/1.3

var game = new Phaser.Game(screenWith, screenHeight, Phaser.WEBGL, 'screen', {
    gameObjects : [],
    preload : function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.renderer.renderSession.roundPixels = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST

        this.load.image('planet-1', 'assets/planet-1.png');
        this.load.image('moon-1', 'assets/moon-1.png');
    
        this.load.image('bullet', 'default_assets/bullets/bullet11.png');
        this.load.image('null', 'assets/FFFFFF-0.png');
        this.load.image('blasterBullet', 'default_assets/bullets/bullet13.png');
        this.load.image('laser', 'default_assets/bullets/bullet05.png');
        this.load.image('laser-sparkle', 'default_assets/particles/red.png');
        this.load.image('stars', 'assets/stars_new.gif');
        this.load.image('blue_flame', 'assets/engines/blue_flame.png');
        this.load.image('rcs_flame', 'assets/engines/rcs.png');
        this.load.image('cloud', 'default_assets/particles/cloud.png');
        this.load.image('smoke-trail', 'default_assets/particlestorm/particles/white-smoke.png');
        this.load.image('dot', 'assets/map-dot.png');
        this.load.image('dock-arrow', 'assets/dock-indicator.png');
        
        // Roids
        this.load.image('asteroid-flake-1', 'assets/asteroid-flake-a.png');
        this.load.image('asteroid-flake-2', 'assets/asteroid-flake-b.png');
        this.load.image('asteroid-flake-3', 'assets/asteroid-flake-c.png');
        this.load.image('asteroid-large', 'assets/asteroid-large.png');
        this.load.image('asteroid-medium', 'assets/asteroid-medium.png');
        this.load.image('asteroid-small', 'assets/asteroid-small.png');

        // Ships
        this.load.image('mining_ship', 'assets/ships/miner.png');
        this.load.image('fuelTanker', 'assets/ships/fuelTanker.png');
        this.load.image('fuelTanker2', 'assets/ships/fuelTanker2.png');
        this.load.image('shuttle', 'assets/ships/shuttle.png');


        this.load.bitmapFont(
            'pixelmix_5',
            'assets/fonts/pixelmix0.png',
            'assets/fonts/pixelmix0.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_8',
            'assets/fonts/pixelmix1.png',
            'assets/fonts/pixelmix1.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_10',
            'assets/fonts/pixelmix2.png',
            'assets/fonts/pixelmix2.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_11',
            'assets/fonts/pixelmix3.png',
            'assets/fonts/pixelmix3.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_12',
            'assets/fonts/pixelmix_12.png',
            'assets/fonts/pixelmix_12.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_14',
            'assets/fonts/pixelmix4.png',
            'assets/fonts/pixelmix4.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_15',
            'assets/fonts/pixelmix5.png',
            'assets/fonts/pixelmix5.fnt'
        );
        this.load.bitmapFont(
            'pixelmix_20',
            'assets/fonts/pixelmix6.png',
            'assets/fonts/pixelmix6.fnt'
        );

        // Hud
        this.load.image('minimap-bg', 'assets/minimap-bg.png');
        this.load.image('minimap-dot', 'assets/map-dot.png');
        this.load.image('minimap-mask', 'assets/minimap-mask.png');
    },
    register : function(object){
        this.gameObjects.push(object);
    },
    unregister : function(object){
        var index = this.gameObjects.indexOf(object);
        if(index !== -1) {
          this.gameObjects.splice(index, 1);
        }
    },
    create : function(){
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.05;
        this.game.world.setBounds(0, 0, 50000, 50000);
        
        this.ps = this.game.plugins.add(Phaser.ParticleStorm);
        
        //  Tiled scrolling background
        this.stars = this.game.add.tileSprite(0, 0, screenWith, screenHeight, 'stars');
        this.stars.fixedToCamera = true;

        this.planets = this.game.add.group();
        this.asteroids = this.game.add.group();
        this.ships = this.game.add.group();
        
        var asteroidField = new AsteroidField(this,ASTEROID_FIELD_SIZE.large,4000,4000);
        var planet = new BasicPlanet(this,this.game.world.centerX,this.game.world.centerY);
        var moon = new BasicMoon(this,this.game.world.centerX+2600,this.game.world.centerY+400);

        //var ft = new FuelTanker(this,this.game.world.centerX+200,this.game.world.centerY-200);
        //ft.sprite.body.angle = 270;
        //ft.navigationMode = NAVIGATION_MODE.followWaypoints;

        this.game.world.bringToTop(this.asteroids);
        this.game.world.bringToTop(this.ships);
        this.player = new Player(this);

/*
        var fuelTanker2 = new FuelTanker(this);
        fuelTanker2.sprite.x = fuelTanker2.sprite.x+10;
        fuelTanker2.sprite.y = fuelTanker2.sprite.y-200;
*/
        //fuelTanker2.sprite.angle = 32;
        //fuelTanker2.deadSlowAhead();
        //this.game.physics.p2.world.bringToTop(this.player.sprite)

        // Camera
        this.game.camera.follow(this.player.sprite);
        this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
        this.game.camera.focusOnXY(this.game.world.centerX,this.game.world.centerY);
        var fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fKey.onDown.add(this.fullScreen, this);
        
        // HUD
        this.hudGroup = this.game.add.group();
        this.hud = new HUD(this);
        this.hud.title("Eta Blerreon System","June 12th, 2310");

        this.game.physics.p2.setImpactEvents(true);
    },
    update : function(){
        //this.game.physics.arcade.collide(this.ships, this.ships);

        // Update all registered objects
        this.gameObjects.forEach(function(gameObject) {
            gameObject.update();
        });
        
        // Move stars
        this.stars.tilePosition.x = -this.game.camera.x*0.8;
        this.stars.tilePosition.y = -this.game.camera.y*0.8;
        
        // Update minimap
        this.hud.update();
    },
    fullScreen : function(){
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        } else {
            this.game.scale.startFullScreen(false);
        }
    },
    render : function(){
        //this.game.debug.body(this.player.sprite);
        //this.game.debug.bodyInfo(this.player.sprite,32,32);

/*
        this.player.weapons.forEach(function(weapon) {
            weapon.weapon.debug(32,32,true);
        }, this);
*/

/*
        this.asteroids.forEach(function(asteroid) {
            this.game.debug.body(asteroid);
        }, this);
*/

/*
        this.ships.forEach(function(ship) {
            this.game.debug.body(ship);
            //ship.angle += 5;
        }, this);
*/
    },
});

Number.prototype.between = function(a, b, inclusive) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return inclusive ? this >= min && this <= max : this > min && this < max;
};