class Names {
    constructor(rng) {
        this.rng = rng;
    }
    
    wordGenerator(){

    }
    static parseName(rawName) {
        return Names.capitalize(rawName.split(' ')[0].toLowerCase())
    }
    
    static parseWords(rawInput) {
        return rawInput.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s/g);
    }

    static capitalize(string){
        return string[0].toUpperCase() + string.slice(1);
    }
    
    static star(){
        var markovChain = new Markov;
        markovChain.maxLength = rng.nextInt(3,14);
        markovChain.n = rng.nextInt(3,4);
        markovChain.sequences = Names.parseWords(NAMES_STAR.join('\n'));
        markovChain.rng = rng;
        return Names.capitalize(markovChain.generate().join(""));
    }

    static proper(){
        return Names.parseName(NAMES_PROPER[rng.nextInt(0, NAMES_PROPER.length-1)]);
    }
}