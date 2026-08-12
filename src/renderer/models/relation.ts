
enum RelationType {

    Neutralizm = 'neutralizm', // neutralizm (0/0)
    Mutualism = 'mutualism', // mutualizm (+/+)
    Competition = 'competition', // konkurencja (-/-)
    Parasitism = 'parasitism', // pasożytnictwo (+/-)
    Commensalism = 'commensalism', // komensalizm (+/0)
    Amensalism = 'amensalism', // amensalizm (0/-)
};

class Relation {

    private leftSpeciesIndex : number;
    private rightSpeciesIndex : number;
    private type : RelationType;
    private coefficient : number;

    constructor (leftSpeciesIndex : number, rightSpeciesIndex : number, type : RelationType, coefficient : number) {

        this.leftSpeciesIndex = leftSpeciesIndex;
        this.rightSpeciesIndex = rightSpeciesIndex;
        this.type = type;
        this.coefficient = coefficient;
    }

    getLeftSpeciesIndex () : number { return this.leftSpeciesIndex; }
    getRightSpeciesIndex () : number { return this.rightSpeciesIndex; }
    getType () : RelationType { return this.type; }
    getCoefficient () : number { return this.coefficient; }

    setLeftSpeciesIndex (newLeftSpeciesIndex : number) : void { this.leftSpeciesIndex = newLeftSpeciesIndex; }
    setRightSpeciesIndex (newRightSpeciesIndex : number) : void { this.rightSpeciesIndex = newRightSpeciesIndex; }
    setType (newType : RelationType) : void { this.type = newType; }
    setCoefficient (newCoefficient : number) : void { this.coefficient = newCoefficient; }

    isParticipatingSpecies (speciesIndex : number) : boolean
        { return speciesIndex === this.leftSpeciesIndex || speciesIndex === this.rightSpeciesIndex; }

    areParticipatingSpecies (leftSpeciesIndex : number, rightSpeciesIndex : number) : boolean {

        return (leftSpeciesIndex === this.leftSpeciesIndex && rightSpeciesIndex === this.rightSpeciesIndex) ||
            (leftSpeciesIndex === this.rightSpeciesIndex && rightSpeciesIndex === this.leftSpeciesIndex);
    }

    isLeftSide (speciesIndex : number) : boolean
        { return speciesIndex === this.leftSpeciesIndex; }

    isRightSide (speciesIndex : number) : boolean
        { return speciesIndex === this.rightSpeciesIndex; }

    clone () : Relation
        { return new Relation(this.leftSpeciesIndex, this.rightSpeciesIndex, this.type, this.coefficient); }
}

export type {

    RelationType,
};

export {

    Relation,
};
