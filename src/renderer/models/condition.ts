
class Condition {

    private name : string;
    private targetSpeciesIndex : number;
    private coefficient : number;

    constructor (name : string, targetSpeciesIndex : number, coefficient : number) {

        this.name = name;
        this.targetSpeciesIndex = targetSpeciesIndex;
        this.coefficient = coefficient;
    }

    getName () : string { return this.name; }
    getTargetSpeciesIndex () : number { return this.targetSpeciesIndex; }
    getCoefficient () : number { return this.coefficient; }

    setName (newName : string) : void { this.name = newName; }
    setTargetSpeciesIndex (newTargetSpeciesIndex : number) : void { this.targetSpeciesIndex = newTargetSpeciesIndex; }
    setCoefficient (newCoefficient : number) : void { this.coefficient = newCoefficient; }

    refersTo (speciesIndex : number) : boolean { return speciesIndex === this.targetSpeciesIndex; }
};

export {

    Condition,
};
