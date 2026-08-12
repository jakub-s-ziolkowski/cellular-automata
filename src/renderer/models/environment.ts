
import React from 'react';

import { Species } from './species';
import { Cell } from './cell';
import { Condition } from './condition';
import { Rule } from './rule';
import { RelationType, Relation } from './relation';

type EnvironmentObject = {

    epochs : number;
    species : Species[];
    cells : Cell[];
    conditions : Condition[];
    rules : Rule[];
    relations : Relation[];
}

type EnvironmentHook = {

    state : EnvironmentObject,
    dispatch : React.ActionDispatch<any>,
}

class Environment {

    public epochs : number = 0;

    public species : Species[] = [];
    public cells : Cell[] = [];
    public conditions : Condition[] = [];
    public rules : Rule[] = [];
    public relations : Relation[] = [];

    public static addSpecies (environment : EnvironmentHook, speciesColor : string, speciesName : string) : void
        { environment.dispatch({ type: 'addSpecies', speciesColor, speciesName }); }

    public static addCell (environment : EnvironmentHook, speciesIndex : number, x : number, y : number) : void
        { environment.dispatch({ type: 'addCell', speciesIndex, x, y }); }

    static addCondition (environment : EnvironmentHook, conditionName : string,
        speciesIndex : number, conditionCoefficient : number) : void
            { environment.dispatch({ type: 'addCondition', conditionName, speciesIndex, conditionCoefficient }); }

    static addRelation (environment : EnvironmentHook,
        leftSpeciesIndex : number, rightSpeciesIndex : number, relationType : RelationType, relationCoefficient : number) : void
            { environment.dispatch({ type: 'addRelation', leftSpeciesIndex, rightSpeciesIndex, relationType, relationCoefficient }); }

    static removeSpecies (environment : EnvironmentHook, speciesIndex : number) : void
        { environment.dispatch({ type: 'removeSpecies', speciesIndex }); }

    static removeCell (environment : EnvironmentHook, x : number, y : number) : void
        { environment.dispatch({ type: 'removeCell', x, y }); }

    static removeCondition (environment : EnvironmentHook, conditionIndex : number) : void
        { environment.dispatch({ type: 'removeCondition', conditionIndex }); }

    static removeRule (environment : EnvironmentHook, ruleIndex : number) : void
        { environment.dispatch({ type: 'removeRule', ruleIndex }); }

    static removeRelation (environment : EnvironmentHook, relationIndex : number) : void
        { environment.dispatch({ type: 'removeRelation', relationIndex }); }
};

export type {

    EnvironmentObject,
};

export {

    Environment,
};
