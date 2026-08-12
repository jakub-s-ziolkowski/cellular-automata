
enum Operator {

    EQ = '==', // =, ==, === (=)
    NE = '!=', // !=, <> (&ne;)
    GT = '>', // (>)
    LT = '<', // (<)
    GE = '>=', // (&#10878;)
    LE = '<=', // (&#10877;)
};

interface Expression {

    getExpressionSpeciesIndex () : number;
    getNeighborCount? () : number;
    getLeftSpeciesIndex? () : number;
    getRightSpeciesIndex? () : number;
    getOperator () : Operator;

    refersTo (speciesIndex : number) : boolean;

    isUnary () : boolean;
    isBinary () : boolean;

    toString (speciesNames : string[]) : string;

    clone () : Expression;
};

class UnaryExpression implements Expression {

    private expressionSpeciesIndex : number;
    private targetSpeciesIndex : number;
    private neighborCount : number;
    private operator : Operator;

    constructor (expressionSpeciesIndex : number, targetSpeciesIndex : number, neighborCount : number, operator : Operator) {

        this.expressionSpeciesIndex = expressionSpeciesIndex;
        this.targetSpeciesIndex = targetSpeciesIndex;
        this.neighborCount = neighborCount;
        this.operator = operator;
    }

    getExpressionSpeciesIndex () : number { return this.expressionSpeciesIndex; }
    getTargetSpeciesIndex () : number { return this.targetSpeciesIndex; }
    getNeighborCount () : number { return this.neighborCount; }
    getOperator () : Operator { return this.operator; }

    refersTo (speciesIndex : number) : boolean
        { return speciesIndex === this.expressionSpeciesIndex || speciesIndex === this.targetSpeciesIndex; }

    isUnary() : boolean { return true; }
    isBinary() : boolean { return false; }

    toString (speciesNames : string[]) : string {

        let operator : string = this.operator;

        switch (this.operator) {

            case Operator.EQ: operator = '='; break;
            case Operator.NE: operator = '≠'; break;
            case Operator.GE: operator = '≥'; break;
            case Operator.LE: operator = '≤'; break;

            default: break;
        }

        return `${speciesNames[this.targetSpeciesIndex]} ${operator} ${this.neighborCount}`;
    }

    compute (neighborCount : number) : boolean {

        switch (this.operator) {

            case Operator.EQ:
                return neighborCount === this.neighborCount;

            case Operator.NE:
                return neighborCount !== this.neighborCount;

            case Operator.GT:
                return neighborCount > this.neighborCount;

            case Operator.LT:
                return neighborCount < this.neighborCount;

            case Operator.GE:
                return neighborCount >= this.neighborCount;

            case Operator.LE:
                return neighborCount <= this.neighborCount;

            default:
                throw new Error(`Unknown operator: ${this.operator}`);
        }
    }

    clone () : UnaryExpression
        { return new UnaryExpression(this.expressionSpeciesIndex, this.targetSpeciesIndex, this.neighborCount, this.operator); }
};

class BinaryExpression implements Expression {

    private expressionSpeciesIndex : number;
    private leftSpeciesIndex : number;
    private rightSpeciesIndex : number;
    private operator : Operator;

    constructor (expressionSpeciesIndex : number, leftSpeciesIndex : number, rightSpeciesIndex : number, operator : Operator) {

        this.expressionSpeciesIndex = expressionSpeciesIndex;
        this.leftSpeciesIndex = leftSpeciesIndex;
        this.rightSpeciesIndex = rightSpeciesIndex;
        this.operator = operator;
    }

    getExpressionSpeciesIndex () : number { return this.expressionSpeciesIndex; }
    getLeftSpeciesIndex () : number { return this.leftSpeciesIndex; }
    getRightSpeciesIndex () : number { return this.rightSpeciesIndex; }
    getOperator () : Operator { return this.operator; }

    refersTo (speciesIndex : number) : boolean
        { return speciesIndex === this.expressionSpeciesIndex ||
            speciesIndex === this.leftSpeciesIndex ||
            speciesIndex === this.rightSpeciesIndex; }

    isUnary () : boolean { return false; }
    isBinary () : boolean { return true; }

    toString (speciesNames : string[]) : string
        { return `${speciesNames[this.leftSpeciesIndex]} ${this.operator} ${speciesNames[this.rightSpeciesIndex]}`; }

    compute (leftNeighborCount : number, rightNeighborCount : number) : boolean {

        switch (this.operator) {

            case Operator.EQ:
                return leftNeighborCount === rightNeighborCount;

            case Operator.NE:
                return leftNeighborCount !== rightNeighborCount;

            case Operator.GT:
                return leftNeighborCount > rightNeighborCount;

            case Operator.LT:
                return leftNeighborCount < rightNeighborCount;

            case Operator.GE:
                return leftNeighborCount >= rightNeighborCount;

            case Operator.LE:
                return leftNeighborCount <= rightNeighborCount;

            default:
                throw new Error(`Unknown operator: ${this.operator}`);
        }
    }

    clone () : BinaryExpression
        { return new BinaryExpression(this.expressionSpeciesIndex ,this.leftSpeciesIndex, this.rightSpeciesIndex, this.operator); }
};

export type {

    Operator,
    Expression,
}

export {

    UnaryExpression,
    BinaryExpression,
};
