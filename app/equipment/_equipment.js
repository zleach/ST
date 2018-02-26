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