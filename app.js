

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js from "js.txt" begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/* Last merge : Mon Feb 26 14:47:27 PST 2018  */

/* Merging order :

- app/items/items.json
- lib/tiny-color.js
- lib/numeral.js
- lib/moment.js
- lib/filter_blurX.js
- lib/filter_blurY.js
- app/_constants.js
- app/_inventoryObject.js
- app/gameObjects/_gameObject.js
- app/systems/_system.js
- app/equipment/_equipment.js
- app/equipment/reactor.js
- app/equipment/batteries.js
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
- app/items/fuel.js
- app/ships/basicMiner.js
- app/ships/fuelTanker.js
- app/ships/shuttle.js
- app/weapons/basicMiningLaser.js
- app/weapons/basicBlaster.js
- app/planets/_planet.js
- app/planets/basicPlanet.js
- app/planets/basicMoon.js
- app/ships/buoy.js
- app/player.js
- app/hud.js
- app/minimap.js
- app/progressBar.js
- app/game.js
- app/gui/_guiScreen.js
- app/gui/arrival.js
- app/gui/exchange.js
- app/gui/button.js
- app/gui/twoLineButton.js
- app/gui/notification.js
- app/gui/inventoryList.js
- app/economy/_economy.js

*/


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/items/items.json begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


