
import { Expression } from './expression';

enum RuleType {

    Death = 'death',
    Aliveness = 'aliveness',
    Resurrection = 'resurrection',
};

class Rule {

    private targetSpeciesIndex : number;
    private title : string;
    private type : RuleType;
    private expressions : Expression[];

    constructor (targetSpeciesIndex : number, title : string, type : RuleType, expressions : Expression[] = []) {

        this.targetSpeciesIndex = targetSpeciesIndex;
        this.title = title;
        this.type = type;
        this.expressions = expressions;
    }

    getTarget () : number { return this.targetSpeciesIndex; }
    getTitle () : string { return this.title; }
    getType () : RuleType { return this.type; }
    getExpression () : Expression[] { return this.expressions; }

    setTarget (newTargetSpeciesIndex : number) : void { this.targetSpeciesIndex = newTargetSpeciesIndex; }
    setTitle (newTitle : string) : void { this.title = newTitle; }
    setType (newType : RuleType) : void { this.type = newType; }
    setExpressions (newExpressions : Expression[]) : void { this.expressions = newExpressions; }

    clone () : Rule {

        return new Rule(this.targetSpeciesIndex, this.title, this.type,
            this.expressions.map((expression : Expression) => expression.clone())); }

    refersTo (speciesIndex : number) : boolean
        { return speciesIndex === this.targetSpeciesIndex; }

    filterExpressions (speciesIndex : number) : Rule {

        this.expressions.filter((expression : Expression) => !expression.refersTo(speciesIndex));

        return this;
    }
}

export type {

    RuleType,
};

export {

    Rule,
};
