
class Coordinates {

    private x : number;
    private y : number;

    constructor (x : number = 0, y : number = 0) {

        this.x = x;
        this.y = y;
    }

    getX () : number { return this.x; }
    getY () : number { return this.y; }

    equals (other : Coordinates) : boolean { return this.x === other.x && this.y === other.y; }

    toString () : string { return `(${this.x}, ${this.y})`; }

    clone () : Coordinates { return new Coordinates(this.x, this.y); }
};

export {

    Coordinates,
};
