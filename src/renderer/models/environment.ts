
import React from 'react';

import { Species } from './species';
import { Coordinates } from './coordinates';
import { Cell } from './cell';
import { Condition } from './condition';
import { Rule } from './rule';
import { RelationType, Relation } from './relation';

type EnvironmentObject = {

    isRunning : boolean;
    isManual : boolean;
    editMode : number;
    workspaceMode : number;
    epochs : number,
    speed : number,
    scale : number,
    coordinates : Coordinates,
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

    public isRunning : boolean = false;
    public isManual : boolean = true;
    public editMode : number = -1;
    public workspaceMode : number = 9;
    
    public epochs : number = 0;
    public speed : number = 1;
    public scale : number = 1;
    public coordinates : Coordinates = new Coordinates();

    public species : Species[] = [];
    public cells : Cell[] = [];
    public conditions : Condition[] = [];
    public rules : Rule[] = [];
    public relations : Relation[] = [];

    public static increaseScale (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'increase-scale' }) }

    public static resetPerspective (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'reset-perspective' }) }

    public static decreaseScale (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'decrease-scale' }) }

    public static resetSimulation (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'reset-simulation' }) }

    public static toggleSimulation (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'toggle-simulation' }) }

    public static nextEpoch (environment : EnvironmentHook) : void
        { environment.dispatch({ type: 'next-step' }) }

    public static addSpecies (environment : EnvironmentHook, speciesColor : string, speciesName : string) : void
        { environment.dispatch({ type: 'add-species', speciesColor, speciesName }); }

    public static addCell (environment : EnvironmentHook, speciesIndex : number, x : number, y : number) : void
        { environment.dispatch({ type: 'add-cell', speciesIndex, x, y }); }

    static addCondition (environment : EnvironmentHook, conditionName : string,
        speciesIndex : number, conditionCoefficient : number) : void
            { environment.dispatch({ type: 'add-condition', conditionName, speciesIndex, conditionCoefficient }); }

    static addRelation (environment : EnvironmentHook,
        leftSpeciesIndex : number, rightSpeciesIndex : number, relationType : RelationType, relationCoefficient : number) : void
            { environment.dispatch({ type: 'add-relation', leftSpeciesIndex, rightSpeciesIndex, relationType, relationCoefficient }); }

    static removeSpecies (environment : EnvironmentHook, speciesIndex : number) : void
        { environment.dispatch({ type: 'remove-species', speciesIndex }); }

    static removeCell (environment : EnvironmentHook, x : number, y : number) : void
        { environment.dispatch({ type: 'remove-sell', x, y }); }

    static removeCondition (environment : EnvironmentHook, conditionIndex : number) : void
        { environment.dispatch({ type: 'remove-condition', conditionIndex }); }

    static removeRule (environment : EnvironmentHook, ruleIndex : number) : void
        { environment.dispatch({ type: 'remove-rule', ruleIndex }); }

    static removeRelation (environment : EnvironmentHook, relationIndex : number) : void
        { environment.dispatch({ type: 'remove-relation', relationIndex }); }
};

export type {

    EnvironmentObject,
    EnvironmentHook,
};

export {

    Environment,
};
