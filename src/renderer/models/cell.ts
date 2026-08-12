
class Cell {

    private speciesIndex : number;
    private x : number;
    private y : number;

    constructor (speciesIndex : number, x : number, y : number) {

        this.speciesIndex = speciesIndex;
        this.x = x;
        this.y = y;
    }

    getSpeciesIndex () : number { return this.speciesIndex; }
    getX () : number { return this.x; }
    getY () : number { return this.y; }

    setSpeciesIndex (newSpeciesIndex : number) : void { this.speciesIndex = newSpeciesIndex; }

    equals (other : Cell) : boolean { return this.x === other.x && this.y === other.y; }
    belongsTo (speciesIndex : number) : boolean { return speciesIndex === this.speciesIndex; }

    toString () : string { return `(${this.x}, ${this.y})`; }

    clone () : Cell { return new Cell(this.speciesIndex, this.x, this.y); }
};

export {

    Cell,
};
