
class Species {

    private name : string;
    private color : string;
    private history : number[];

    constructor (name : string, color : string, history : number[] = []) {

        this.name = name;
        this.color = color;
        this.history = history;
    }

    getName () : string { return this.name; }
    getColor () : string { return this.color; }
    getHistory () : number[] { return this.history; }

    setName (newName : string) : void { this.name = newName; }
    setColor (newColor : string) : void { this.color = newColor; }
    pushHistory (newCount : number) : void { this.history.push(newCount); }
    setLatestHistory (newCount : number) : void {

        if (newCount < 0)
            throw new Error('History count cannot be negative');

        else if (this.history.length === 0)
            this.history.push(newCount);

        else
            this.history[this.history.length - 1] = newCount;
    }

    clone () : Species { return new Species(this.name, this.color, [...this.history]); }
};

export {

    Species,
};
