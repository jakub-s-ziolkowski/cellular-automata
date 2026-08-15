
import { Coordinates } from './coordinates';

class Cell {

    private speciesIndex : number;
    private coordinates : Coordinates;

    constructor (speciesIndex : number, x : number, y : number) {

        this.speciesIndex = speciesIndex;
        this.coordinates = new Coordinates(x, y);
    }

    getSpeciesIndex () : number { return this.speciesIndex; }
    getCoordinates () : Coordinates { return this.coordinates; }
    getX () : number { return this.coordinates.getX(); }
    getY () : number { return this.coordinates.getY(); }

    setSpeciesIndex (newSpeciesIndex : number) : void { this.speciesIndex = newSpeciesIndex; }

    equals (other : Cell) : boolean { return this.coordinates.equals(other.getCoordinates()); }
    belongsTo (speciesIndex : number) : boolean { return speciesIndex === this.speciesIndex; }

    toString () : string { return this.coordinates.toString(); }

    clone () : Cell { return new Cell(this.speciesIndex, this.getX(), this.getY()); }
};

export {

    Cell,
};
