class Weapon extends Equipment {
    constructor(game,options) {
        super(game,options);

        this.isWeapon = true;

        this.infoFields = ['baseValue','mass','rarity','__space__','type','damage','energyConsumption','range'];
        this.infoFieldLabels = ['Value','Weight','Rarity','','Weapon Type','Damage','Energy Consumption','Range'];
    }

    fire(){
        // Fallback
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