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
        var name;

        var markovChain = new Markov;
        markovChain.n = rng.nextInt(5,5);
        markovChain.sequences = Names.parseWords(NAMES_STAR.join('\n'));
        markovChain.rng = rng;        
        
        if(rng.next()>.9){
            markovChain.maxLength = rng.nextInt(3,6);
            var word1 = Names.capitalize(markovChain.generate().join(""))
            markovChain.maxLength = rng.nextInt(4,14);
            var word2 = Names.capitalize(markovChain.generate().join(""))
            name = `${word1} ${word2}`;            
        } else {
            markovChain.maxLength = rng.nextInt(3,14);
            name = Names.capitalize(markovChain.generate().join(""));
        }

        if(rng.next()>.4){
            var greekPrefix = GREEK_ALPHABET[rng.nextInt(0, GREEK_ALPHABET.length-1)]
            name = `${greekPrefix} ${name}`;
        }
        
        return name;
    }

    static outerRimStar(){
        var designation = OUTER_RIM_DESIGNATIONS[rng.nextInt(0, OUTER_RIM_DESIGNATIONS.length-1)]
        var number = rng.nextInt(100,999);
        return `${designation}-${number}`
    }

    static proper(){
        return Names.parseName(NAMES_PROPER[rng.nextInt(0, NAMES_PROPER.length-1)]);
    }
}