var ITEMS = [{
		"key": "meteoric_iron",
		"name": "Meteoric Iron",
		"type": "Mineral",
        "description" : "The dark mineral is a prized posession of 'belt miners. Apart from minor amounts of telluric iron, meteoric iron is the only naturally occurring native metal of the element iron on the Earth's surface.",
		"rarity": "uncommon",
		"storageClass": "bulk",
		"baseValue": 32,
		"mass": 15
	},
	{
		"key": "raw_paladium",
		"name": "Raw Paladium",
		"type": "Mineral",
        "description" : "William Hyde Wollaston noted the discovery of a this noble metal in July 1802 in his lab-book and named it palladium in August of the same year. Wollaston purified enough of the material and offered it, without naming the discoverer, in a small shop in Soho in April 1803.",
		"rarity": "rare",
		"storageClass": "bulk",
		"baseValue": 65,
		"mass": 20
	},
	{
		"key": "asteroid_flake",
		"name": "Asteroid Flake",
		"type": "Mineral",
        "description" : "A blackish grey flake, found after mining most asteroids.",
		"rarity": "common",
		"storageClass": "bulk",
		"baseValue": 12,
		"mass": 10
	},
	{
		"key": "potatoes",
		"name": "Potatoes",
        "description" : "The potato is a starchy, tuberous crop from the perennial nightshade Solanum tuberosum. Potato may be applied to both the plant and the edible tuber. Potatoes have become a staple food in many parts of the galaxy and an integral part of much of the galactic food supply.",
		"type": "Commodity",
		"rarity": "common",
		"storageClass": "bulk",
		"baseValue": 65,
		"mass": 100
	},
	{
		"key": "coffee",
		"name": "Coffee",
        "description" : "Coffee beans are the seeds of berries from the Coffea plant. The genus Coffea is native to tropical Africa (specifically having its origin on Earth in Ethiopia and Sudan) and Madagascar, the Comoros, Mauritius, and Réunion in the Indian Ocean. The plant was exported from Earth to planets around the galaxy. Coffee plants are now cultivated on over 70 off world settlements.",
		"type": "Commodity",
		"rarity": "common",
		"storageClass": "bulk",
		"baseValue": 870,
		"mass": 100
	},
	{
		"key": "aluminium",
		"name": "Aluminium",
		"type": "Metal",
		"rarity": "common",
		"storageClass": "bulk",
		"baseValue": 90,
		"mass": 10
	}
]

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: lib/tiny-color.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// 2016-07-07, Brian Grinstead, MIT License
!function(a){function b(a,d){if(a=a?a:"",d=d||{},a instanceof b)return a;if(!(this instanceof b))return new b(a,d);var e=c(a);this._originalInput=a,this._r=e.r,this._g=e.g,this._b=e.b,this._a=e.a,this._roundA=P(100*this._a)/100,this._format=d.format||e.format,this._gradientType=d.gradientType,this._r<1&&(this._r=P(this._r)),this._g<1&&(this._g=P(this._g)),this._b<1&&(this._b=P(this._b)),this._ok=e.ok,this._tc_id=O++}function c(a){var b={r:0,g:0,b:0},c=1,e=null,g=null,i=null,j=!1,k=!1;return"string"==typeof a&&(a=K(a)),"object"==typeof a&&(J(a.r)&&J(a.g)&&J(a.b)?(b=d(a.r,a.g,a.b),j=!0,k="%"===String(a.r).substr(-1)?"prgb":"rgb"):J(a.h)&&J(a.s)&&J(a.v)?(e=G(a.s),g=G(a.v),b=h(a.h,e,g),j=!0,k="hsv"):J(a.h)&&J(a.s)&&J(a.l)&&(e=G(a.s),i=G(a.l),b=f(a.h,e,i),j=!0,k="hsl"),a.hasOwnProperty("a")&&(c=a.a)),c=z(c),{ok:j,format:a.format||k,r:Q(255,R(b.r,0)),g:Q(255,R(b.g,0)),b:Q(255,R(b.b,0)),a:c}}function d(a,b,c){return{r:255*A(a,255),g:255*A(b,255),b:255*A(c,255)}}function e(a,b,c){a=A(a,255),b=A(b,255),c=A(c,255);var d,e,f=R(a,b,c),g=Q(a,b,c),h=(f+g)/2;if(f==g)d=e=0;else{var i=f-g;switch(e=h>.5?i/(2-f-g):i/(f+g),f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,l:h}}function f(a,b,c){function d(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+6*(b-a)*(2/3-c):a}var e,f,g;if(a=A(a,360),b=A(b,100),c=A(c,100),0===b)e=f=g=c;else{var h=.5>c?c*(1+b):c+b-c*b,i=2*c-h;e=d(i,h,a+1/3),f=d(i,h,a),g=d(i,h,a-1/3)}return{r:255*e,g:255*f,b:255*g}}function g(a,b,c){a=A(a,255),b=A(b,255),c=A(c,255);var d,e,f=R(a,b,c),g=Q(a,b,c),h=f,i=f-g;if(e=0===f?0:i/f,f==g)d=0;else{switch(f){case a:d=(b-c)/i+(c>b?6:0);break;case b:d=(c-a)/i+2;break;case c:d=(a-b)/i+4}d/=6}return{h:d,s:e,v:h}}function h(b,c,d){b=6*A(b,360),c=A(c,100),d=A(d,100);var e=a.floor(b),f=b-e,g=d*(1-c),h=d*(1-f*c),i=d*(1-(1-f)*c),j=e%6,k=[d,h,g,g,i,d][j],l=[i,d,d,h,g,g][j],m=[g,g,i,d,d,h][j];return{r:255*k,g:255*l,b:255*m}}function i(a,b,c,d){var e=[F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16))];return d&&e[0].charAt(0)==e[0].charAt(1)&&e[1].charAt(0)==e[1].charAt(1)&&e[2].charAt(0)==e[2].charAt(1)?e[0].charAt(0)+e[1].charAt(0)+e[2].charAt(0):e.join("")}function j(a,b,c,d,e){var f=[F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16)),F(H(d))];return e&&f[0].charAt(0)==f[0].charAt(1)&&f[1].charAt(0)==f[1].charAt(1)&&f[2].charAt(0)==f[2].charAt(1)&&f[3].charAt(0)==f[3].charAt(1)?f[0].charAt(0)+f[1].charAt(0)+f[2].charAt(0)+f[3].charAt(0):f.join("")}function k(a,b,c,d){var e=[F(H(d)),F(P(a).toString(16)),F(P(b).toString(16)),F(P(c).toString(16))];return e.join("")}function l(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.s-=c/100,d.s=B(d.s),b(d)}function m(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.s+=c/100,d.s=B(d.s),b(d)}function n(a){return b(a).desaturate(100)}function o(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.l+=c/100,d.l=B(d.l),b(d)}function p(a,c){c=0===c?0:c||10;var d=b(a).toRgb();return d.r=R(0,Q(255,d.r-P(255*-(c/100)))),d.g=R(0,Q(255,d.g-P(255*-(c/100)))),d.b=R(0,Q(255,d.b-P(255*-(c/100)))),b(d)}function q(a,c){c=0===c?0:c||10;var d=b(a).toHsl();return d.l-=c/100,d.l=B(d.l),b(d)}function r(a,c){var d=b(a).toHsl(),e=(d.h+c)%360;return d.h=0>e?360+e:e,b(d)}function s(a){var c=b(a).toHsl();return c.h=(c.h+180)%360,b(c)}function t(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+120)%360,s:c.s,l:c.l}),b({h:(d+240)%360,s:c.s,l:c.l})]}function u(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+90)%360,s:c.s,l:c.l}),b({h:(d+180)%360,s:c.s,l:c.l}),b({h:(d+270)%360,s:c.s,l:c.l})]}function v(a){var c=b(a).toHsl(),d=c.h;return[b(a),b({h:(d+72)%360,s:c.s,l:c.l}),b({h:(d+216)%360,s:c.s,l:c.l})]}function w(a,c,d){c=c||6,d=d||30;var e=b(a).toHsl(),f=360/d,g=[b(a)];for(e.h=(e.h-(f*c>>1)+720)%360;--c;)e.h=(e.h+f)%360,g.push(b(e));return g}function x(a,c){c=c||6;for(var d=b(a).toHsv(),e=d.h,f=d.s,g=d.v,h=[],i=1/c;c--;)h.push(b({h:e,s:f,v:g})),g=(g+i)%1;return h}function y(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[a[c]]=c);return b}function z(a){return a=parseFloat(a),(isNaN(a)||0>a||a>1)&&(a=1),a}function A(b,c){D(b)&&(b="100%");var d=E(b);return b=Q(c,R(0,parseFloat(b))),d&&(b=parseInt(b*c,10)/100),a.abs(b-c)<1e-6?1:b%c/parseFloat(c)}function B(a){return Q(1,R(0,a))}function C(a){return parseInt(a,16)}function D(a){return"string"==typeof a&&-1!=a.indexOf(".")&&1===parseFloat(a)}function E(a){return"string"==typeof a&&-1!=a.indexOf("%")}function F(a){return 1==a.length?"0"+a:""+a}function G(a){return 1>=a&&(a=100*a+"%"),a}function H(b){return a.round(255*parseFloat(b)).toString(16)}function I(a){return C(a)/255}function J(a){return!!V.CSS_UNIT.exec(a)}function K(a){a=a.replace(M,"").replace(N,"").toLowerCase();var b=!1;if(T[a])a=T[a],b=!0;else if("transparent"==a)return{r:0,g:0,b:0,a:0,format:"name"};var c;return(c=V.rgb.exec(a))?{r:c[1],g:c[2],b:c[3]}:(c=V.rgba.exec(a))?{r:c[1],g:c[2],b:c[3],a:c[4]}:(c=V.hsl.exec(a))?{h:c[1],s:c[2],l:c[3]}:(c=V.hsla.exec(a))?{h:c[1],s:c[2],l:c[3],a:c[4]}:(c=V.hsv.exec(a))?{h:c[1],s:c[2],v:c[3]}:(c=V.hsva.exec(a))?{h:c[1],s:c[2],v:c[3],a:c[4]}:(c=V.hex8.exec(a))?{r:C(c[1]),g:C(c[2]),b:C(c[3]),a:I(c[4]),format:b?"name":"hex8"}:(c=V.hex6.exec(a))?{r:C(c[1]),g:C(c[2]),b:C(c[3]),format:b?"name":"hex"}:(c=V.hex4.exec(a))?{r:C(c[1]+""+c[1]),g:C(c[2]+""+c[2]),b:C(c[3]+""+c[3]),a:I(c[4]+""+c[4]),format:b?"name":"hex8"}:(c=V.hex3.exec(a))?{r:C(c[1]+""+c[1]),g:C(c[2]+""+c[2]),b:C(c[3]+""+c[3]),format:b?"name":"hex"}:!1}function L(a){var b,c;return a=a||{level:"AA",size:"small"},b=(a.level||"AA").toUpperCase(),c=(a.size||"small").toLowerCase(),"AA"!==b&&"AAA"!==b&&(b="AA"),"small"!==c&&"large"!==c&&(c="small"),{level:b,size:c}}var M=/^\s+/,N=/\s+$/,O=0,P=a.round,Q=a.min,R=a.max,S=a.random;b.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var a=this.toRgb();return(299*a.r+587*a.g+114*a.b)/1e3},getLuminance:function(){var b,c,d,e,f,g,h=this.toRgb();return b=h.r/255,c=h.g/255,d=h.b/255,e=.03928>=b?b/12.92:a.pow((b+.055)/1.055,2.4),f=.03928>=c?c/12.92:a.pow((c+.055)/1.055,2.4),g=.03928>=d?d/12.92:a.pow((d+.055)/1.055,2.4),.2126*e+.7152*f+.0722*g},setAlpha:function(a){return this._a=z(a),this._roundA=P(100*this._a)/100,this},toHsv:function(){var a=g(this._r,this._g,this._b);return{h:360*a.h,s:a.s,v:a.v,a:this._a}},toHsvString:function(){var a=g(this._r,this._g,this._b),b=P(360*a.h),c=P(100*a.s),d=P(100*a.v);return 1==this._a?"hsv("+b+", "+c+"%, "+d+"%)":"hsva("+b+", "+c+"%, "+d+"%, "+this._roundA+")"},toHsl:function(){var a=e(this._r,this._g,this._b);return{h:360*a.h,s:a.s,l:a.l,a:this._a}},toHslString:function(){var a=e(this._r,this._g,this._b),b=P(360*a.h),c=P(100*a.s),d=P(100*a.l);return 1==this._a?"hsl("+b+", "+c+"%, "+d+"%)":"hsla("+b+", "+c+"%, "+d+"%, "+this._roundA+")"},toHex:function(a){return i(this._r,this._g,this._b,a)},toHexString:function(a){return"#"+this.toHex(a)},toHex8:function(a){return j(this._r,this._g,this._b,this._a,a)},toHex8String:function(a){return"#"+this.toHex8(a)},toRgb:function(){return{r:P(this._r),g:P(this._g),b:P(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+P(this._r)+", "+P(this._g)+", "+P(this._b)+")":"rgba("+P(this._r)+", "+P(this._g)+", "+P(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:P(100*A(this._r,255))+"%",g:P(100*A(this._g,255))+"%",b:P(100*A(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+P(100*A(this._r,255))+"%, "+P(100*A(this._g,255))+"%, "+P(100*A(this._b,255))+"%)":"rgba("+P(100*A(this._r,255))+"%, "+P(100*A(this._g,255))+"%, "+P(100*A(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":this._a<1?!1:U[i(this._r,this._g,this._b,!0)]||!1},toFilter:function(a){var c="#"+k(this._r,this._g,this._b,this._a),d=c,e=this._gradientType?"GradientType = 1, ":"";if(a){var f=b(a);d="#"+k(f._r,f._g,f._b,f._a)}return"progid:DXImageTransform.Microsoft.gradient("+e+"startColorstr="+c+",endColorstr="+d+")"},toString:function(a){var b=!!a;a=a||this._format;var c=!1,d=this._a<1&&this._a>=0,e=!b&&d&&("hex"===a||"hex6"===a||"hex3"===a||"hex4"===a||"hex8"===a||"name"===a);return e?"name"===a&&0===this._a?this.toName():this.toRgbString():("rgb"===a&&(c=this.toRgbString()),"prgb"===a&&(c=this.toPercentageRgbString()),("hex"===a||"hex6"===a)&&(c=this.toHexString()),"hex3"===a&&(c=this.toHexString(!0)),"hex4"===a&&(c=this.toHex8String(!0)),"hex8"===a&&(c=this.toHex8String()),"name"===a&&(c=this.toName()),"hsl"===a&&(c=this.toHslString()),"hsv"===a&&(c=this.toHsvString()),c||this.toHexString())},clone:function(){return b(this.toString())},_applyModification:function(a,b){var c=a.apply(null,[this].concat([].slice.call(b)));return this._r=c._r,this._g=c._g,this._b=c._b,this.setAlpha(c._a),this},lighten:function(){return this._applyModification(o,arguments)},brighten:function(){return this._applyModification(p,arguments)},darken:function(){return this._applyModification(q,arguments)},desaturate:function(){return this._applyModification(l,arguments)},saturate:function(){return this._applyModification(m,arguments)},greyscale:function(){return this._applyModification(n,arguments)},spin:function(){return this._applyModification(r,arguments)},_applyCombination:function(a,b){return a.apply(null,[this].concat([].slice.call(b)))},analogous:function(){return this._applyCombination(w,arguments)},complement:function(){return this._applyCombination(s,arguments)},monochromatic:function(){return this._applyCombination(x,arguments)},splitcomplement:function(){return this._applyCombination(v,arguments)},triad:function(){return this._applyCombination(t,arguments)},tetrad:function(){return this._applyCombination(u,arguments)}},b.fromRatio=function(a,c){if("object"==typeof a){var d={};for(var e in a)a.hasOwnProperty(e)&&(d[e]="a"===e?a[e]:G(a[e]));a=d}return b(a,c)},b.equals=function(a,c){return a&&c?b(a).toRgbString()==b(c).toRgbString():!1},b.random=function(){return b.fromRatio({r:S(),g:S(),b:S()})},b.mix=function(a,c,d){d=0===d?0:d||50;var e=b(a).toRgb(),f=b(c).toRgb(),g=d/100,h={r:(f.r-e.r)*g+e.r,g:(f.g-e.g)*g+e.g,b:(f.b-e.b)*g+e.b,a:(f.a-e.a)*g+e.a};return b(h)},b.readability=function(c,d){var e=b(c),f=b(d);return(a.max(e.getLuminance(),f.getLuminance())+.05)/(a.min(e.getLuminance(),f.getLuminance())+.05)},b.isReadable=function(a,c,d){var e,f,g=b.readability(a,c);switch(f=!1,e=L(d),e.level+e.size){case"AAsmall":case"AAAlarge":f=g>=4.5;break;case"AAlarge":f=g>=3;break;case"AAAsmall":f=g>=7}return f},b.mostReadable=function(a,c,d){var e,f,g,h,i=null,j=0;d=d||{},f=d.includeFallbackColors,g=d.level,h=d.size;for(var k=0;k<c.length;k++)e=b.readability(a,c[k]),e>j&&(j=e,i=b(c[k]));return b.isReadable(a,i,{level:g,size:h})||!f?i:(d.includeFallbackColors=!1,b.mostReadable(a,["#fff","#000"],d))};var T=b.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},U=b.hexNames=y(T),V=function(){var a="[-\\+]?\\d+%?",b="[-\\+]?\\d*\\.\\d+%?",c="(?:"+b+")|(?:"+a+")",d="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?",e="[\\s|\\(]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")[,|\\s]+("+c+")\\s*\\)?";return{CSS_UNIT:new RegExp(c),rgb:new RegExp("rgb"+d),rgba:new RegExp("rgba"+e),hsl:new RegExp("hsl"+d),hsla:new RegExp("hsla"+e),hsv:new RegExp("hsv"+d),hsva:new RegExp("hsva"+e),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof module&&module.exports?module.exports=b:"function"==typeof define&&define.amd?define(function(){return b}):window.tinycolor=b}(Math);

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
/* Merging js: lib/moment.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";function e(){return Qe.apply(null,arguments)}function t(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function n(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function s(e){return void 0===e}function i(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function r(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function a(e,t){var n,s=[];for(n=0;n<e.length;++n)s.push(t(e[n],n));return s}function o(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function u(e,t){for(var n in t)o(t,n)&&(e[n]=t[n]);return o(t,"toString")&&(e.toString=t.toString),o(t,"valueOf")&&(e.valueOf=t.valueOf),e}function l(e,t,n,s){return ge(e,t,n,s,!0).utc()}function d(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function h(e){if(null==e._isValid){var t=d(e),n=Xe.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function c(e){var t=l(NaN);return null!=e?u(d(t),e):d(t).userInvalidated=!0,t}function f(e,t){var n,i,r;if(s(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),s(t._i)||(e._i=t._i),s(t._f)||(e._f=t._f),s(t._l)||(e._l=t._l),s(t._strict)||(e._strict=t._strict),s(t._tzm)||(e._tzm=t._tzm),s(t._isUTC)||(e._isUTC=t._isUTC),s(t._offset)||(e._offset=t._offset),s(t._pf)||(e._pf=d(t)),s(t._locale)||(e._locale=t._locale),Ke.length>0)for(n=0;n<Ke.length;n++)s(r=t[i=Ke[n]])||(e[i]=r);return e}function m(t){f(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===et&&(et=!0,e.updateOffset(this),et=!1)}function _(e){return e instanceof m||null!=e&&null!=e._isAMomentObject}function y(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function g(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=y(t)),n}function p(e,t,n){var s,i=Math.min(e.length,t.length),r=Math.abs(e.length-t.length),a=0;for(s=0;s<i;s++)(n&&e[s]!==t[s]||!n&&g(e[s])!==g(t[s]))&&a++;return a+r}function w(t){!1===e.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function v(t,n){var s=!0;return u(function(){if(null!=e.deprecationHandler&&e.deprecationHandler(null,t),s){for(var i,r=[],a=0;a<arguments.length;a++){if(i="","object"==typeof arguments[a]){i+="\n["+a+"] ";for(var o in arguments[0])i+=o+": "+arguments[0][o]+", ";i=i.slice(0,-2)}else i=arguments[a];r.push(i)}w(t+"\nArguments: "+Array.prototype.slice.call(r).join("")+"\n"+(new Error).stack),s=!1}return n.apply(this,arguments)},n)}function M(t,n){null!=e.deprecationHandler&&e.deprecationHandler(t,n),tt[t]||(w(n),tt[t]=!0)}function S(e){return e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function D(e,t){var s,i=u({},e);for(s in t)o(t,s)&&(n(e[s])&&n(t[s])?(i[s]={},u(i[s],e[s]),u(i[s],t[s])):null!=t[s]?i[s]=t[s]:delete i[s]);for(s in e)o(e,s)&&!o(t,s)&&n(e[s])&&(i[s]=u({},i[s]));return i}function k(e){null!=e&&this.set(e)}function Y(e,t){var n=e.toLowerCase();st[n]=st[n+"s"]=st[t]=e}function O(e){return"string"==typeof e?st[e]||st[e.toLowerCase()]:void 0}function T(e){var t,n,s={};for(n in e)o(e,n)&&(t=O(n))&&(s[t]=e[n]);return s}function x(e,t){it[e]=t}function b(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(e>=0?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}function P(e,t,n,s){var i=s;"string"==typeof s&&(i=function(){return this[s]()}),e&&(ut[e]=i),t&&(ut[t[0]]=function(){return b(i.apply(this,arguments),t[1],t[2])}),n&&(ut[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function W(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function H(e,t){return e.isValid()?(t=R(t,e.localeData()),ot[t]=ot[t]||function(e){var t,n,s=e.match(rt);for(t=0,n=s.length;t<n;t++)ut[s[t]]?s[t]=ut[s[t]]:s[t]=W(s[t]);return function(t){var i,r="";for(i=0;i<n;i++)r+=S(s[i])?s[i].call(t,e):s[i];return r}}(t),ot[t](e)):e.localeData().invalidDate()}function R(e,t){function n(e){return t.longDateFormat(e)||e}var s=5;for(at.lastIndex=0;s>=0&&at.test(e);)e=e.replace(at,n),at.lastIndex=0,s-=1;return e}function C(e,t,n){Yt[e]=S(t)?t:function(e,s){return e&&n?n:t}}function F(e,t){return o(Yt,e)?Yt[e](t._strict,t._locale):new RegExp(function(e){return U(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i}))}(e))}function U(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function L(e,t){var n,s=t;for("string"==typeof e&&(e=[e]),i(t)&&(s=function(e,n){n[t]=g(e)}),n=0;n<e.length;n++)Ot[e[n]]=s}function N(e,t){L(e,function(e,n,s,i){s._w=s._w||{},t(e,s._w,s,i)})}function G(e,t,n){null!=t&&o(Ot,e)&&Ot[e](t,n._a,n,e)}function V(e){return E(e)?366:365}function E(e){return e%4==0&&e%100!=0||e%400==0}function I(t,n){return function(s){return null!=s?(j(this,t,s),e.updateOffset(this,n),this):A(this,t)}}function A(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function j(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&E(e.year())&&1===e.month()&&29===e.date()?e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),Z(n,e.month())):e._d["set"+(e._isUTC?"UTC":"")+t](n))}function Z(e,t){if(isNaN(e)||isNaN(t))return NaN;var n=function(e,t){return(e%t+t)%t}(t,12);return e+=(t-n)/12,1===n?E(e)?29:28:31-n%7%2}function z(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=g(t);else if(t=e.localeData().monthsParse(t),!i(t))return e;return n=Math.min(e.date(),Z(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function $(t){return null!=t?(z(this,t),e.updateOffset(this,!0),this):A(this,"Month")}function q(){function e(e,t){return t.length-e.length}var t,n,s=[],i=[],r=[];for(t=0;t<12;t++)n=l([2e3,t]),s.push(this.monthsShort(n,"")),i.push(this.months(n,"")),r.push(this.months(n,"")),r.push(this.monthsShort(n,""));for(s.sort(e),i.sort(e),r.sort(e),t=0;t<12;t++)s[t]=U(s[t]),i[t]=U(i[t]);for(t=0;t<24;t++)r[t]=U(r[t]);this._monthsRegex=new RegExp("^("+r.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+s.join("|")+")","i")}function J(e){var t=new Date(Date.UTC.apply(null,arguments));return e<100&&e>=0&&isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e),t}function B(e,t,n){var s=7+t-n;return-((7+J(e,0,s).getUTCDay()-t)%7)+s-1}function Q(e,t,n,s,i){var r,a,o=1+7*(t-1)+(7+n-s)%7+B(e,s,i);return o<=0?a=V(r=e-1)+o:o>V(e)?(r=e+1,a=o-V(e)):(r=e,a=o),{year:r,dayOfYear:a}}function X(e,t,n){var s,i,r=B(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+K(i=e.year()-1,t,n):a>K(e.year(),t,n)?(s=a-K(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function K(e,t,n){var s=B(e,t,n),i=B(e+1,t,n);return(V(e)-s+i)/7}function ee(){function e(e,t){return t.length-e.length}var t,n,s,i,r,a=[],o=[],u=[],d=[];for(t=0;t<7;t++)n=l([2e3,1]).day(t),s=this.weekdaysMin(n,""),i=this.weekdaysShort(n,""),r=this.weekdays(n,""),a.push(s),o.push(i),u.push(r),d.push(s),d.push(i),d.push(r);for(a.sort(e),o.sort(e),u.sort(e),d.sort(e),t=0;t<7;t++)o[t]=U(o[t]),u[t]=U(u[t]),d[t]=U(d[t]);this._weekdaysRegex=new RegExp("^("+d.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+a.join("|")+")","i")}function te(){return this.hours()%12||12}function ne(e,t){P(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function se(e,t){return t._meridiemParse}function ie(e){return e?e.toLowerCase().replace("_","-"):e}function re(e){var t=null;if(!Xt[e]&&"undefined"!=typeof module&&module&&module.exports)try{t=Jt._abbr;require("./locale/"+e),ae(t)}catch(e){}return Xt[e]}function ae(e,t){var n;return e&&(n=s(t)?ue(e):oe(e,t))&&(Jt=n),Jt._abbr}function oe(e,t){if(null!==t){var n=Qt;if(t.abbr=e,null!=Xt[e])M("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),n=Xt[e]._config;else if(null!=t.parentLocale){if(null==Xt[t.parentLocale])return Kt[t.parentLocale]||(Kt[t.parentLocale]=[]),Kt[t.parentLocale].push({name:e,config:t}),null;n=Xt[t.parentLocale]._config}return Xt[e]=new k(D(n,t)),Kt[e]&&Kt[e].forEach(function(e){oe(e.name,e.config)}),ae(e),Xt[e]}return delete Xt[e],null}function ue(e){var n;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return Jt;if(!t(e)){if(n=re(e))return n;e=[e]}return function(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=ie(e[r]).split("-")).length,n=(n=ie(e[r+1]))?n.split("-"):null;t>0;){if(s=re(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&p(i,n,!0)>=t-1)break;t--}r++}return null}(e)}function le(e){var t,n=e._a;return n&&-2===d(e).overflow&&(t=n[xt]<0||n[xt]>11?xt:n[bt]<1||n[bt]>Z(n[Tt],n[xt])?bt:n[Pt]<0||n[Pt]>24||24===n[Pt]&&(0!==n[Wt]||0!==n[Ht]||0!==n[Rt])?Pt:n[Wt]<0||n[Wt]>59?Wt:n[Ht]<0||n[Ht]>59?Ht:n[Rt]<0||n[Rt]>999?Rt:-1,d(e)._overflowDayOfYear&&(t<Tt||t>bt)&&(t=bt),d(e)._overflowWeeks&&-1===t&&(t=Ct),d(e)._overflowWeekday&&-1===t&&(t=Ft),d(e).overflow=t),e}function de(e,t,n){return null!=e?e:null!=t?t:n}function he(t){var n,s,i,r,a,o=[];if(!t._d){for(i=function(t){var n=new Date(e.now());return t._useUTC?[n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()]:[n.getFullYear(),n.getMonth(),n.getDate()]}(t),t._w&&null==t._a[bt]&&null==t._a[xt]&&function(e){var t,n,s,i,r,a,o,u;if(null!=(t=e._w).GG||null!=t.W||null!=t.E)r=1,a=4,n=de(t.GG,e._a[Tt],X(pe(),1,4).year),s=de(t.W,1),((i=de(t.E,1))<1||i>7)&&(u=!0);else{r=e._locale._week.dow,a=e._locale._week.doy;var l=X(pe(),r,a);n=de(t.gg,e._a[Tt],l.year),s=de(t.w,l.week),null!=t.d?((i=t.d)<0||i>6)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||t.e>6)&&(u=!0)):i=r}s<1||s>K(n,r,a)?d(e)._overflowWeeks=!0:null!=u?d(e)._overflowWeekday=!0:(o=Q(n,s,i,r,a),e._a[Tt]=o.year,e._dayOfYear=o.dayOfYear)}(t),null!=t._dayOfYear&&(a=de(t._a[Tt],i[Tt]),(t._dayOfYear>V(a)||0===t._dayOfYear)&&(d(t)._overflowDayOfYear=!0),s=J(a,0,t._dayOfYear),t._a[xt]=s.getUTCMonth(),t._a[bt]=s.getUTCDate()),n=0;n<3&&null==t._a[n];++n)t._a[n]=o[n]=i[n];for(;n<7;n++)t._a[n]=o[n]=null==t._a[n]?2===n?1:0:t._a[n];24===t._a[Pt]&&0===t._a[Wt]&&0===t._a[Ht]&&0===t._a[Rt]&&(t._nextDay=!0,t._a[Pt]=0),t._d=(t._useUTC?J:function(e,t,n,s,i,r,a){var o=new Date(e,t,n,s,i,r,a);return e<100&&e>=0&&isFinite(o.getFullYear())&&o.setFullYear(e),o}).apply(null,o),r=t._useUTC?t._d.getUTCDay():t._d.getDay(),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),t._nextDay&&(t._a[Pt]=24),t._w&&void 0!==t._w.d&&t._w.d!==r&&(d(t).weekdayMismatch=!0)}}function ce(e){var t,n,s,i,r,a,o=e._i,u=en.exec(o)||tn.exec(o);if(u){for(d(e).iso=!0,t=0,n=sn.length;t<n;t++)if(sn[t][1].exec(u[1])){i=sn[t][0],s=!1!==sn[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=rn.length;t<n;t++)if(rn[t][1].exec(u[3])){r=(u[2]||" ")+rn[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!nn.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),_e(e)}else e._isValid=!1}function fe(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),Vt.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}function me(e){var t=on.exec(function(e){return e.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").trim()}(e._i));if(t){var n=fe(t[4],t[3],t[2],t[5],t[6],t[7]);if(!function(e,t,n){if(e&&jt.indexOf(e)!==new Date(t[0],t[1],t[2]).getDay())return d(n).weekdayMismatch=!0,n._isValid=!1,!1;return!0}(t[1],n,e))return;e._a=n,e._tzm=function(e,t,n){if(e)return un[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return(s-i)/100*60+i}(t[8],t[9],t[10]),e._d=J.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),d(e).rfc2822=!0}else e._isValid=!1}function _e(t){if(t._f!==e.ISO_8601)if(t._f!==e.RFC_2822){t._a=[],d(t).empty=!0;var n,s,i,r,a,o=""+t._i,u=o.length,l=0;for(i=R(t._f,t._locale).match(rt)||[],n=0;n<i.length;n++)r=i[n],(s=(o.match(F(r,t))||[])[0])&&((a=o.substr(0,o.indexOf(s))).length>0&&d(t).unusedInput.push(a),o=o.slice(o.indexOf(s)+s.length),l+=s.length),ut[r]?(s?d(t).empty=!1:d(t).unusedTokens.push(r),G(r,s,t)):t._strict&&!s&&d(t).unusedTokens.push(r);d(t).charsLeftOver=u-l,o.length>0&&d(t).unusedInput.push(o),t._a[Pt]<=12&&!0===d(t).bigHour&&t._a[Pt]>0&&(d(t).bigHour=void 0),d(t).parsedDateParts=t._a.slice(0),d(t).meridiem=t._meridiem,t._a[Pt]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):null!=e.isPM?((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0),t):t}(t._locale,t._a[Pt],t._meridiem),he(t),le(t)}else me(t);else ce(t)}function ye(o){var l=o._i,y=o._f;return o._locale=o._locale||ue(o._l),null===l||void 0===y&&""===l?c({nullInput:!0}):("string"==typeof l&&(o._i=l=o._locale.preparse(l)),_(l)?new m(le(l)):(r(l)?o._d=l:t(y)?function(e){var t,n,s,i,r;if(0===e._f.length)return d(e).invalidFormat=!0,void(e._d=new Date(NaN));for(i=0;i<e._f.length;i++)r=0,t=f({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],_e(t),h(t)&&(r+=d(t).charsLeftOver,r+=10*d(t).unusedTokens.length,d(t).score=r,(null==s||r<s)&&(s=r,n=t));u(e,n||t)}(o):y?_e(o):function(o){var u=o._i;s(u)?o._d=new Date(e.now()):r(u)?o._d=new Date(u.valueOf()):"string"==typeof u?function(t){var n=an.exec(t._i);null===n?(ce(t),!1===t._isValid&&(delete t._isValid,me(t),!1===t._isValid&&(delete t._isValid,e.createFromInputFallback(t)))):t._d=new Date(+n[1])}(o):t(u)?(o._a=a(u.slice(0),function(e){return parseInt(e,10)}),he(o)):n(u)?function(e){if(!e._d){var t=T(e._i);e._a=a([t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),he(e)}}(o):i(u)?o._d=new Date(u):e.createFromInputFallback(o)}(o),h(o)||(o._d=null),o))}function ge(e,s,i,r,a){var o={};return!0!==i&&!1!==i||(r=i,i=void 0),(n(e)&&function(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0}(e)||t(e)&&0===e.length)&&(e=void 0),o._isAMomentObject=!0,o._useUTC=o._isUTC=a,o._l=i,o._i=e,o._f=s,o._strict=r,function(e){var t=new m(le(ye(e)));return t._nextDay&&(t.add(1,"d"),t._nextDay=void 0),t}(o)}function pe(e,t,n,s){return ge(e,t,n,s,!1)}function we(e,n){var s,i;if(1===n.length&&t(n[0])&&(n=n[0]),!n.length)return pe();for(s=n[0],i=1;i<n.length;++i)n[i].isValid()&&!n[i][e](s)||(s=n[i]);return s}function ve(e){var t=T(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,d=t.millisecond||0;this._isValid=function(e){for(var t in e)if(-1===Ut.call(hn,t)||null!=e[t]&&isNaN(e[t]))return!1;for(var n=!1,s=0;s<hn.length;++s)if(e[hn[s]]){if(n)return!1;parseFloat(e[hn[s]])!==g(e[hn[s]])&&(n=!0)}return!0}(t),this._milliseconds=+d+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=ue(),this._bubble()}function Me(e){return e instanceof ve}function Se(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function De(e,t){P(e,0,0,function(){var e=this.utcOffset(),n="+";return e<0&&(e=-e,n="-"),n+b(~~(e/60),2)+t+b(~~e%60,2)})}function ke(e,t){var n=(t||"").match(e);if(null===n)return null;var s=((n[n.length-1]||[])+"").match(cn)||["-",0,0],i=60*s[1]+g(s[2]);return 0===i?0:"+"===s[0]?i:-i}function Ye(t,n){var s,i;return n._isUTC?(s=n.clone(),i=(_(t)||r(t)?t.valueOf():pe(t).valueOf())-s.valueOf(),s._d.setTime(s._d.valueOf()+i),e.updateOffset(s,!1),s):pe(t).local()}function Oe(e){return 15*-Math.round(e._d.getTimezoneOffset()/15)}function Te(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}function xe(e,t){var n,s,r,a=e,u=null;return Me(e)?a={ms:e._milliseconds,d:e._days,M:e._months}:i(e)?(a={},t?a[t]=e:a.milliseconds=e):(u=fn.exec(e))?(n="-"===u[1]?-1:1,a={y:0,d:g(u[bt])*n,h:g(u[Pt])*n,m:g(u[Wt])*n,s:g(u[Ht])*n,ms:g(Se(1e3*u[Rt]))*n}):(u=mn.exec(e))?(n="-"===u[1]?-1:(u[1],1),a={y:be(u[2],n),M:be(u[3],n),w:be(u[4],n),d:be(u[5],n),h:be(u[6],n),m:be(u[7],n),s:be(u[8],n)}):null==a?a={}:"object"==typeof a&&("from"in a||"to"in a)&&(r=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Ye(t,e),e.isBefore(t)?n=Pe(e,t):((n=Pe(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(pe(a.from),pe(a.to)),(a={}).ms=r.milliseconds,a.M=r.months),s=new ve(a),Me(e)&&o(e,"_locale")&&(s._locale=e._locale),s}function be(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function Pe(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t-+e.clone().add(n.months,"M"),n}function We(e,t){return function(n,s){var i,r;return null===s||isNaN(+s)||(M(t,"moment()."+t+"(period, number) is deprecated. Please use moment()."+t+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),r=n,n=s,s=r),n="string"==typeof n?+n:n,i=xe(n,s),He(this,i,e),this}}function He(t,n,s,i){var r=n._milliseconds,a=Se(n._days),o=Se(n._months);t.isValid()&&(i=null==i||i,o&&z(t,A(t,"Month")+o*s),a&&j(t,"Date",A(t,"Date")+a*s),r&&t._d.setTime(t._d.valueOf()+r*s),i&&e.updateOffset(t,a||o))}function Re(e,t){var n,s=12*(t.year()-e.year())+(t.month()-e.month()),i=e.clone().add(s,"months");return n=t-i<0?(t-i)/(i-e.clone().add(s-1,"months")):(t-i)/(e.clone().add(s+1,"months")-i),-(s+n)||0}function Ce(e){var t;return void 0===e?this._locale._abbr:(null!=(t=ue(e))&&(this._locale=t),this)}function Fe(){return this._locale}function Ue(e,t){P(0,[e,e.length],0,t)}function Le(e,t,n,s,i){var r;return null==e?X(this,s,i).year:(r=K(e,s,i),t>r&&(t=r),function(e,t,n,s,i){var r=Q(e,t,n,s,i),a=J(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}function Ne(e,t){t[Rt]=g(1e3*("0."+e))}function Ge(e){return e}function Ve(e,t,n,s){var i=ue(),r=l().set(s,t);return i[n](r,e)}function Ee(e,t,n){if(i(e)&&(t=e,e=void 0),e=e||"",null!=t)return Ve(e,t,n,"month");var s,r=[];for(s=0;s<12;s++)r[s]=Ve(e,s,n,"month");return r}function Ie(e,t,n,s){"boolean"==typeof e?(i(t)&&(n=t,t=void 0),t=t||""):(n=t=e,e=!1,i(t)&&(n=t,t=void 0),t=t||"");var r=ue(),a=e?r._week.dow:0;if(null!=n)return Ve(t,(n+a)%7,s,"day");var o,u=[];for(o=0;o<7;o++)u[o]=Ve(t,(o+a)%7,s,"day");return u}function Ae(e,t,n,s){var i=xe(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function je(e){return e<0?Math.floor(e):Math.ceil(e)}function Ze(e){return 4800*e/146097}function ze(e){return 146097*e/4800}function $e(e){return function(){return this.as(e)}}function qe(e){return function(){return this.isValid()?this._data[e]:NaN}}function Je(e){return(e>0)-(e<0)||+e}function Be(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n=An(this._milliseconds)/1e3,s=An(this._days),i=An(this._months);t=y((e=y(n/60))/60),n%=60,e%=60;var r=y(i/12),a=i%=12,o=s,u=t,l=e,d=n?n.toFixed(3).replace(/\.?0+$/,""):"",h=this.asSeconds();if(!h)return"P0D";var c=h<0?"-":"",f=Je(this._months)!==Je(h)?"-":"",m=Je(this._days)!==Je(h)?"-":"",_=Je(this._milliseconds)!==Je(h)?"-":"";return c+"P"+(r?f+r+"Y":"")+(a?f+a+"M":"")+(o?m+o+"D":"")+(u||l||d?"T":"")+(u?_+u+"H":"")+(l?_+l+"M":"")+(d?_+d+"S":"")}var Qe,Xe;Xe=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var Ke=e.momentProperties=[],et=!1,tt={};e.suppressDeprecationWarnings=!1,e.deprecationHandler=null;var nt;nt=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)o(e,t)&&n.push(t);return n};var st={},it={},rt=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,at=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,ot={},ut={},lt=/\d/,dt=/\d\d/,ht=/\d{3}/,ct=/\d{4}/,ft=/[+-]?\d{6}/,mt=/\d\d?/,_t=/\d\d\d\d?/,yt=/\d\d\d\d\d\d?/,gt=/\d{1,3}/,pt=/\d{1,4}/,wt=/[+-]?\d{1,6}/,vt=/\d+/,Mt=/[+-]?\d+/,St=/Z|[+-]\d\d:?\d\d/gi,Dt=/Z|[+-]\d\d(?::?\d\d)?/gi,kt=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,Yt={},Ot={},Tt=0,xt=1,bt=2,Pt=3,Wt=4,Ht=5,Rt=6,Ct=7,Ft=8;P("Y",0,0,function(){var e=this.year();return e<=9999?""+e:"+"+e}),P(0,["YY",2],0,function(){return this.year()%100}),P(0,["YYYY",4],0,"year"),P(0,["YYYYY",5],0,"year"),P(0,["YYYYYY",6,!0],0,"year"),Y("year","y"),x("year",1),C("Y",Mt),C("YY",mt,dt),C("YYYY",pt,ct),C("YYYYY",wt,ft),C("YYYYYY",wt,ft),L(["YYYYY","YYYYYY"],Tt),L("YYYY",function(t,n){n[Tt]=2===t.length?e.parseTwoDigitYear(t):g(t)}),L("YY",function(t,n){n[Tt]=e.parseTwoDigitYear(t)}),L("Y",function(e,t){t[Tt]=parseInt(e,10)}),e.parseTwoDigitYear=function(e){return g(e)+(g(e)>68?1900:2e3)};var Ut,Lt=I("FullYear",!0);Ut=Array.prototype.indexOf?Array.prototype.indexOf:function(e){var t;for(t=0;t<this.length;++t)if(this[t]===e)return t;return-1},P("M",["MM",2],"Mo",function(){return this.month()+1}),P("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),P("MMMM",0,0,function(e){return this.localeData().months(this,e)}),Y("month","M"),x("month",8),C("M",mt),C("MM",mt,dt),C("MMM",function(e,t){return t.monthsShortRegex(e)}),C("MMMM",function(e,t){return t.monthsRegex(e)}),L(["M","MM"],function(e,t){t[xt]=g(e)-1}),L(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[xt]=i:d(n).invalidMonth=e});var Nt=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Gt="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Vt="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Et=kt,It=kt;P("w",["ww",2],"wo","week"),P("W",["WW",2],"Wo","isoWeek"),Y("week","w"),Y("isoWeek","W"),x("week",5),x("isoWeek",5),C("w",mt),C("ww",mt,dt),C("W",mt),C("WW",mt,dt),N(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=g(e)});P("d",0,"do","day"),P("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),P("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),P("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),P("e",0,0,"weekday"),P("E",0,0,"isoWeekday"),Y("day","d"),Y("weekday","e"),Y("isoWeekday","E"),x("day",11),x("weekday",11),x("isoWeekday",11),C("d",mt),C("e",mt),C("E",mt),C("dd",function(e,t){return t.weekdaysMinRegex(e)}),C("ddd",function(e,t){return t.weekdaysShortRegex(e)}),C("dddd",function(e,t){return t.weekdaysRegex(e)}),N(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:d(n).invalidWeekday=e}),N(["d","e","E"],function(e,t,n,s){t[s]=g(e)});var At="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),jt="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),Zt="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),zt=kt,$t=kt,qt=kt;P("H",["HH",2],0,"hour"),P("h",["hh",2],0,te),P("k",["kk",2],0,function(){return this.hours()||24}),P("hmm",0,0,function(){return""+te.apply(this)+b(this.minutes(),2)}),P("hmmss",0,0,function(){return""+te.apply(this)+b(this.minutes(),2)+b(this.seconds(),2)}),P("Hmm",0,0,function(){return""+this.hours()+b(this.minutes(),2)}),P("Hmmss",0,0,function(){return""+this.hours()+b(this.minutes(),2)+b(this.seconds(),2)}),ne("a",!0),ne("A",!1),Y("hour","h"),x("hour",13),C("a",se),C("A",se),C("H",mt),C("h",mt),C("k",mt),C("HH",mt,dt),C("hh",mt,dt),C("kk",mt,dt),C("hmm",_t),C("hmmss",yt),C("Hmm",_t),C("Hmmss",yt),L(["H","HH"],Pt),L(["k","kk"],function(e,t,n){var s=g(e);t[Pt]=24===s?0:s}),L(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),L(["h","hh"],function(e,t,n){t[Pt]=g(e),d(n).bigHour=!0}),L("hmm",function(e,t,n){var s=e.length-2;t[Pt]=g(e.substr(0,s)),t[Wt]=g(e.substr(s)),d(n).bigHour=!0}),L("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[Pt]=g(e.substr(0,s)),t[Wt]=g(e.substr(s,2)),t[Ht]=g(e.substr(i)),d(n).bigHour=!0}),L("Hmm",function(e,t,n){var s=e.length-2;t[Pt]=g(e.substr(0,s)),t[Wt]=g(e.substr(s))}),L("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[Pt]=g(e.substr(0,s)),t[Wt]=g(e.substr(s,2)),t[Ht]=g(e.substr(i))});var Jt,Bt=I("Hours",!0),Qt={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Gt,monthsShort:Vt,week:{dow:0,doy:6},weekdays:At,weekdaysMin:Zt,weekdaysShort:jt,meridiemParse:/[ap]\.?m?\.?/i},Xt={},Kt={},en=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,tn=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,nn=/Z|[+-]\d\d(?::?\d\d)?/,sn=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],rn=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],an=/^\/?Date\((\-?\d+)/i,on=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,un={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};e.createFromInputFallback=v("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),e.ISO_8601=function(){},e.RFC_2822=function(){};var ln=v("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=pe.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:c()}),dn=v("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=pe.apply(null,arguments);return this.isValid()&&e.isValid()?e>this?this:e:c()}),hn=["year","quarter","month","week","day","hour","minute","second","millisecond"];De("Z",":"),De("ZZ",""),C("Z",Dt),C("ZZ",Dt),L(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=ke(Dt,e)});var cn=/([\+\-]|\d\d)/gi;e.updateOffset=function(){};var fn=/^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,mn=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;xe.fn=ve.prototype,xe.invalid=function(){return xe(NaN)};var _n=We(1,"add"),yn=We(-1,"subtract");e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",e.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var gn=v("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});P(0,["gg",2],0,function(){return this.weekYear()%100}),P(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ue("gggg","weekYear"),Ue("ggggg","weekYear"),Ue("GGGG","isoWeekYear"),Ue("GGGGG","isoWeekYear"),Y("weekYear","gg"),Y("isoWeekYear","GG"),x("weekYear",1),x("isoWeekYear",1),C("G",Mt),C("g",Mt),C("GG",mt,dt),C("gg",mt,dt),C("GGGG",pt,ct),C("gggg",pt,ct),C("GGGGG",wt,ft),C("ggggg",wt,ft),N(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=g(e)}),N(["gg","GG"],function(t,n,s,i){n[i]=e.parseTwoDigitYear(t)}),P("Q",0,"Qo","quarter"),Y("quarter","Q"),x("quarter",7),C("Q",lt),L("Q",function(e,t){t[xt]=3*(g(e)-1)}),P("D",["DD",2],"Do","date"),Y("date","D"),x("date",9),C("D",mt),C("DD",mt,dt),C("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),L(["D","DD"],bt),L("Do",function(e,t){t[bt]=g(e.match(mt)[0])});var pn=I("Date",!0);P("DDD",["DDDD",3],"DDDo","dayOfYear"),Y("dayOfYear","DDD"),x("dayOfYear",4),C("DDD",gt),C("DDDD",ht),L(["DDD","DDDD"],function(e,t,n){n._dayOfYear=g(e)}),P("m",["mm",2],0,"minute"),Y("minute","m"),x("minute",14),C("m",mt),C("mm",mt,dt),L(["m","mm"],Wt);var wn=I("Minutes",!1);P("s",["ss",2],0,"second"),Y("second","s"),x("second",15),C("s",mt),C("ss",mt,dt),L(["s","ss"],Ht);var vn=I("Seconds",!1);P("S",0,0,function(){return~~(this.millisecond()/100)}),P(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),P(0,["SSS",3],0,"millisecond"),P(0,["SSSS",4],0,function(){return 10*this.millisecond()}),P(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),P(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),P(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),P(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),P(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),Y("millisecond","ms"),x("millisecond",16),C("S",gt,lt),C("SS",gt,dt),C("SSS",gt,ht);var Mn;for(Mn="SSSS";Mn.length<=9;Mn+="S")C(Mn,vt);for(Mn="S";Mn.length<=9;Mn+="S")L(Mn,Ne);var Sn=I("Milliseconds",!1);P("z",0,0,"zoneAbbr"),P("zz",0,0,"zoneName");var Dn=m.prototype;Dn.add=_n,Dn.calendar=function(t,n){var s=t||pe(),i=Ye(s,this).startOf("day"),r=e.calendarFormat(this,i)||"sameElse",a=n&&(S(n[r])?n[r].call(this,s):n[r]);return this.format(a||this.localeData().calendar(r,this,pe(s)))},Dn.clone=function(){return new m(this)},Dn.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Ye(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=O(t)){case"year":r=Re(this,s)/12;break;case"month":r=Re(this,s);break;case"quarter":r=Re(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:y(r)},Dn.endOf=function(e){return void 0===(e=O(e))||"millisecond"===e?this:("date"===e&&(e="day"),this.startOf(e).add(1,"isoWeek"===e?"week":e).subtract(1,"ms"))},Dn.format=function(t){t||(t=this.isUtc()?e.defaultFormatUtc:e.defaultFormat);var n=H(this,t);return this.localeData().postformat(n)},Dn.from=function(e,t){return this.isValid()&&(_(e)&&e.isValid()||pe(e).isValid())?xe({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},Dn.fromNow=function(e){return this.from(pe(),e)},Dn.to=function(e,t){return this.isValid()&&(_(e)&&e.isValid()||pe(e).isValid())?xe({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},Dn.toNow=function(e){return this.to(pe(),e)},Dn.get=function(e){return e=O(e),S(this[e])?this[e]():this},Dn.invalidAt=function(){return d(this).overflow},Dn.isAfter=function(e,t){var n=_(e)?e:pe(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=O(s(t)?"millisecond":t))?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},Dn.isBefore=function(e,t){var n=_(e)?e:pe(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=O(s(t)?"millisecond":t))?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},Dn.isBetween=function(e,t,n,s){return("("===(s=s||"()")[0]?this.isAfter(e,n):!this.isBefore(e,n))&&(")"===s[1]?this.isBefore(t,n):!this.isAfter(t,n))},Dn.isSame=function(e,t){var n,s=_(e)?e:pe(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=O(t||"millisecond"))?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},Dn.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},Dn.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},Dn.isValid=function(){return h(this)},Dn.lang=gn,Dn.locale=Ce,Dn.localeData=Fe,Dn.max=dn,Dn.min=ln,Dn.parsingFlags=function(){return u({},d(this))},Dn.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t=[];for(var n in e)t.push({unit:n,priority:it[n]});return t.sort(function(e,t){return e.priority-t.priority}),t}(e=T(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(e=O(e),S(this[e]))return this[e](t);return this},Dn.startOf=function(e){switch(e=O(e)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===e&&this.weekday(0),"isoWeek"===e&&this.isoWeekday(1),"quarter"===e&&this.month(3*Math.floor(this.month()/3)),this},Dn.subtract=yn,Dn.toArray=function(){return[this.year(),this.month(),this.date(),this.hour(),this.minute(),this.second(),this.millisecond()]},Dn.toObject=function(){return{years:this.year(),months:this.month(),date:this.date(),hours:this.hours(),minutes:this.minutes(),seconds:this.seconds(),milliseconds:this.milliseconds()}},Dn.toDate=function(){return new Date(this.valueOf())},Dn.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||n.year()>9999?H(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):S(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this._d.valueOf()).toISOString().replace("Z",H(n,"Z")):H(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},Dn.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e="moment",t="";this.isLocal()||(e=0===this.utcOffset()?"moment.utc":"moment.parseZone",t="Z");var n="["+e+'("]',s=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",i=t+'[")]';return this.format(n+s+"-MM-DD[T]HH:mm:ss.SSS"+i)},Dn.toJSON=function(){return this.isValid()?this.toISOString():null},Dn.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},Dn.unix=function(){return Math.floor(this.valueOf()/1e3)},Dn.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},Dn.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},Dn.year=Lt,Dn.isLeapYear=function(){return E(this.year())},Dn.weekYear=function(e){return Le.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},Dn.isoWeekYear=function(e){return Le.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},Dn.quarter=Dn.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},Dn.month=$,Dn.daysInMonth=function(){return Z(this.year(),this.month())},Dn.week=Dn.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},Dn.isoWeek=Dn.isoWeeks=function(e){var t=X(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},Dn.weeksInYear=function(){var e=this.localeData()._week;return K(this.year(),e.dow,e.doy)},Dn.isoWeeksInYear=function(){return K(this.year(),1,4)},Dn.date=pn,Dn.day=Dn.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(e=function(e,t){return"string"!=typeof e?e:isNaN(e)?"number"==typeof(e=t.weekdaysParse(e))?e:null:parseInt(e,10)}(e,this.localeData()),this.add(e-t,"d")):t},Dn.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},Dn.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null!=e){var t=function(e,t){return"string"==typeof e?t.weekdaysParse(e)%7||7:isNaN(e)?null:e}(e,this.localeData());return this.day(this.day()%7?t:t-7)}return this.day()||7},Dn.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},Dn.hour=Dn.hours=Bt,Dn.minute=Dn.minutes=wn,Dn.second=Dn.seconds=vn,Dn.millisecond=Dn.milliseconds=Sn,Dn.utcOffset=function(t,n,s){var i,r=this._offset||0;if(!this.isValid())return null!=t?this:NaN;if(null!=t){if("string"==typeof t){if(null===(t=ke(Dt,t)))return this}else Math.abs(t)<16&&!s&&(t*=60);return!this._isUTC&&n&&(i=Oe(this)),this._offset=t,this._isUTC=!0,null!=i&&this.add(i,"m"),r!==t&&(!n||this._changeInProgress?He(this,xe(t-r,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null)),this}return this._isUTC?r:Oe(this)},Dn.utc=function(e){return this.utcOffset(0,e)},Dn.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Oe(this),"m")),this},Dn.parseZone=function(){if(null!=this._tzm)this.utcOffset(this._tzm,!1,!0);else if("string"==typeof this._i){var e=ke(St,this._i);null!=e?this.utcOffset(e):this.utcOffset(0,!0)}return this},Dn.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?pe(e).utcOffset():0,(this.utcOffset()-e)%60==0)},Dn.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},Dn.isLocal=function(){return!!this.isValid()&&!this._isUTC},Dn.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},Dn.isUtc=Te,Dn.isUTC=Te,Dn.zoneAbbr=function(){return this._isUTC?"UTC":""},Dn.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},Dn.dates=v("dates accessor is deprecated. Use date instead.",pn),Dn.months=v("months accessor is deprecated. Use month instead",$),Dn.years=v("years accessor is deprecated. Use year instead",Lt),Dn.zone=v("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),Dn.isDSTShifted=v("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!s(this._isDSTShifted))return this._isDSTShifted;var e={};if(f(e,this),(e=ye(e))._a){var t=e._isUTC?l(e._a):pe(e._a);this._isDSTShifted=this.isValid()&&p(e._a,t.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted});var kn=k.prototype;kn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return S(s)?s.call(t,n):s},kn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e])},kn.invalidDate=function(){return this._invalidDate},kn.ordinal=function(e){return this._ordinal.replace("%d",e)},kn.preparse=Ge,kn.postformat=Ge,kn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return S(i)?i(e,t,n,s):i.replace(/%d/i,e)},kn.pastFuture=function(e,t){var n=this._relativeTime[e>0?"future":"past"];return S(n)?n(t):n.replace(/%s/i,t)},kn.set=function(e){var t,n;for(n in e)S(t=e[n])?this[n]=t:this["_"+n]=t;this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},kn.months=function(e,n){return e?t(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Nt).test(n)?"format":"standalone"][e.month()]:t(this._months)?this._months:this._months.standalone},kn.monthsShort=function(e,n){return e?t(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Nt.test(n)?"format":"standalone"][e.month()]:t(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},kn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=l([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=Ut.call(this._shortMonthsParse,a))?i:null:-1!==(i=Ut.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=Ut.call(this._shortMonthsParse,a))?i:-1!==(i=Ut.call(this._longMonthsParse,a))?i:null:-1!==(i=Ut.call(this._longMonthsParse,a))?i:-1!==(i=Ut.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=l([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},kn.monthsRegex=function(e){return this._monthsParseExact?(o(this,"_monthsRegex")||q.call(this),e?this._monthsStrictRegex:this._monthsRegex):(o(this,"_monthsRegex")||(this._monthsRegex=It),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},kn.monthsShortRegex=function(e){return this._monthsParseExact?(o(this,"_monthsRegex")||q.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(o(this,"_monthsShortRegex")||(this._monthsShortRegex=Et),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},kn.week=function(e){return X(e,this._week.dow,this._week.doy).week},kn.firstDayOfYear=function(){return this._week.doy},kn.firstDayOfWeek=function(){return this._week.dow},kn.weekdays=function(e,n){return e?t(this._weekdays)?this._weekdays[e.day()]:this._weekdays[this._weekdays.isFormat.test(n)?"format":"standalone"][e.day()]:t(this._weekdays)?this._weekdays:this._weekdays.standalone},kn.weekdaysMin=function(e){return e?this._weekdaysMin[e.day()]:this._weekdaysMin},kn.weekdaysShort=function(e){return e?this._weekdaysShort[e.day()]:this._weekdaysShort},kn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=l([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=Ut.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ut.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=Ut.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=Ut.call(this._weekdaysParse,a))?i:-1!==(i=Ut.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ut.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=Ut.call(this._shortWeekdaysParse,a))?i:-1!==(i=Ut.call(this._weekdaysParse,a))?i:-1!==(i=Ut.call(this._minWeekdaysParse,a))?i:null:-1!==(i=Ut.call(this._minWeekdaysParse,a))?i:-1!==(i=Ut.call(this._weekdaysParse,a))?i:-1!==(i=Ut.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=l([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".",".?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},kn.weekdaysRegex=function(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(o(this,"_weekdaysRegex")||(this._weekdaysRegex=zt),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},kn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(o(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=$t),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},kn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(o(this,"_weekdaysRegex")||ee.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(o(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=qt),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},kn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},kn.meridiem=function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},ae("en",{dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===g(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th")}}),e.lang=v("moment.lang is deprecated. Use moment.locale instead.",ae),e.langData=v("moment.langData is deprecated. Use moment.localeData instead.",ue);var Yn=Math.abs,On=$e("ms"),Tn=$e("s"),xn=$e("m"),bn=$e("h"),Pn=$e("d"),Wn=$e("w"),Hn=$e("M"),Rn=$e("y"),Cn=qe("milliseconds"),Fn=qe("seconds"),Un=qe("minutes"),Ln=qe("hours"),Nn=qe("days"),Gn=qe("months"),Vn=qe("years"),En=Math.round,In={ss:44,s:45,m:45,h:22,d:26,M:11},An=Math.abs,jn=ve.prototype;return jn.isValid=function(){return this._isValid},jn.abs=function(){var e=this._data;return this._milliseconds=Yn(this._milliseconds),this._days=Yn(this._days),this._months=Yn(this._months),e.milliseconds=Yn(e.milliseconds),e.seconds=Yn(e.seconds),e.minutes=Yn(e.minutes),e.hours=Yn(e.hours),e.months=Yn(e.months),e.years=Yn(e.years),this},jn.add=function(e,t){return Ae(this,e,t,1)},jn.subtract=function(e,t){return Ae(this,e,t,-1)},jn.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=O(e))||"year"===e)return t=this._days+s/864e5,n=this._months+Ze(t),"month"===e?n:n/12;switch(t=this._days+Math.round(ze(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},jn.asMilliseconds=On,jn.asSeconds=Tn,jn.asMinutes=xn,jn.asHours=bn,jn.asDays=Pn,jn.asWeeks=Wn,jn.asMonths=Hn,jn.asYears=Rn,jn.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*g(this._months/12):NaN},jn._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return r>=0&&a>=0&&o>=0||r<=0&&a<=0&&o<=0||(r+=864e5*je(ze(o)+a),a=0,o=0),u.milliseconds=r%1e3,e=y(r/1e3),u.seconds=e%60,t=y(e/60),u.minutes=t%60,n=y(t/60),u.hours=n%24,a+=y(n/24),i=y(Ze(a)),o+=i,a-=je(ze(i)),s=y(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},jn.clone=function(){return xe(this)},jn.get=function(e){return e=O(e),this.isValid()?this[e+"s"]():NaN},jn.milliseconds=Cn,jn.seconds=Fn,jn.minutes=Un,jn.hours=Ln,jn.days=Nn,jn.weeks=function(){return y(this.days()/7)},jn.months=Gn,jn.years=Vn,jn.humanize=function(e){if(!this.isValid())return this.localeData().invalidDate();var t=this.localeData(),n=function(e,t,n){var s=xe(e).abs(),i=En(s.as("s")),r=En(s.as("m")),a=En(s.as("h")),o=En(s.as("d")),u=En(s.as("M")),l=En(s.as("y")),d=i<=In.ss&&["s",i]||i<In.s&&["ss",i]||r<=1&&["m"]||r<In.m&&["mm",r]||a<=1&&["h"]||a<In.h&&["hh",a]||o<=1&&["d"]||o<In.d&&["dd",o]||u<=1&&["M"]||u<In.M&&["MM",u]||l<=1&&["y"]||["yy",l];return d[2]=t,d[3]=+e>0,d[4]=n,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,d)}(this,!e,t);return e&&(n=t.pastFuture(+this,n)),t.postformat(n)},jn.toISOString=Be,jn.toString=Be,jn.toJSON=Be,jn.locale=Ce,jn.localeData=Fe,jn.toIsoString=v("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Be),jn.lang=gn,P("X",0,0,"unix"),P("x",0,0,"valueOf"),C("x",Mt),C("X",/[+-]?\d+(\.\d{1,3})?/),L("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e,10))}),L("x",function(e,t,n){n._d=new Date(g(e))}),e.version="2.20.1",function(e){Qe=e}(pe),e.fn=Dn,e.min=function(){return we("isBefore",[].slice.call(arguments,0))},e.max=function(){return we("isAfter",[].slice.call(arguments,0))},e.now=function(){return Date.now?Date.now():+new Date},e.utc=l,e.unix=function(e){return pe(1e3*e)},e.months=function(e,t){return Ee(e,t,"months")},e.isDate=r,e.locale=ae,e.invalid=c,e.duration=xe,e.isMoment=_,e.weekdays=function(e,t,n){return Ie(e,t,n,"weekdays")},e.parseZone=function(){return pe.apply(null,arguments).parseZone()},e.localeData=ue,e.isDuration=Me,e.monthsShort=function(e,t){return Ee(e,t,"monthsShort")},e.weekdaysMin=function(e,t,n){return Ie(e,t,n,"weekdaysMin")},e.defineLocale=oe,e.updateLocale=function(e,t){if(null!=t){var n,s,i=Qt;null!=(s=re(e))&&(i=s._config),(n=new k(t=D(i,t))).parentLocale=Xt[e],Xt[e]=n,ae(e)}else null!=Xt[e]&&(null!=Xt[e].parentLocale?Xt[e]=Xt[e].parentLocale:null!=Xt[e]&&delete Xt[e]);return Xt[e]},e.locales=function(){return nt(Xt)},e.weekdaysShort=function(e,t,n){return Ie(e,t,n,"weekdaysShort")},e.normalizeUnits=O,e.relativeTimeRounding=function(e){return void 0===e?En:"function"==typeof e&&(En=e,!0)},e.relativeTimeThreshold=function(e,t){return void 0!==In[e]&&(void 0===t?In[e]:(In[e]=t,"s"===e&&(In.ss=t-1),!0))},e.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},e.prototype=Dn,e.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"YYYY-[W]WW",MONTH:"YYYY-MM"},e});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: lib/filter_blurX.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
* A horizontal blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.BlurX = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1 / 512 };

    this.fragmentSrc = [

      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "varying vec4 vColor;",
      "uniform float blur;",
      "uniform sampler2D uSampler;",

        "void main(void) {",

          "vec4 sum = vec4(0.0);",

          "sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;",

          "gl_FragColor = sum;",

        "}"
    ];

};

Phaser.Filter.BlurX.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BlurX.prototype.constructor = Phaser.Filter.BlurX;

Object.defineProperty(Phaser.Filter.BlurX.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }

});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: lib/filter_blurY.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
* A vertical blur filter by Mat Groves http://matgroves.com/ @Doormat23
*/
Phaser.Filter.BlurY = function (game) {

    Phaser.Filter.call(this, game);

    this.uniforms.blur = { type: '1f', value: 1 / 512 };

    this.fragmentSrc = [

      "precision mediump float;",
      "varying vec2 vTextureCoord;",
      "varying vec4 vColor;",
      "uniform float blur;",
      "uniform sampler2D uSampler;",

        "void main(void) {",

          "vec4 sum = vec4(0.0);",

          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;",
          "sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;",

          "gl_FragColor = sum;",

        "}"

    ];

};

Phaser.Filter.BlurY.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.BlurY.prototype.constructor = Phaser.Filter.BlurY;

Object.defineProperty(Phaser.Filter.BlurY.prototype, 'blur', {

    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },

    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value = (1/7000) * value;
    }

});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/_constants.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


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

DISTANCE_FACTOR = 97;

// Convert from degrees to radians.
Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

// Convert from radians to degrees.
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}

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
}

const CARGO_STORAGE_CLASS_NAMES = {
    bulk : 'Bulk',
    passengers : 'Passenger',
    gas : 'Gas',
    liquid : 'Liquid',
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

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/_inventoryObject.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


// Things you can pickup and sell.
class InventoryObject {
    constructor(game,options = false) {
        this.game = game;

        this.name = 'Unknown Object';
        this.baseValue = 0;
        this.type = 'Unknown'
        this.mass = 0;
        this.rarity = RARITY.common;
    
        if(options) this.initWithData(options);
    }    
    
    initWithData(options){
        for(var prop in options) this[prop] = options[prop]
    }

    static make(key,options = {}){
        var data = ITEMS.filter(function(e) {
            return e.key == key;
        })[0];
        
        if(!data) return false; // No Key found
        
        return new InventoryObject(game,data);
    }

    get buyValue(){
        if(this.containedIn!=undefined){
            return Math.round(this.baseValue * this.containedIn.itemMarkup);
        } else {
            return this.baseValue;
        }
    }

    get readableType(){
        if(this.rarity == RARITY.common){
            return this.type;
        } else {
            return `${RARITY_NAMES[this.rarity]} ${this.type}`
        }
    }

    get readableMass(){
        return `${numeral(this.mass).format('0,0')} kg`
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
        this.canNavigateTo = false;
        this.navigationIndex = this.game.gameObjects.length;
        
        // Basics
        this.health = 0;
        this.alive = true;
        this.isInvinsible = false;
        this._targeted = false;

        // Damage Managment        
        this.damageAccumulating = false;
        this.damageAccumulationAmount = 0;        
    
        // Item Managment
        this.itemMarkup = 1;
        this.freeSpace = {};
        this.inventory = [];
        this.itemsAccumulating = false;
        this.itemsAccumulator = [];     
    }
    
    setupSprite(sprite){
        // TODO
    }
    
    // Targeting
    set targeted(targeted){
        this._targeted = targeted;
        
        if(targeted){
            this.showReticle();
        } else {
            this.hideReticle();
        }

    }

    get targeted(){
        return this._targeted;
    }

    showReticle(){
        
    }
    
    hideReticle(){
        
    }

    
    // Damage
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

        var damageText = this.game.add.text(
            x,
            this.sprite.y, 
            Math.round(amount), 
            { font: `18px ${FONT}`, fill: "#eeed00", align: 'center' }, 
        );
        damageText.anchor.x = 0.5;
        damageText.alpha = 0;
                
        var fadeIn = this.game.add.tween(damageText).to( { alpha: 1 }, 200, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(damageText).to( { y: '-30' }, 800, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(damageText).to( { alpha: 0 }, 300, "Quart.easeOut", false, 150);        
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 2, this.destroyObject, damageText);
    }
    
    hit(bullet){
        // Usually specific per object.
    }
    
    // Items
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

            var itemText = this.game.add.text(
                this.sprite.x,
                this.sprite.y-(verticalSpacing*index), 
                itemMessage, 
                { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'center' }, 
            );
            itemText.stroke = '#000000';
            itemText.strokeThickness = 3;
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
    usedSpaceForStorageClass(storageClass){
        return numeral(this.specs.storage[storageClass]-this.freeSpace[storageClass]).format('0a')
    }

    freeSpaceForStorageClass(storageClass){
        return numeral(this.freeSpace[storageClass]).format('0a')
    }

    maxSpaceForStorageClass(storageClass){
        return numeral(this.specs.storage[storageClass]).format('0a')        
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
                item.containedIn = this;
                
                this.inventory.push(item);
                this.freeSpace[item.storageClass] -= item.mass;
                return true;
            } else {
                this.game.hud.message('Not Enough Cargo Space');
                return false;
            }
        }
    }

    removeItemsFromInventory(items){
        var removedItems = [];
        for (let item of items) {
            var index = this.inventory.indexOf(item);
            if (index > -1) {
                this.removedItems.push(item);
                this.inventory.splice(index, 1);
            }
        }
        return removedItems;
    }

    // Cargo
    emptyCargoHold(){
        this.inventory = [];

        this.freeSpace[CARGO_STORAGE_CLASS.bulk] = this.specs.storage.bulk;
        this.freeSpace[CARGO_STORAGE_CLASS.passengers] = this.specs.storage.passengers;
        this.freeSpace[CARGO_STORAGE_CLASS.gas] = this.specs.storage.gas;
        this.freeSpace[CARGO_STORAGE_CLASS.liquid] = this.specs.storage.liquid;
    }
    
    // Lifecycle
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

    // Misc
    get speed(){
        var body = this.sprite.body
        var vx, vy;
        
        vx = body.data.velocity[0];
        vy = body.data.velocity[1];
        
        return vx * vx + vy * vy;
    }

    update(){
        
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/systems/_system.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


// Handles all planets, objects, etc.
class StarSystem extends GameObject{
    constructor(game) {
        super(game);

        this.name = "Eridanus";
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
    
    wearAndTear(){
        
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
        
        this.name = "Reactor"
        this.status = "OK"
        this.chargeRate = .1;
    }

    update(){
        super.update();
        this.parentObject.charge(this.chargeRate);
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/equipment/batteries.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Batteries extends Equipment {
    constructor(game,parentObject) {
        super(game,parentObject);
        
        this.name = "Batteries"
        this.status = "OK"
        this.chargeRate = .03;
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
        
        this.isWeapon = true;
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
            
            target.hit(bullet);
            
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
            storage : {
                bulk : 100,
/*
                passengers : 100,
                gas : 100,
                liquid : 100,
*/
            }
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
        this.canNavigateTo = true;
        
        this.navigation = {
            currentWaypoint: 0,
        }
        this.navigationMode = NAVIGATION_MODE.free;
        this.navigationIndex = -1;
    }
    
    setupSprite(sprite){
        super.setupSprite(sprite);

        // Physics
        this.game.physics.p2.enable(sprite,P2BODY_DEBUG);
        this.sprite.body.clearShapes();
        this.sprite.body.loadPolygon(null,this.specs.polygon);       
        this.sprite.body.damping = 0;
        this.sprite.body.mass = this.specs.mass;
        this.sprite.parentObject = this;
        
        if(this.specs.dockingConnector!=undefined){
            this.dockingConnector = this.sprite.addChild(this.game.make.sprite(0, 0, 'null'));
            this.dockingConnector.x = this.specs.dockingConnector.position.x;
            this.dockingConnector.y = this.specs.dockingConnector.position.y;
        }

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
        
        // Health
        this.health = this.specs.health;
        
        // Info
        this.name = this.specs.name;
        this.description = this.specs.description;
        
        this.nameText = this.game.add.text(
            0,0,
            this.name, 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.text(
            0,0, 
            this.description, 
            { font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.text(
            0,0,
            'Cleared to Dock', 
            { font: `10px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.landingMessage.alpha = 0;

        // Emiiters
        var flamesData = {
            lifespan: 1000,
            image: 'white',
            bringToTop: true,
            blendMode: 'ADD',
            hsv: { initial: 0, value: 70, control: 'linear' },
            alpha: { initial: 0, value: 1, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.8 }, { x: 1, y: 0 } ] },
            scale: { min: 0.05, max: .5 },
            vx: { min: -0.5, max: 0.5 },
            vy: { min: -.1, max: .1 }
        };
        this.game.ps.addData('flames', flamesData);
        this.flamesEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.flamesEmitter.addToWorld();

        // Atmosphere
        var ventData = {
            lifespan: 8000,
            image: 'white-smooth',
            blendMode: 'ADD',
            vx: { min: -.2, max: .2 },
            vy: { min: -.2, max: .2 },
            alpha: { min: 0, max: .16 },
            scale: { initial: 0.1, value: .4, control: 'linear' },
        };
        this.game.ps.addData('atmosphere', ventData);
        this.atmosphereEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.atmosphereEmitter.addToWorld();

        // Hyperdrive
        var hyperData = {
            lifespan: 600,
            image: 'white',
            bringToTop: true,
            blendMode: 'ADD',
            hsv: { value: 250,},
            alpha: { value: .5 , control:  [{ x: 0, y: 1 }, { x: 1, y: 0 } ]},
        };
        this.game.ps.addData('hyperDrive', hyperData);
        this.hyperDriveEmitter = this.game.ps.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0));
        this.hyperDriveEmitter.addToWorld();
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
        weapon.equiped = true;
        
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
        engine.equiped = true;
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
        equipment.equiped = true;
        this.equipment.push(equipment);
    }

    
    // Movement    
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
        if(this.hyperDriveEngaged) maxVelocity = 50;
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
        if(this.navigationMode == NAVIGATION_MODE.free) return;

        if(this.navigationMode == NAVIGATION_MODE.stationKeeping) this.keepStation();

        if(this.navigationMode == NAVIGATION_MODE.target) this.trackTargetCurrentNavigationTarget();
        
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
    
    trackTargetCurrentNavigationTarget(){
        // Doesnt do much.
    }
    
    nextNavigationTarget(){
        this.navigationMode = NAVIGATION_MODE.target;
        this.navigationIndex++;
        
        if(this.navigationIndex>this.navigatableObjects.length-1){
            this.navigationIndex = -1;   
        }
        
        this.setNavigationTargetToCurrentNavigationTargetIndex();
    }
    
    get navigatableObjects() {
        var objects = [];
        this.game.gameObjects.forEach(function(gameObject) {
            if(gameObject.canNavigateTo && gameObject != this){
                objects.push(gameObject);
            }
        },this);
        return objects;
    }
    
    setNavigationTargetToCurrentNavigationTargetIndex(){
        var index = 0;
        var target = null;
        this.navigatableObjects.forEach(function(navigatableObject) {
            if(index==this.navigationIndex){
                target = navigatableObject;
            }
            index ++;
        },this);
        this.navigationTarget = target;
    }
    
    get distanceToCurrentNavigationTarget(){
        return this.game.physics.arcade.distanceToXY(
            this.sprite,
            this.navigationTarget.sprite.x,
            this.navigationTarget.sprite.y
        );
    }

    get formattedDistanceToCurrentNavigationTarget(){
        var distance = this.distanceToCurrentNavigationTarget*DISTANCE_FACTOR;
        if(distance<3000){
            return 'Arrived';
        } else if(distance<1000000){
            return numeral(distance/1000).format("0,0")+' Mm';
        } else {            
            return numeral(distance/100000).format("0,0.0")+' Gm';
        }
    }

    get formattedTimeToCurrentNavigationTarget(){
        var vx = this.sprite.body.velocity.x;
        var vy = this.sprite.body.velocity.y;
        var eta = this.distanceToCurrentNavigationTarget/Math.sqrt(Math.pow(vx,2) + Math.pow(vy,2));
        if(eta<1 || eta.isNaN){
            return '--';
        } else {
            return TIME_FORMAT(eta);       
        }
    }
    
    get angleToCurrentNavigationTarget(){
        var angleToWaypoint = this.game.physics.arcade.angleToXY(
            this.sprite,
            this.navigationTarget.sprite.x,
            this.navigationTarget.sprite.y
        );
        var difference = Phaser.Math.wrapAngle(Math.degrees(angleToWaypoint));
        return difference;
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

    addFuel(amount){
        this.fuelQuantity += amount;
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

    // Landing
    attemptToLand(){                
        // Dock initiator calls this (ie. Dockee connects to Docker)
        var closestLandingSite = false;
        var landingSitesInRange = [];
        for (let landingSite of this.game.gameObjects) {
            if(landingSite.canLand){
                var distance = this.game.physics.arcade.distanceBetween(landingSite.sprite, this.sprite);
                if(distance<=landingSite.showInfoDistance)
                    landingSitesInRange.push({
                        distance: distance,
                        landingSite: landingSite,
                    })
            }
        }
        if(landingSitesInRange.length>0){
            landingSitesInRange.sort(function(a, b) {
                return a.distance - b.distance;
            });

            var landingSite = landingSitesInRange[0].landingSite; // Closest
            var maxSpeedWhenLanding = 10;

            if((this.speed)>maxSpeedWhenLanding){
                this.game.hud.message("Moving too fast to land");
                return;
            }

            this.landAt(landingSite);

        } else {
            this.game.hud.message("No Landing Site Available");
        }
    }

    landAt(landingSite){
        if(this == this.game.player.ship){
            this.game.add.tween(this.sprite).to( { alpha: 0 }, 600, "Quart.easeOut", true);
            this.game.add.tween(this.sprite.scale).to( { x: .5, y: .5 }, 600, "Quart.easeOut", true);

            // Refuel if needed (Only if autorefuel is on)
            if(this.game.player.settings.autoRefuel && landingSite.hasService(PLANET_SERVICES.fuelDepot)){
                this.game.player.autoRefuel();
            }

            this.game.arrivalScreen.destination = landingSite;
            this.game.arrivalScreen.show();
        } else {
            // Handle AI Ship landing
        }
    }

    takeOff(){
        this.game.skipTime(1,'day');
        this.game.skipTime(game.rnd.integerInRange(1, 12),'hour');

        this.game.add.tween(this.sprite).to( { alpha: 1 }, 600, "Quart.easeOut", true, 500);
        this.game.add.tween(this.sprite.scale).to( { x: 1, y: 1 }, 600, "Quart.easeOut", true, 500);
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

        game.time.events.add(Phaser.Timer.SECOND * 0, this.dockingComplete, {
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
        
        bullet.kill();
        return false; // Never collides, just dies.
    }

    // HyperDrive™
    toggleHyperDrive(){
        this.hyperDriveEngaged = !this.hyperDriveEngaged;
    }

    engageHyperDrive(){
        this.hyperDriveEngaged = true;
        this.game.starBlurY.blur = 0;
        this.game.starBlurX.blur = 0;
    }

    hyperDriveUpdate(){
        var maxBlur = 50;

        var vx = this.sprite.body.data.velocity[0];
        var vy = this.sprite.body.data.velocity[1];
        
        this.game.starBlurX.blur = vx;
        this.game.starBlurY.blur = vy;
        
        this.game.stars.filters = [this.game.starBlurY];

        this.sprite.body.thrust(0);
        
        this.game.bgGroup.rotation=10;
        
        this.hyperDriveEmitter.emit(
            'hyperDrive',
            this.sprite.worldPosition.x + this.game.camera.x,
            this.sprite.worldPosition.y + this.game.camera.y
        );        
    }
    
    disengageHyperDrive(){
        this.hyperDriveEngaged = false;    
    }

    // Venting
    ventAtmosphere(){
        this.atmosphereEmitter.emit(
            'atmosphere',
            this.sprite.worldPosition.x + this.game.camera.x,
            this.sprite.worldPosition.y + this.game.camera.y
        );
/*
        this.flamesEmitter.emit(
            'flames',
            this.sprite.worldPosition.x + this.game.camera.x,
            this.sprite.worldPosition.y + this.game.camera.y
        );
*/
    }

    
    // Rendering
    update() {
        super.update(); 
        this.positionInfo();        
        this.navigate();        

        if(this.hyperDriveEngaged) this.hyperDriveUpdate();
        
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


        this.limitSpeed();
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
            this.contents = InventoryObject.make('raw_paladium');            
        } else if(chance<RARITY_MINING_CHANCE.uncommon){
            this.contents = InventoryObject.make('meteoric_iron');            
        } else {
            this.contents = InventoryObject.make('asteroid_flake');            
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

        if(size=='tiny'){
            var rnd = game.rnd.integerInRange(1, 3);
            this.sprite = this.game.asteroids.create(x,y,'asteroid-flake-'+rnd);
        } else {
            this.sprite = this.game.asteroids.create(x,y,'asteroid-'+size);
        }

        this.sprite.parentObject = this;
        this.game.physics.p2.enable(this.sprite,P2BODY_DEBUG);

        this.sprite.body.clearShapes();
        this.sprite.body.damping = 0;

        if(size=='large'){
            this.health = game.rnd.integerInRange(150, 200);
            this.sprite.body.mass = 100;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(32);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-50, 50),game.rnd.integerInRange(-50, 50)],0,0)

            this.minimapSize = 1.2;
        } else if(size=='medium'){
            this.health = game.rnd.integerInRange(70, 100);

            this.sprite.body.mass = 50;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(20);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-10, 10),game.rnd.integerInRange(-10, 10)],0,0)

            this.minimapSize = .8;
        } else if(size=='small'){
            // Small
            this.health = game.rnd.integerInRange(20, 30);

            this.sprite.body.mass = 10;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(14);
            this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-10, 10),game.rnd.integerInRange(-10, 10)],0,0)

            this.minimapSize = .5;
        } else if(size=='tiny'){
            // Tiny
            this.health = game.rnd.integerInRange(3, 10);

            this.sprite.body.mass = .1;
            this.roationSpeed = game.rnd.integerInRange(-.10, .10);            
            this.sprite.body.addCircle(5);
        this.sprite.body.applyImpulseLocal([game.rnd.integerInRange(-.05, .05),game.rnd.integerInRange(-.05, .05)],0,0)

            this.minimapSize = 0;
        }

        this.sprite.body.rotation = game.rnd.integerInRange(0, 360)
        this.sprite.anchor.set(0.5);
    }

    hit(bullet){
	    var emitter = this.game.add.emitter(bullet.x, bullet.y, 100);
        emitter.makeParticles('asteroid-flake-3');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1;
        emitter.gravity = 0;
        emitter.explode(200, 1);
        this.game.time.events.add(500, this.destroyEmitter, emitter);        
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
        } else if(this.size=='tiny'){
            this.destroy();
        }
    } 
       
    explode(){
	    var emitter = this.game.add.emitter(this.sprite.x,this.sprite.y, 100);
	    this.game.asteroids.add(emitter);
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
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gameObjects/asteroidField.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class AsteroidField extends GameObject {
    constructor(game,size,x,y) {
        super(game);

        if(size==undefined) size = 2000;
        var densityLowerBound = 90;
        var densityUpperBound = 90;
        
        this.asteroidsCount = this.game.rnd.integerInRange(size/densityLowerBound, size/densityUpperBound);
        this.asteroids = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
        for (var i = 0; i < this.asteroidsCount; i++) { 
            var xPos = game.rnd.integerInRange(x-size, x+size);
            var yPos = game.rnd.integerInRange(y-size, y+size);
            
            var bigness = game.rnd.integerInRange(0,100);

            if(bigness>=70){
                var asteroid = new Asteroid(this.game,this.asteroids,'large',xPos,yPos);
            } else if(bigness<70 && bigness>50){
                var asteroid = new Asteroid(this.game,this.asteroids,'medium',xPos,yPos);                
            } else {
                var asteroid = new Asteroid(this.game,this.asteroids,'small',xPos,yPos);                
            }
        }
        for (var i = 0; i < this.asteroidsCount*3; i++) { 
            var xPos = game.rnd.integerInRange(x-size, x+size);
            var yPos = game.rnd.integerInRange(y-size, y+size);
            var asteroid = new Asteroid(this.game,this.asteroids,'tiny',xPos,yPos);
        }

        new Buoy(this.game,xPos,yPos);
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
        this.baseValue = 16;
        this.type = 'Mineral';
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
        this.baseValue = 100;
        this.type = 'Mineral';
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
        this.baseValue = 32;
        this.type = 'Mineral';
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/items/fuel.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Item_Fuel extends InventoryObject {
    constructor(game) {
        super(game);

        this.name = 'Rocket Fuel';
        this.storageClass = CARGO_STORAGE_CLASS.liquid
        this.rarity = RARITY.exotic;
        this.mass = 1;
        this.type = 'Liquid'

        this.baseValue = 1;
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


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/weapons/basicMiningLaser.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicMiningLaser extends Weapon {
    constructor(game,parentObject) {
        super(game,parentObject);

        this.name = 'Mining Laser';
        this.status = 'OK';

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
        this.weapon.bullets.setAll('damage',1.2);
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

        this.canNavigateTo = true;
        this.canLand = true;
        
        this.services = [];
        this.specs = {
            storage : {
                bulk : Infinity,
                passengers : Infinity,
                liquid : Infinity,
                gas : Infinity,
            }
        }

        this.itemMarkup = 1.1 // Multuplier
    }

    setupSprite(){
        super.setupSprite(this.sprite);

        this.sprite.anchor.setTo(.5, .5);
        this.sprite.smoothed = false;

        this.nameText = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y-20, 
            this.name, 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.nameText.alpha = 0;

        this.subText = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y, 
            this.description, 
            { font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.subText.alpha = 0;

        this.landingMessage = this.game.add.text(
            20+this.sprite.x + this.sprite.width/2,this.sprite.y + 40, 
            'Press L to Land', 
            { font: `10px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.landingMessage.alpha = 0;
    }
    
    showInfoIfNeeded(){
        if(this.shouldShowInfo && !this.infoShowing){
            this.game.add.tween(this.nameText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.nameText).to( { y: '-30' }, 300, "Quart.easeOut", true);    
            
            this.game.add.tween(this.subText).to( { alpha: 1 }, 300, "Quart.easeOut", true);
            this.game.add.tween(this.subText).to( { y: '-30' }, 300, "Quart.easeOut", true);                

            if(this.canLand){
                this.game.add.tween(this.landingMessage).to( { alpha: .5 }, 300, "Quart.easeOut", true,400);
                this.game.add.tween(this.landingMessage).to( { y: '-30' }, 300, "Quart.easeOut", true,400);                
            }
        
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
        this.distanceToPlayer = this.game.physics.arcade.distanceBetween(this.sprite, this.game.player.sprite);
        this.showInfoIfNeeded();
    }
    
    hasService(service){
        return this.services.includes(service);
    }
    
    get shouldShowInfo(){
        if(this.distanceToPlayer<=this.showInfoDistance) {
            return true;
        } else {
            return false;
        }
    }

    // Planets have lots of free space.
    calculateFreeSpaceForStorageClass(storageClass){
        return Infinity;
    }

}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/planets/basicPlanet.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class BasicPlanet extends Planet {
    constructor(game,x,y) {
        super(game,x,y);        
        this.sprite = this.game.add.sprite(x,y, 'planet-1');
        this.sprite.width = this.sprite.width*2
        this.sprite.height = this.sprite.height*2 

        this.name = "Mosisia Si"
        this.description = "Class D Planet"
        this.welcomeTitle = "Terrestrial Planet";
        this.welcomeText = "Mosisia is a medium-sized terrestrial planet in the Pavo system, with a single moon. Most of the planet is made up of salty oceans, while a portion is grassland. Life on this planet is rare due to climate and atmosphere. The atmosphere is nitrogen based and breathable, with oxygen and trace amounts of carbon monoxide.";

        this.services = [
            PLANET_SERVICES.market,
            PLANET_SERVICES.passengerTerminal,
            PLANET_SERVICES.refinery,
            PLANET_SERVICES.fuelDepot
        ]

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

        this.name = "Persicus"
        this.description = "Moon of Mosisia"
        this.welcomeText = "Persicus is an intermediately sized terrestrial moon in the Pavo system. A lot of the moon is comprised of frigid desert, while a smaller portion is frozen oceans. Plant and animal life on this planet is non existant. The moon has no atmosphere, and is breathable without advanced life support systems.";

        this.services = [
            PLANET_SERVICES.passengerTerminal,            
        ]

        this.setupSprite();
    }

    update() {
        super.update();
    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/ships/buoy.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Buoy extends Planet {
    constructor(game,x,y) {
        super(game,x,y);
        
        this.specs = {
            name : 'Navigation Buoy',
            description : 'Hinksford Asteroid Field',
        }
        
        this.sprite = this.game.add.sprite(x,y, 'buoy');
        this.sprite.scale.setTo(1.3, 1.3);

        this.name = this.specs.name;
        this.description = this.specs.description;
        this.showInfoDistance = 120;
        
        this.canLand = false;
        

        this.setupSprite();

        var blink = this.sprite.animations.add('blink');
        this.sprite.animations.play('blink', 1, true);
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
        
        // Settings
        this.settings = {};
        this.settings.autoRefuel = true;

        // Keys
        this.controlMode = CONTROL_MODE.play;
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);  
        
        // Navigation
        var tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        tabKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.nextNavigationTarget();
        }, this);

        // Landing
        var lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
        lKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.attemptToLand();
        }, this);

        // Docking
        var dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        dKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.attemptToDock();
        }, this);

        // HyperDrive
        var jKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
        jKey.onUp.add(function(){
            if(this.controlMode == CONTROL_MODE.play) this.ship.toggleHyperDrive();
        }, this);
    }
    
    get credits(){
        if(this._credits<999999){
            return CREDIT_PREFIX.short + numeral(this._credits).format('0,0');
        } else {
            return CREDIT_PREFIX.short + numeral(this._credits).format('(0.00 a)');
        }
    }

    debitCredits(amount){
        if(this._credits>=amount){
            this._credits-=amount;
            return true;
        } else {
            return false;
        }
    }

    addCredits(amount){
        this._credits+=amount;
        return true;
    }


    autoRefuel(){
        var fuelNeeded = this.ship.specs.maxFuel - this.ship.fuelQuantity;
        this.game.economy.buyFuel(fuelNeeded);
    }
    
    buy(item, amount = 1){
        debugger;
    }
    
    sell(item, amount = 1){
        
    }
    
    stop(){
        // Used when landing etc.
        this.ship.sprite.body.setZeroVelocity();
        this.ship.sprite.body.setZeroRotation();
        this.ship.sprite.body.setZeroForce();
    }
        
    update() {
        super.update();
                
        // Normal "Play" control mode"
        if(this.controlMode == CONTROL_MODE.play){
            // Accel
            if (this.cursors.up.isDown) {
                this.ship.accelerate();
            } else {
                this.ship.deaccelerate();
            }

            // Reverse
            if (this.cursors.down.isDown) {
                this.ship.goInReverse();
            } else {
                this.ship.deaccelerate();
            }
        
            // Turning / Strafing
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
            
            // Firing
            if (this.fireButton.isDown) {
                this.ship.firePrimaryWeapon();
            }
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
        var x = this.game.camera.width - 120;
        var y = 160;
        var lineHeight = 12;
        var padding = 8;
        var width = 100;
        var borderRadius = 5;
        var backgroundColor = 0x3f3c46;
        this.background = this.group.add(new Phaser.Graphics(this.game.game,0,0));


        this.sidebar = this.group.add(new Phaser.Graphics(this.game.game,0,0));
        this.sidebar.beginFill(0x111111);
        this.sidebar.drawRect(
            x-20,
            0,
            200,
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
/*
        this.navBackground = this.navigationGroup.add(new Phaser.Graphics(this.game.game,0,0));
        this.navBackground.beginFill(backgroundColor);
        this.navBackground.drawRoundedRect(
            20,
            20,
            this.minimap.width,
            53,
            borderRadius
        )
        this.background.endFill();
*/
        this.group.add(this.navigationGroup)
        
/*
        this.navLabel = new Phaser.BitmapText(
            this.game.game, 
            20,
            20,
            'pixelmix_8',
            'NAVIGATION',
            5
        );  
        this.navLabel.tint = 0x948f9c;
        this.navigationGroup.add(this.navLabel)
*/

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
        this.fuelProgressBar = new ProgressBar(this.game,this,'FUEL',x-8,y+8);
        this.game.register(this.fuelProgressBar)

        this.energyProgressBar = new ProgressBar(this.game,this,'ENERGY',x-8,y+43);
        this.game.register(this.energyProgressBar)

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
/*
        this.background.beginFill(backgroundColor);
        this.background.drawRoundedRect(
            x-padding,
            this.creditsText.y-padding,
            width+padding*2,
            lineHeight+padding+4,
            borderRadius)
        this.background.endFill();
*/

        // Cargo
        this.cargoText = {};
        var cargoHeight = 0;
        this.cargoLabel = new Phaser.BitmapText(
            this.game.game, 
            x-8,
            y+105,
            'pixelmix_8',
            'CARGO',
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
        var equipmentList = this.game.player.ship.equipment.concat(this.game.player.ship.weapons);        
        for (let equipment of equipmentList) {
            var name = equipment.name;
            if(equipment.isWeapon && equipment.equiped){
                name = `> ${name}`
            }

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


            eIndex++;
        }


/*
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
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
        }.bind(this));
*/


        // MESSAGES
        // Title
        this.message__title = this.game.add.text(
            32,this.game.camera.height-50, 
            '', 
            { font: `16px ${FONT}`, fill: '#FFFFFF', align: 'left' }, 
        );
        this.message__title.alpha = 0;
        this.group.add(this.message__title)
        
        // Subtitle
        this.message__subTitle = this.game.add.text(
            32,this.game.camera.height-25, 
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

    }
    
    title(message,submessage){
        var delay = 2000;
        
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
        var messageText = this.game.add.text(
            this.game.camera.width/2,
            this.game.camera.height-70, 
            message, 
            { font: `18px ${FONT}`, fill: "#FFFFFF", align: 'center' }, 
        );

        messageText.anchor.x = .5;
        messageText.fixedToCamera = true;
        messageText.tint = 0xe74c3c;
            
        var blink = this.game.add.tween(messageText).to({
            alpha: .5,
        }, 300, "Quart.easeOut", true, 0, 0, true).loop(true);
    }
    
    updateNavigationDisplay(){
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
/*
                this.game.add.tween(this.navigationArrow.anchor).to({
                    x: .5,
                    y: .5,
                }, 300, "Quart.easeOut", true);
*/
                
               // this.navigationArrow.anchor.set(1,.5);
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
    
    update() {
        // Date
        this.stardateLabel.setText(moment(this.game.starDate).format('MMM Do'));

        // Map
        this.minimap.update();

        // Navigation
        this.updateNavigationDisplay();
        
        // EFI
        this.fuelProgressBar.valuePercent = this.game.player.ship.fuelPercentage;
        this.energyProgressBar.valuePercent = this.game.player.ship.energyPercentage;
        
        // Credits
        this.creditsText.setText(`${this.game.player.credits}`);

        // Cargo
        Object.keys(this.game.player.ship.specs.storage).forEach(function(key,index) {
            var usedSpace = this.game.player.ship.usedSpaceForStorageClass(key);
            var maxSpace = this.game.player.ship.maxSpaceForStorageClass(key);
            
            this.cargoText[key].setText(`${usedSpace}/${maxSpace}`);
        }.bind(this));

    }
}


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/minimap.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Minimap {
    constructor(game,hud) {
        this.game = game;
        this.phaserGame = game.game;
        
        this.size = 116;
        this.width = this.size;
        this.height = this.size;
        this.x = this.game.camera.width - 128;
        this.y = 30;
        
        this.hud = hud;
        this.defaultScale = .03;
        this.scale = this.defaultScale;
        this.distanceFactor = 55;
            
        this.background = this.hud.group.create(this.x,this.y,'minimap-bg')
        this.background.width = this.size;
        this.background.height = this.size;
        this.background.tint = 0x1A1A1A;

        this.dotsBitmapData = this.phaserGame.add.bitmapData(this.width);
        
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
                        var x = ((gameObject.sprite.x-this.game.player.ship.sprite.x)*this.scale)+this.size/2;
                        var y = ((gameObject.sprite.y-this.game.player.ship.sprite.y)*this.scale)+this.size/2;
                        var size = 1; // Default dot size
                        if(gameObject.minimapSize!=undefined){
                            size = gameObject.minimapSize;
                        }
                        var a = Math.abs(distance*(this.distanceFactor/100000)-1)+.1
                        
                        if(this.game.player.ship.navigationTarget == gameObject){
                            this.dotsBitmapData.circle(x,y,size+3,`rgba(255,255,255,${a})`);                            
                            this.dotsBitmapData.circle(x,y,size+2,`#3f3c46`);                            
                            this.dotsBitmapData.circle(x,y,size,`rgba(255,255,255,${a})`);                            
                        } else {
                            this.dotsBitmapData.circle(x,y,size,`rgba(255,255,255,${a})`);                            
                        }
                    }
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
        this.x = x;
        this.y = y;
        this.height = 26;
        
        this.hud = hud;

        this.valuePercent = 0;
        this.title = title;

        this.barBitmapData = this.phaserGame.add.bitmapData(116);
        this.barBitmapData.ctx.fillStyle = '#EEEEEE';

        this.phaserGame.cache.addBitmapData('progbar', this.barBitmapData);
        this.barSprite = this.hud.group.create(
            x,
            y+12,
            this.phaserGame.cache.getBitmapData('progbar')
        )

        var label = new Phaser.BitmapText(
            this.game.game,
            x,
            y, 'pixelmix_8',
            this.title,
            5,
        );
        label.tint = 0x948f9c;
        this.hud.group.add(label)

        this.amountDisplay = new Phaser.BitmapText(
            this.game.game,
            x+116,
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
        this.barBitmapData.rect(0,0,116,10);

        this.barBitmapData.ctx.fillStyle = '#EEEEEE';
        this.barBitmapData.rect(0,0,Math.round(this.valuePercent*1.16),10);

        this.amountDisplay.setText(this.valuePercent+"%");

        this.barBitmapData.dirty = true;        
    
    
    }
    
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/game.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


const screenWidth = 1600/2
const screenHeight = 1000/2

var game = new Phaser.Game(screenWidth, screenHeight, Phaser.WEBGL, 'screen', {
    gameObjects : [],
    preload : function(){
        this.time.advancedTiming = true
        
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.renderer.renderSession.roundPixels = true;

        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST
        
        //this.load.shader('stars', 'assets/stars.frag');

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
        this.load.image('1x1', 'default_assets/particlestorm/particles/1x1.png');
        this.load.image('white', 'default_assets/particlestorm/particles/white.png');
        this.load.image('white-smooth', 'assets/white-smooth.png');
        this.load.image('smoke-trail', 'default_assets/particlestorm/particles/white-smoke.png');
        this.load.image('dot', 'assets/map-dot.png');
        this.load.image('minimap-ship', 'assets/minimap-ship.png');
        this.load.image('dock-arrow', 'assets/dock-indicator.png');
        this.load.image('nav-arrow', 'assets/nav-arrow.png');

        // Planet Stuff
        this.load.image('planet-arrival-1', 'assets/planet-arrival-1.png');
        
    
        // Roids
        this.load.image('asteroid-flake-1', 'assets/asteroid-flake-a.png');
        this.load.image('asteroid-flake-2', 'assets/asteroid-flake-b.png');
        this.load.image('asteroid-flake-3', 'assets/asteroid-flake-c.png');
        this.load.image('asteroid-large', 'assets/asteroid-large.png');
        this.load.image('asteroid-medium', 'assets/asteroid-medium.png');
        this.load.image('asteroid-small', 'assets/asteroid-small.png');
        this.load.image('asteroid-tiny', 'assets/asteroid-flake-a.png');

        // Ships
        this.load.image('mining_ship', 'assets/ships/miner.png');
        this.load.image('fuelTanker', 'assets/ships/fuelTanker.png');
        this.load.image('fuelTanker2', 'assets/ships/fuelTanker2.png');
        this.load.image('shuttle', 'assets/ships/shuttle.png');
        this.load.spritesheet('buoy', 'assets/ships/buoy.png', 21, 55);

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

        // Audio
        this.load.audio('gui_click', 'assets/audio/Button 3.m4a');
        this.load.audio('gui_click_soft', 'assets/audio/Button 5.m4a');
        this.load.audio('success', 'assets/audio/Success 3.m4a');
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
        this.cache.getBitmapFont('pixelmix_8').font.lineHeight = 12;

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.05;
        this.game.physics.p2.setPostBroadphaseCallback(this.broadphaseCallback, this);
        this.game.world.setBounds(0, 0, 1000000, 1000000);
        
        this.ps = this.game.plugins.add(Phaser.ParticleStorm);
        this.game.physics.p2.setImpactEvents(true);
        
        // Sounds
        this.game.soundFX = {};
        this.game.soundFX.click = game.add.audio('gui_click_soft');
        
        
        //  Tiled scrolling background
        this.bgGroup = this.game.add.group();
        
        this.stars = this.game.add.tileSprite(0,0, screenWidth, screenHeight, 'stars');
        this.stars.fixedToCamera = true;

        this.economy = new Economy(this);
        this.system = new StarSystem(this);

        this.planets = this.game.add.group();
        this.asteroids = this.game.add.group();
        this.ships = this.game.add.group();

        var asteroidField = new AsteroidField(this,ASTEROID_FIELD_SIZE.large,this.game.world.centerX,this.game.world.centerY);
        var planet = new BasicPlanet(this,this.game.world.centerX,this.game.world.centerY);
        var moon = new BasicMoon(this,this.game.world.centerX+7000,this.game.world.centerY+1000);

        var ft = new FuelTanker(this,this.game.world.centerX+200,this.game.world.centerY-200);
        ft.sprite.body.angle = 270;
        //ft.navigationMode = NAVIGATION_MODE.followWaypoints;

        this.game.world.bringToTop(this.asteroids);
        this.game.world.bringToTop(this.ships);
        this.player = new Player(this);

        // Date
        this.starDate = moment("22841207", "YYYYMMDD");
        game.time.events.loop(Phaser.Timer.SECOND * 5, this.tickTime, this);
        
        // Camera
        this.game.camera.follow(this.player.sprite);
        
        var deadzonePadding = 100;
        
        this.game.camera.deadzone = new Phaser.Rectangle(
            deadzonePadding,
            deadzonePadding,
            screenWidth-350,
            screenHeight-deadzonePadding*2
        );

        this.game.camera.focusOnXY(this.game.world.centerX,this.game.world.centerY);
        var fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        fKey.onDown.add(this.fullScreen, this);
        
        // HUD
        this.hudGroup = this.game.add.group();
        this.hud = new HUD(this);
        this.hud.title(`${this.system.name} System`,moment(this.starDate).format('MMMM Do YYYY, HH:mm'));
        
        // GUI
        this.guiGroup = this.game.add.group();
        this.arrivalScreen = new ArrivalScreen(this,this.guiGroup);
        
        // DEBUG ////////
        planet.addItemsToInventory(1, InventoryObject.make('meteoric_iron'));
        planet.addItemsToInventory(1, InventoryObject.make('meteoric_iron'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('potatoes'));
        planet.addItemsToInventory(1, InventoryObject.make('coffee'));

        
        this.player.ship.addItemsToInventory(1, InventoryObject.make('coffee'));

/*
        this.arrivalScreen.destination = planet;
        this.arrivalScreen.show();
*/
        //

        // Very top layer
        this.notificationGroup = this.game.add.group(); 
        this.notificationGroup.fixedToCamera = true;       
    },
    tickTime : function(){
        // Tick Tock
        this.starDate = moment(this.starDate).add(1, 'minute');
    },
    skipTime : function(amount,unit){
        this.starDate = moment(this.starDate).add(amount, unit);        
    },
    broadphaseCallback : function(body1, body2){
        if(body1.sprite.parentObject == this.player.ship || body2.sprite.parentObject == this.player.ship){
            var ship;
            if(body1.sprite.parentObject == this.player.ship){
                ship = body1.sprite.parentObject;
                thing = body2.sprite.parentObject
            } else {
                ship = body2.sprite.parentObject;                
                thing = body1.sprite.parentObject
            }
            
            var shakeAmount = (Math.abs(ship.speed-thing.speed)/1000)*thing.sprite.body.mass/100;
            var damageAmount = shakeAmount*100
            if(shakeAmount>.001){
                if(shakeAmount>.01){
                    game.camera.shake(.01, 100);
                } else {
                    game.camera.shake(shakeAmount, 100);                    
                }

                if(damageAmount>1){
                    ship.inflictDamage(damageAmount);
                }


            } else {
                // No shake
            }
        }    
        return true;
    },

    log(){
        this.logValue = '';
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(element) {
            this.logValue = this.logValue + '[' + element + ']' 
        }, this);
    },
    
    update : function(){
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
        if(this.logValue!=undefined){
            this.game.debug.text(this.logValue, 32, 32) 
        }
        //this.game.debug.text(game.time.fps +' fps', 32, 32) 
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

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/_guiScreen.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class GuiScreen {
    constructor(game,group) {                
        this.game = game;
        this.screen = this.game.add.group();
    
        this.screen.visible = false;
        this.parentScreen = null;

        this.fontFamily = FONT;
        this.fontFamilyLarge = FONT;
        this.fontSizeOffset = 0;
        this.textResolution = 2;
        
        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom; // Default
        
        this.styles = {
            borderRadius: 5,
            darkGrey: 0x282731,
            midGrey: 0x3f3c46,
            lightGrey: 0x4d4b56,
            veryLightGrey : 0x948f9c,
            red: 0xc03b2b,
            green: 0x24ae5f,
            baseText : { font: `${15+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
            smallWhiteText : { font: `${15+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
            smallGreyText : { font: `italic ${13+this.fontSizeOffset}px ${this.fontFamilyLarge}`, fill: '#948f9c', align: 'left'},
            title : { font: `${18}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'left'},
        }
    }
    
    // Showing
    show(){
        this.previousControlMode = this.game.player.controlMode;
        this.screen.visible = true;

        switch(this.transitionStyle) {
            case SCREEN_TRANSITION_STYLE.fromBottom:
                this.screen.y = this.game.camera.height;
                var transition = this.game.add.tween(this.screen.position).to({y: 0}, 600, Phaser.Easing.Back.InOut, true);
                break;
            case SCREEN_TRANSITION_STYLE.fromRight:
                this.screen.x = this.game.camera.width;
                var transition = this.game.add.tween(this.screen.position).to({x: 0}, 600, "Quart.easeOut", true);
                break;
            default:
                // None
        }
        if(transition!=undefined) transition.onComplete.add(this.didShow, this);
    }

    didShow(){
        if(this.parentScreen) this.parentScreen.childScreenDidShow();
    }
    
    // Hiding
    hide(){
        switch(this.transitionStyle) {
            case SCREEN_TRANSITION_STYLE.fromBottom:
                var transition = this.game.add.tween(this.screen.position).to({y: this.game.camera.height}, 600, Phaser.Easing.Back.InOut, true);
                break;
            case SCREEN_TRANSITION_STYLE.fromRight:
                var transition = this.game.add.tween(this.screen.position).to({x: this.game.camera.width}, 600, "Quart.easeOut", true);
                break;
            default:
                // None
        }
        transition.onComplete.add(this.didHide, this);

        if(this.parentScreen) this.parentScreen.childScreenWillHide();
    }
 
    didHide(){
        this.screen.visible = false;        
        this.game.player.controlMode = this.previousControlMode;
        
        this.cleanup();

        if(this.parentScreen) this.parentScreen.childScreenDidHide();
    }
    
    cleanup(){
        
    }
    
    childScreenDidHide(){
        
    }

    childScreenWillHide(){
        
    }

    childScreenWillShow(){
        
    }

    childScreenDidShow(){
        
    }

    update(){

    }

}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/arrival.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class ArrivalScreen extends GuiScreen {
    constructor(game,group) {
        super(game,group);

        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromBottom;

        this._destination = null;
        this.serviceButtons = [];
        this.serviceScreens = {};      
        
        this.setupKeys();
        this.setupScreen();
                
        this.wrapper = group;
        this.wrapper.add(this.screen);
        this.wrapper.fixedToCamera = true;

        this.controlGroup = this.game.add.group();
        this.screen.add(this.controlGroup);
    }
    
    setupKeys(){
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onUp.add(function(){
            if(this.game.player.controlMode == CONTROL_MODE.landed) this.hide();
        }, this);
        var lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
        lKey.onUp.add(function(){
            if(this.game.player.controlMode == CONTROL_MODE.landed) this.hide();
        }, this);
    }
    
    setupScreen(){
        // BG
        this.bg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.panelBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));

        // Background
        this.bg.clear();
        this.bg.beginFill(this.styles.darkGrey);
        this.bg.drawRoundedRect(0,0,
            this.game.camera.width,
            this.game.camera.height*2,
            0
        )
        this.bg.endFill();

        // Panel
        this.panelHeight = this.game.scale.height-126;
        this.panelTop = 94;
        this.panelBg.clear();
        this.panelBg.beginFill(this.styles.midGrey);
        this.panelBg.drawRoundedRect(36,this.panelTop,
            this.game.camera.width-(36*2),
            this.panelHeight,
            this.styles.borderRadius
        )
        this.panelBg.endFill();

        
        // Title / Details / Date
        this.destDesc = this.game.add.text(
            36,24, 
            '', 
            this.styles.smallGreyText, 
            this.screen
        )
        this.destDesc.resolution = this.textResolution;

        this.destName = this.game.add.text(
            36,43, 
            '', 
            this.styles.title, 
            this.screen
        )
        this.destName.resolution = this.textResolution;
 
        this.destBreadcrumb = this.game.add.text(
            -1,43, 
            '', 
            this.styles.title, 
            this.screen
        )
        this.destBreadcrumb.tint = 0x948f9c;
        this.destBreadcrumb.resolution = this.textResolution;

        
        this.currentDate = this.game.add.text(
            36,68, 
            '', 
            this.styles.smallWhiteText, 
            this.screen
        )
        this.currentDate.resolution = this.textResolution;

        // Exit button
        this.exitButton = new Button(this.game,'exit-button',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.exitButton.buttonX = this.game.camera.width - this.exitButton.buttonWidth - 36;
        this.exitButton.buttonY = 24;
        this.exitButton.text = "EXIT (ESC)";
        this.exitButton.color = this.styles.red;
        this.screen.add(this.exitButton);

        // Credits
        this.creditsLabel = this.game.add.text(
            this.game.camera.width-36,68, 
            '', 
            this.styles.baseText, 
            this.screen
        );
        this.creditsLabel.anchor.set(1,0);
        this.creditsLabel.addColor('#948f9c', 0);
        this.creditsLabel.addColor('#FFFFFF', 7);
        this.creditsLabel.resolution = this.textResolution;

        // Photo
        this.picture = this.game.add.sprite(36, this.panelTop, 'planet-arrival-1');
        var cropRect = new Phaser.Rectangle(0, 0, 300, this.panelHeight);
        this.picture.crop(cropRect);
        this.screen.add(this.picture);
        this.innerColX = this.picture.width+36+24

        // Message
        this.innerColWidth = this.game.camera.width - (this.picture.width+36+24) - 36-24; 
        this.welcomeText = this.game.add.text(
            this.innerColX,this.panelTop+16, 
            '', 
            { font: ` ${12+this.fontSizeOffset}px Fira Code`, fill: '#FFFFFF', align: 'left', wordWrap: true, wordWrapWidth: this.innerColWidth }, 
            this.screen
        );
        this.welcomeText.lineSpacing = -4;
        this.welcomeText.resolution = this.textResolution;        
    }
    
    layout(){        
        this.cleanup();
        
        // Description
        this.destDesc.setText(this.destination.description);

        // Name
        this.destName.setText(this.destination.name);
        
        // Breadcrumb
        this.destBreadcrumb.setText('');
        this.destBreadcrumb.alpha = 0;
        this.destBreadcrumb.x = this.destName.x + this.destName.width + 10
        
        // Date
        this.currentDate.setText(moment(this.game.starDate).format('MMMM Do YYYY, HH:mm'));

        // Text
        this.welcomeText.setText(this.destination.welcomeText);      
    
        // Services Buttons/
        this.controlGroup.visible = true;
        var servicesIndex = 0;
        var serviceRow = 1;
        for (let service of this.destination.services) {
            var serviceButton = new TwoLineButton(this.game,'service-button');
            serviceButton.screen = this;
            serviceButton.service = service;

            serviceButton.callbacks = {
                onDown : function() {
                    this.screen.serviceButtonClicked(this);
                }.bind(serviceButton)
            }

            serviceButton.buttonWidth = (this.innerColWidth/2)-8
            if(isEven(servicesIndex)){
                serviceButton.buttonX = this.innerColX;
            } else {
                serviceButton.buttonX = this.innerColX + serviceButton.buttonWidth+16;
            }
            
            serviceButton.buttonY = (this.panelHeight+this.panelTop)-((serviceButton.buttonHeight+16)*serviceRow);
            serviceButton.text = PLANET_SERVICES_TITLE[service];
            serviceButton.subText = PLANET_SERVICES_DESC[service];
            serviceButton.color = this.styles.lightGrey;
            this.controlGroup.add(serviceButton);            
            
            servicesIndex++;
            if(servicesIndex % 2 === 0) serviceRow++;
            this.serviceButtons.push(serviceButton);
        }            

        this.updateCredits();      
    }
        
    serviceButtonClicked(button){
        this.presentScreenForService(button.service)
    }
    
    presentScreenForService(service){
        // Present Screen
        if(service==PLANET_SERVICES.market){
            this.serviceScreens[PLANET_SERVICES.market] = new ExchangeScreen(this.game,this.screen,this.destination);
            this.serviceScreens[PLANET_SERVICES.market].parentScreen = this;
            this.screen.add(this.serviceScreens[PLANET_SERVICES.market].screen);            
        }

        var screenToPresent = this.serviceScreens[service]
        screenToPresent.show();          

        // Update Breadcrumb
        this.destBreadcrumb.setText('/ ' + PLANET_SERVICES_TITLE[service]);
        this.destBreadcrumb.alpha = 0;
        var transition = this.game.add.tween(this.destBreadcrumb).to({alpha: 1}, 600, "Quart.easeOut", true);
    }
    childScreenDidShow(){
        this.controlGroup.visible = false;        
    }

    childScreenWillHide(){
        super.childScreenWillHide();
        this.game.add.tween(this.destBreadcrumb).to({alpha: 0}, 600, "Quart.easeOut", true);
        this.controlGroup.visible = true;  
        
        this.updateCredits();      
    }
    
    show(){
        super.show();
        
        // Arrival Specific 
        this.game.player.stop();                
    }

    didShow(){
        super.didShow();        
        this.game.player.controlMode = CONTROL_MODE.landed;
        this.controlGroup.visible = true;        
    }
    
    hide(){
        super.hide();

        // Arrivial Specific
        this.game.player.ship.takeOff();
    }

    didHide(){
        super.didHide();
    }
    
    cleanup(){
        for (let button of this.serviceButtons) {
            button.destroy(true);
        }
        
        Object.keys(this.serviceScreens).forEach(function(key,index) {
            var screen = this.serviceScreens[key];
            screen.cleanup();
            screen.screen.destroy(true);
        }.bind(this));
    }
    
    get destination(){
        return this._destination;
    }

    set destination(destination){
        this._destination = destination;
        this.layout();
    }

    updateCredits(){
        this.creditsLabel.setText('CREDITS ' + this.game.player.credits);
    }


}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/exchange.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class ExchangeScreen extends GuiScreen {
    constructor(game,group,destination) {
        super(game,group);

        this.destination = destination;
        this.serviceButtons = [];
      
        this.transitionStyle = SCREEN_TRANSITION_STYLE.fromRight;

        this.setupKeys();

        this.insetX = 32;
        this.insetBottom = 32;
        this.top = 94;

        // BG
        this.bg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.panelBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));

        // Background
        this.bg.clear();
        this.bg.beginFill(this.styles.darkGrey);
        this.bg.drawRect(0,this.top,
            this.game.camera.width,
            this.game.camera.height,
            0
        )
        this.bg.endFill();
        
        // Lists
        this.myList = new GuiInventoryList(this.game,this.screen);
        this.myList.title = 'My Ship'
        this.myList.x = this.insetX;
        this.myList.y = this.top;
        this.myList.itemCursorStyle = INVENTORY_LIST_CURSOR_STYLE.right;
        
        this.exchangeList = new GuiInventoryList(this.game);
        this.exchangeList.title =  `${this.destination.name} ${PLANET_SERVICES_TITLE.market}` 
        this.exchangeList.x = (this.game.camera.width - this.insetX) - this.exchangeList.listWidth; 
        this.exchangeList.y = this.top;
        this.exchangeList.itemCursorStyle = INVENTORY_LIST_CURSOR_STYLE.left;
        
        this.screen.add(this.myList);
        this.screen.add(this.exchangeList);
        
        this.myListDelta = []
        this.exchangeListDelta = [];

        this.activeList = this.myList;
        this.activeList.focus = true;

        // Item Info
        // Background
        this.itemInfoBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.itemInfoTitleBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.infoTitleLabel = this.game.add.text(
            0,0, 
            'Item', 
            { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this.screen
        )
        this.infoTitleLabel.resolution = 2;
        
        // Props
        this.propsGroup = this.game.add.group();
        this.screen.add(this.propsGroup);

        // Back Button
        this.backButton = new Button(this.game,'back-button',{
            onReleased : function() {
                this.hide();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.backButton.buttonX = this.insetX;
        this.backButton.buttonY = this.myList.listHeight+this.top+16;
        this.backButton.text = `${String.fromCharCode(0x2190)} Back`;
        this.screen.add(this.backButton);

        // Help Text
        this.helpText = this.game.add.text(
            this.insetX,this.game.camera.height - this.insetBottom-16, 
            '(UP/DOWN) Select Item   (SPACEBAR) Buy/Sell Item   (TAB) Switch List   (RETURN) Accept', 
            { font: `12px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )
        this.infoTitleLabel.resolution = 2;


        // Sale Amount
        // Background
        this.saleAmountBg = this.screen.add(new Phaser.Graphics(this.game.game,0,0));
        this.saleTotalLabel = this.game.add.text(
            0,0,
            'Total', 
            { font: `14px ${FONT}`, fill: '#929292', align: 'left'},
            this.screen
        )
        this.saleTotalLabel.resolution = 2;

        this.saleAmountLabel = this.game.add.text(
            0,0,
            '', 
            { font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this.screen
        )
        this.saleAmountLabel.anchor.set(1,0);
        this.saleAmountLabel.resolution = 2;

        this.acceptButton = new Button(this.game,'accept-button',{
            onReleased : function() {
                this.acceptTransaction();
            }.bind(this),
        },
        { font: `${13+this.fontSizeOffset}px ${this.fontFamily}`, fill: '#FFFFFF', align: 'center'}
        );
        this.screen.add(this.acceptButton);
    }

    update(){
        super.update();
        this.updateItemInfo();        
    }
    
    updateSaleAmount(){
        var saleAmountMargin = 16;
        var saleAmountHeight = 70;
        var saleAmountX = this.myList.x+this.myList.listWidth+saleAmountMargin;
        var saleAmountY = this.exchangeList.listHeight + this.top - saleAmountHeight;
        var saleAmountWidth = this.game.camera.width-(this.exchangeList.listWidth*2)-(this.insetX*2)-(saleAmountMargin*2);
            
        // Labels
        this.saleTotalLabel.x = saleAmountX + 8;
        this.saleTotalLabel.y = saleAmountY + 8;

        this.saleAmountLabel.x = saleAmountX - 8 + saleAmountWidth;
        this.saleAmountLabel.y = saleAmountY + 8;
        
        var saleAmount = this.calculateSaleAmount();

        var formattedSaleAmount = CREDIT_PREFIX.short + numeral(Math.abs(saleAmount)).format('0,0');
        if(saleAmount>0) formattedSaleAmount = '+' + formattedSaleAmount
        if(saleAmount<0) formattedSaleAmount = '-' + formattedSaleAmount
        if(saleAmount!=0){
            // BG
            this.saleAmountBg.clear();
            this.saleAmountBg.beginFill(0x3F3C46);
            this.saleAmountBg.drawRect(saleAmountX,saleAmountY,
                saleAmountWidth,
                saleAmountHeight,
                0
            )
            this.saleAmountBg.endFill();
            this.saleTotalLabel.visible = true;
            this.saleAmountBg.visible = true;
            this.acceptButton.visible = true;
        } else {
            this.saleTotalLabel.visible = false;
            this.saleAmountBg.visible = false;
            this.acceptButton.visible = false;
        }

        this.acceptButton.buttonX = saleAmountX + 8;
        this.acceptButton.buttonY = saleAmountY + 8 + 24;
        this.acceptButton.buttonWidth = saleAmountWidth-16;
        this.acceptButton.text = `Accept ${formattedSaleAmount}`;
        this.acceptButton.color = 0x1aae5c;
    }
    
    calculateSaleAmount(){
        var myListDeltaTotal = 0;
        var exchangeListDeltaTotal = 0;
        for (let item of this.myListDelta) {
            if(item.containedIn == this.destination){
                myListDeltaTotal += item.buyValue
            } else {
                myListDeltaTotal += item.baseValue
            }               
        } 

        for (let item of this.exchangeListDelta) {
            if(item.containedIn == this.destination){
                exchangeListDeltaTotal += item.buyValue;
            } else {
                exchangeListDeltaTotal += item.baseValue;
            }               
        } 


        return exchangeListDeltaTotal - myListDeltaTotal;        
    }
    
    updateItemInfo(){
        var item = this.activeList.selectedItem;
                        
        var infoMargin = 16;
        var infoWidth = this.game.camera.width-(this.exchangeList.listWidth*2)-(this.insetX*2)-(infoMargin*2)
        var infoX = this.myList.x+this.myList.listWidth+infoMargin;
        var infoY = this.top;

        // Properites
        this.itemInfoBg.clear();
        this.itemInfoTitleBg.clear();
        var infoBgHeight = 100;
        this.propsGroup.removeAll(true);
        if(item){
            var props = ['baseValue','mass','rarity','storageClass'];
            var labels = ['Value','Weight','Rarity','Container'];
            var propIndex = 0;
            var propLineHeight = 20;
            for (let prop of props) {
                var propY = (propIndex*propLineHeight)+infoY+40;
                if(item[prop]==undefined) return;
                
                var propTitle = this.game.add.text(
                    infoX+8,propY, 
                    labels[propIndex], 
                    { font: `13px ${FONT}`, fill: '#929292', align: 'left'},
                    this.propsGroup
                )
                propTitle.resolution = 2;
    
                var value = item[props[propIndex]];
                if(props[propIndex]=='baseValue') {
                    if(item.containedIn == this.destination){
                        // Prices are higher when buying ;)
                        value = CREDIT_PREFIX.short + numeral(item.buyValue).format(`0,0[.]00`);
                    } else {
                        value = CREDIT_PREFIX.short + numeral(value).format(`0,0[.]00`);
                    }   
                }
                if(props[propIndex]=='rarity') value = RARITY_NAMES[item[props[propIndex]]];
                if(props[propIndex]=='storageClass') value = CARGO_STORAGE_CLASS_NAMES[item[props[propIndex]]];
                if(props[propIndex]=='mass') value = item.readableMass;
    
                var propValue = this.game.add.text(
                    infoX+infoWidth-8,propY,
                    value, 
                    { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'right'},
                    this.propsGroup
                )
                if(props[propIndex]=='rarity') propValue.tint = RARITY_COLOR[item[props[propIndex]]];
                propValue.anchor.set(1,0);
                propValue.resolution = 2;
                
                propIndex++;
            };
            infoBgHeight = propIndex*propLineHeight+30+16

            this.itemInfoBg.beginFill(0x3F3C46);
            this.itemInfoBg.drawRect(infoX,infoY,
                infoWidth,
                infoBgHeight,
                0
            )
            this.itemInfoBg.endFill();
    
            this.itemInfoTitleBg.beginFill(0x4D4B56);
            this.itemInfoTitleBg.drawRect(infoX,infoY,
                this.itemInfoBg.width,
                30,
            )
            this.itemInfoTitleBg.endFill(); 
            
            this.infoTitleLabel.x = infoX+8;
            this.infoTitleLabel.y = infoY+8;
            this.infoTitleLabel.visible = true;
            this.infoTitleLabel.setText(item.readableType);
        } else {
            // Item Empty
            this.infoTitleLabel.visible = false;
        }

        this.updateSaleAmount();
    }
    
    transferSelectedItem(){
        var item = this.activeList.selectedItem;
        if(item) {
            if(this.activeList==this.myList){
                this.exchangeList.addItem(item);
                this.exchangeListDelta.push(item);
                
                this.myList.removeItem(item);

                var index = this.myListDelta.indexOf(item);
                if (index > -1) this.myListDelta.splice(index, 1);
            }
            if(this.activeList==this.exchangeList){
                this.myList.addItem(item);
                this.myListDelta.push(item);
                
                this.exchangeList.removeItem(item);

                var index = this.exchangeListDelta.indexOf(item);
                if (index > -1) this.exchangeListDelta.splice(index, 1);
            }
        }        
    }
    
    toggleActiveList(){
        this.activeList.focus = false;
        if(this.activeList==this.myList){
            this.activeList=this.exchangeList
        } else {
            this.activeList=this.myList            
        }
        this.activeList.focus = true;
        this.update();
    }
    
    acceptTransaction(){
        var saleAmount = this.calculateSaleAmount();
        if(saleAmount!=0){
            if(saleAmount<0){
                // Buy. We will deduct credits.
                if(this.game.player.debitCredits(Math.abs(saleAmount))){
                    // Valid transaction
                    this.completeTransaction(saleAmount);
                } else {
                    // Not Enough.
                    this.showNotEnoughCreditsNotification();
                }
            }
            if(saleAmount>0){
                // Sell. We will add credits.
                this.game.player.addCredits(Math.abs(saleAmount))
                this.completeTransaction(saleAmount);
            }
        }
    }

    completeTransaction(saleAmount){
        this.game.player.ship.emptyCargoHold();
        for (let item of this.myList.items) {
            this.game.player.ship.addItemsToInventory(1,item);
        }
    
        this.destination.emptyCargoHold();
        for (let item of this.exchangeList.items) {
            this.destination.addItemsToInventory(1,item);
        }
        
        // Clear deltas
        this.myListDelta = [];
        this.exchangeListDelta = [];
        
        // Notify
        this.showPurchaseNotification(saleAmount);

        // Cleanup
        this.hide();        
    }
    

    showPurchaseNotification(amount){
        var notification = new Notification(this.game);
        notification.text = 'Transaction Complete';
        notification.subText = 'Items have been transferred.';
        notification.accessoryText = numeral(amount).format('$0,0[.]00');
        notification.show();
    }

    showNotEnoughCreditsNotification(){
        var notification = new Notification(this.game);
        notification.text = 'Not Enough Credits';
        notification.subText = 'Cannot accept this transaction.';
        notification.show();
    }
    
    
    setupKeys(){
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.downKeyOnUp = function(){
            this.activeList.selectNextItem();
            this.update();
        }
        this.downKey.onUp.add(this.downKeyOnUp, this);

        this.upKeyOnUp = function(){
            this.activeList.selectPreviousItem();
            this.update();
        }
        this.upKey.onUp.add(this.upKeyOnUp, this);

        this.spaceKeyOnUp = function(){
            this.transferSelectedItem();
            this.update();
        }
        this.spaceKey.onUp.add(this.spaceKeyOnUp, this);

        this.tabKeyOnUp = function(){
            this.toggleActiveList();
            this.update();
        }
        this.tabKey.onUp.add(this.tabKeyOnUp, this);

        this.enterKeyOnUp = function(){
            this.acceptTransaction();
            this.update();
        }
        this.enterKey.onUp.add(this.enterKeyOnUp, this);
    }
        
    layout(){        
        this.cleanup();
    }
    
    show(){
        super.show();

        this.myList.items = this.game.player.ship.inventory.slice(0);
        this.exchangeList.items = this.destination.inventory.slice(0);

        this.update();        
    }

    didShow(){
        super.didShow();        

        this.game.player.controlMode = CONTROL_MODE.exchange;
    }
    
    hide(){
        super.hide();
    }

    didHide(){
        super.didHide();
    }    
    
    cleanup(){
        this.downKey.onUp.remove(this.downKeyOnUp, this);
        this.upKey.onUp.remove(this.upKeyOnUp, this);
        this.spaceKey.onUp.remove(this.spaceKeyOnUp, this);
        this.tabKey.onUp.remove(this.tabKeyOnUp, this);
        this.enterKey.onUp.remove(this.enterKeyOnUp, this);
   }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/button.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Button extends Phaser.Group {
    constructor(game,key,callbacks,textStyle = null) {
        super(game.game);
        this.phaserGame = game.game;
        this.callbacks = callbacks;
            
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.label = this.phaserGame.add.text(
            0,0, 
            this._text, 
            this.buttonTextStyle,
            this
        )
        this.label.resolution = 2;
        this.label.anchor.set(0.5)

        this.subLabel = this.phaserGame.add.text(
            0,0, 
            this._subText, 
            this.buttonTextStyle,
            this
        )
        this.subLabel.resolution = 2;
        this.subLabel.anchor.set(0.5)

        this._text = '';
        this._subText = '';
        this._buttonX = 0;
        this._buttonY = 0;
        this._color = 0x4d4b56;

        this.buttonWidth = 100;
        this.buttonHeight = 27;
        this.lineHeight = 3;
        this.padding = 8;

        this.key = 'button_'+key;

        this.buttonTextStyle = textStyle || { font: `12px ${FONT}`, fill: '#FFFFFF', align: 'center'};

        this.sprite = this.create(this.buttonX,this.buttonY,'null') 
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputUp.add(this.onReleased, this);
        this.sprite.events.onInputDown.add(this.onDown, this);
        this.sprite.events.onInputOver.add(this.onOver, this);
        this.sprite.events.onInputOut.add(this.onOut, this);
    }
    
    onOver(){
        this.over = true;   
        this.layout();
    }

    onOut(){
        this.over = false;
        this.layout();
    }
    
    onDown() {
        if(this.callbacks.onDown) this.callbacks.onDown(this);
    }

    onReleased() {
        if(this.callbacks.onReleased) this.callbacks.onReleased(this);
    }
    
    set buttonX(x){
        this._buttonX = x
        this.layout();
    }

    set buttonY(y){
        this._buttonY = y
        this.layout();
    }

    get buttonX(){
        return this._buttonX;
    }

    get buttonY(){
        return this._buttonY;
    }

    set text(text){
        this._text = text;
        this.layout();
    }
    
    get text(){
        return this._text;
    }

    set subText(subText){
        this._subText = subText;
        this.layout();
    }
    
    get subText(){
        return this._subText;
    }

    set color(color){
        this._color = color;
        this.layout();
    }
    
    get color(){
        return this._color;
    }
        
    layout(){
        this.bg.clear();
        if(this.over){
            var c = tinycolor(this._color.toString(16)).darken().toHex();
            this.bg.beginFill(parseInt(c,16));
        } else {
            this.bg.beginFill(this.color);
        }
        this.bg.drawRoundedRect(this.buttonX,this.buttonY,
            this.buttonWidth,
            this.buttonHeight,
            5
        )
        this.bg.endFill();  

        this.sprite.width = this.buttonWidth;
        this.sprite.height = this.buttonHeight;
        this.sprite.x = this.buttonX;
        this.sprite.y = this.buttonY;
        
        this.label.x = this.buttonX+this.buttonWidth/2;
        this.label.y = this.buttonY+this.buttonHeight/2+this.lineHeight
        this.label.setStyle(this.buttonTextStyle)
        this.label.setText(this.text);
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/twoLineButton.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class TwoLineButton extends Button {
    constructor(game,key,callbacks,textStyle = null) {        
        super(game,key,callbacks,textStyle);
        this.buttonHeight = 50;
    }
            
    layout(){
        this.bg.clear();
        if(this.over){
            var c = tinycolor(this._color.toString(16)).darken().toHex();
            this.bg.beginFill(parseInt(c,16));
        } else {
            this.bg.beginFill(this.color);
        }
        this.bg.drawRoundedRect(this.buttonX,this.buttonY,
            this.buttonWidth,
            this.buttonHeight,
            5
        )
        this.bg.endFill();  

        this.sprite.width = this.buttonWidth;
        this.sprite.height = this.buttonHeight;
        this.sprite.x = this.buttonX;
        this.sprite.y = this.buttonY;
        
        this.label.x = this.buttonX+this.padding;
        this.label.y = this.buttonY+this.padding;
        this.label.setStyle({ font: `14px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.label.setText(this.text);
        this.label.anchor.set(0);

        this.subLabel.x = this.buttonX+this.padding;
        this.subLabel.y = this.buttonY+this.buttonHeight/2+this.lineHeight
        this.subLabel.setStyle({ font: `11px ${FONT}`, fill: '#948f9c', align: 'left'})
        this.subLabel.setText(this.subText);
        this.subLabel.anchor.set(0);
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/notification.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Notification extends Phaser.Group {
    constructor(game) {
        super(game.game);
        this.phaserGame = game.game;
        game.notificationGroup.add(this)
        
        this.sound = game.add.audio('success');

        this.buttonTextStyle = {font: `12px ${FONT}`, fill: '#FFFFFF', align: 'center'};

        this.bg2 = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
                
        this.label = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.label.resolution = 2;

        this.subLabel = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.subLabel.resolution = 2;

        this.accessoryLabel = this.phaserGame.add.text(
            0,0, 
            '', 
            this.buttonTextStyle,
            this
        )
        this.accessoryLabel.resolution = 2;

        this._text = '';
        this._subText = '';
        this._accessoryText = '';
        this._color = 0x4d4b56;

        this.notificationWidth = 250;
        this.notificationHeight = 50;
        this.lineHeight = 3;
        this.padding = 8;

        this._notificationX = (this.game.camera.width/2)-(this.notificationWidth/2);
        this._notificationY = 0;
    }

    set text(text){
        this._text = text;
        this.layout();
    }
    
    get text(){
        return this._text;
    }

    set subText(subText){
        this._subText = subText;
        this.layout();
    }
    
    get subText(){
        return this._subText;
    }

    set accessoryText(accessoryText){
        this._accessoryText = accessoryText;
        this.layout();
    }
    
    get accessoryText(){
        return this._accessoryText;
    }

    show(){
        var delay = 3000;
        
        var fadeIn = this.game.add.tween(this).to( { alpha: 1 }, 300, "Quart.easeOut", false);
    	var moveUp = this.game.add.tween(this).to( { y: '+'+this.notificationHeight/2 }, 300, "Quart.easeOut", true);
        var fadeOut = this.game.add.tween(this).to( { alpha: 0 }, 300, "Quart.easeOut", false, delay);
    
        fadeIn.chain(fadeOut);
        fadeIn.start();

        game.time.events.add(Phaser.Timer.SECOND * 5, this.destroy, this);
        
        this.sound.play();
    }

    destroyObject(){
        this.destroy();        
    } 

    layout(){
        this.bg2.clear();
        this.bg2.beginFill(0x948f9c);
        this.bg2.drawRoundedRect(this._notificationX-1,this._notificationY-1,
            this.notificationWidth+2,
            this.notificationHeight+2,
            5
        )
        this.bg2.endFill();  

        this.bg.clear();
        this.bg.beginFill(this._color);
        this.bg.drawRoundedRect(this._notificationX,this._notificationY,
            this.notificationWidth,
            this.notificationHeight,
            5
        )
        this.bg.endFill();  

        this.label.x = this._notificationX+this.padding;
        this.label.y = this._notificationY+this.padding;
        this.label.setStyle({ font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.label.setText(this.text);
        this.label.anchor.set(0);

        this.subLabel.x = this._notificationX+this.padding;
        this.subLabel.y = this._notificationY+this.padding+20;
        this.subLabel.setStyle({ font: `11px ${FONT}`, fill: '#FFFFFF', align: 'left'})
        this.subLabel.setText(this.subText);
        this.subLabel.anchor.set(0);

        this.accessoryLabel.x = this._notificationX + this.notificationWidth - this.padding;
        this.accessoryLabel.y = this._notificationY + 3 + this.notificationHeight/2;
        this.accessoryLabel.setStyle({ font: `15px ${FONT}`, fill: '#FFFFFF', align: 'right'})
        this.accessoryLabel.setText(this.accessoryText);
        this.accessoryLabel.anchor.set(1,.5);

    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/gui/inventoryList.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class GuiInventoryList extends Phaser.Group {
    constructor(game) {
        super(game.game);
        this.phaserGame = game.game;

        this._title = '';
        this._items = [];
        this._focus = false;

        this.clickSound = game.add.audio('gui_click_soft');
        this.txSound = game.add.audio('gui_click');

        this.selectedItemIndex = 0;
        this.currentPage = 1;
        this.itemsPerPage = 8;

        this.itemCursorHeight = 32;
        this.listWidth = 260;
        this.listHeight = this.itemCursorHeight*(this.itemsPerPage+1);
        this.headerHeight = 30;

        // Background            
        this.bg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        
        // Title Label
        this.titleBg = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.titleLabel = this.phaserGame.add.text(
            16,8, 
            '', 
            { font: `13px ${FONT}`, fill: '#FFFFFF', align: 'left'},
            this
        )
        this.titleLabel.resolution = 2;

        // Empty Label
        this.emptyLabel = this.phaserGame.add.text(
            0,0,
            'No Items', 
            { font: `16px ${FONT}`, fill: '#948f9c', align: 'center'},
            this
        )
        this.emptyLabel.resolution = 2;
        this.add(this.emptyLabel);

        // Cursor
        this.itemCursor = this.add(new Phaser.Graphics(this.phaserGame,0,0));
        this.itemCursorLeftPolygon = new Phaser.Polygon(
            0,0,
            -8,this.itemCursorHeight/2, 
            0,this.itemCursorHeight,
            0,this.itemCursorHeight,
            this.listWidth,this.itemCursorHeight,
            this.listWidth,0,
        );
        this.itemCursorRightPolygon = new Phaser.Polygon(
            0,0,
            this.listWidth,0, 
            this.listWidth+8,this.itemCursorHeight/2,
            this.listWidth,this.itemCursorHeight,
            0,this.itemCursorHeight,
        );

        // Lables
        this.labels = this.game.add.group();
        this.add(this.labels);

        this.layout();
    }

    set focus(focus){ 
        if(focus) this.clickSound.play();
               
        this._focus = focus
        this.selectedItemIndex = 0;
        this.layout();
    }

    get focus(){
        return this._focus;
    }
        
    set title(title){
        this._title = title
        this.layout();
    }

    get title(){
        return this._title;
    }

    set items(items){
        this._items = items
        this.layout();
    }

    get items(){
        return this._items;
    }
    
    get valueOfAllItems(){
        var totalValue = 0;
        if(this._items.length>0){
            for (let item of this._items) {
                totalValue += item.baseValue;
            }
        }
        return totalValue;
    }
    
    addItem(item){
        this.txSound.play();
        this._items.push(item)
        this.layout();
    }

    removeItem(item){
        // Find + Remove Item
        var index = this._items.indexOf(item);
        if (index > -1) this._items.splice(index, 1);
        
        // Update Selected Index for last item
        if(this.selectedItemIndex == this._items.length) this.selectedItemIndex--;
        
        this.layout();
    }
    
    get selectedItem(){
        if(this.items.length>0) {
            return this._items[this.selectedItemIndex+this.itemsPerPage*(this.currentPage-1)]
        } else {
            return null;
        }
    }

    get colorForSelectedItem(){
        if(this.selectedItem) return RARITY_COLOR[this.selectedItem.rarity];
    }
    
    selectNextItem(){
        this.clickSound.play();

        if(this.selectedItem==this.items[this.items.length-1]) return;
            
        if(this.selectedItemIndex<=this.items.length) this.selectedItemIndex++;
        if(this.selectedItemIndex>=this.itemsPerPage-1) {
            this.currentPage++;
            this.selectedItemIndex=0;
        }
        
        this.layout();
    }

    selectPreviousItem(){
        this.clickSound.play();
        
        if(this.selectedItemIndex>0) this.selectedItemIndex--;
        if(this.selectedItemIndex==0 && this.currentPage>1){
            this.selectedItemIndex=this.itemsPerPage-2;
            this.currentPage--;
        }
        if(this.selectedItemIndex==0 && this.currentPage==1){
            this.selectedItemIndex=0;
        }
        this.layout();
    }
       
    updateCursorPosition(){
        if(this.currentPage>1 && this.selectedItemIndex==0){
            this.selectedItemIndex++;
        }

        this.itemCursor.clear();
        this.itemCursor.beginFill(this.colorForSelectedItem);
        if(this.itemCursorStyle == INVENTORY_LIST_CURSOR_STYLE.left){
            this.itemCursor.drawPolygon(this.itemCursorLeftPolygon);
        }
        if(this.itemCursorStyle == INVENTORY_LIST_CURSOR_STYLE.right){
            this.itemCursor.drawPolygon(this.itemCursorRightPolygon);
        }
        this.itemCursor.endFill();
        this.itemCursor.visible = true;
    
        this.itemCursor.y = this.itemCursorHeight*this.selectedItemIndex + this.headerHeight;        
    }
    
    layout(){    
        // BG
        this.bg.clear();
        this.bg.beginFill(0x3F3C46);
        this.bg.drawRect(0,0,
            this.listWidth,
            this.listHeight,
        )
        this.bg.endFill();  
                
        // Title
        this.titleBg.clear();
        this.titleBg.beginFill(0x4D4B56);
        this.titleBg.drawRect(0,0,
            this.listWidth,
            this.headerHeight,
        )
        this.titleBg.endFill();
        this.titleLabel.setText(this._title);
        
        
        // Items
        this.labels.removeAll(true);
        var index = 0;

        // Cursor
        if(this.selectedItem && this.focus){
            this.updateCursorPosition();
        } else {
            this.itemCursor.visible = false;
        }

        // Empty Label
        this.emptyLabel.visible = false;
        if(this.items.length==0) this.emptyLabel.visible = true;
        this.emptyLabel.x = (this.listWidth/2)-(this.emptyLabel.width/2);
        this.emptyLabel.y = (this.listHeight/2)-(this.emptyLabel.height/2);

        // Items
        for (var i = (this.currentPage-1)*this.itemsPerPage; i < this.currentPage*this.itemsPerPage; i++) {
            if(this.items[i]!=undefined){
                var item = this.items[i];
                var text = item.name
                var arrow = false;
        
                // Arrows
                if(index==this.itemsPerPage-1){
                    text = String.fromCharCode(0x2193);
                    arrow = true;
                }
                if(index==0 && this.currentPage>1){
                    text = String.fromCharCode(0x2191);
                    arrow = true;
                }
                
                // Label
                var itemLabel = this.phaserGame.add.text(
                    16,this.itemCursorHeight*index + this.headerHeight + 8, 
                    text, 
                    { font: `15px ${FONT}`, fill: '#FFFFFF', align: 'left'},
                    this
                )
                this.labels.add(itemLabel);
                
                if(index==this.selectedItemIndex && this.focus){
                    itemLabel.addColor("#000000", 0)
                } else {
                    if(!arrow) itemLabel.tint = RARITY_COLOR[item.rarity];
                }
                
                if(!arrow) itemLabel.tint = RARITY_COLOR[item.rarity];
                itemLabel.resolution = 2;
                index++;
            }
       }
    }
}

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: app/economy/_economy.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


class Economy {
    constructor(game) {
        this.game = game;
    }
    
    get globalFuelPrice(){
        return .05;
    }

    buyFuel(amount){
        if(amount>0){
            var purchaseCost = amount * this.globalFuelPrice;
            if(this.game.player.debitCredits(purchaseCost)){
                this.game.player.ship.addFuel(amount);
                
                var roundedAmt = numeral(amount).format('0.0a')
                var readablePrice = numeral(this.globalFuelPrice).format('$0,0.00')
                
                this.game.hud.purchaseReceipt('Auto Refuel',`${roundedAmt} units @ ${readablePrice}`,purchaseCost);
            } else {
                // Sorry
            }
        } else {
            // Nothing to buy
            return false;
        }
    }

    tick(){
        // Change prices of stuff
        // Spawn stuff   
    }
}