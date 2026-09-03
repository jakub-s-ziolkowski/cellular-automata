
import React from 'react';

import { Species } from './species';
import { Coordinates } from './coordinates';
import { Cell } from './cell';
import { Condition } from './condition';
import { Rule } from './rule';
import { RelationType, Relation } from './relation';

enum WorkspaceMode {

    Species = 'Species',
    Charts = 'Charts',
    Conditions = 'Conditions',
    Relations = 'Relations',
    Rules = 'Rules',
};

type SimulationObject = {

    isRunning : boolean;
    isManual : boolean;
    editMode : number;
    workspaceMode : WorkspaceMode;

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

type SimulationHook = {

    state : SimulationObject,
    dispatch : React.ActionDispatch<any>,
}

class Simulation {

    public isRunning : boolean = false;
    public isManual : boolean = true;
    public editMode : number = -1;
    public workspaceMode : WorkspaceMode = WorkspaceMode.Conditions;
    
    public epochs : number = 0;
    public speed : number = 50;
    public scale : number = 1;
    public coordinates : Coordinates = new Coordinates();

    public species : Species[] = [];
    public cells : Cell[] = [];
    public conditions : Condition[] = [];
    public rules : Rule[] = [];
    public relations : Relation[] = [];

    public static getSpecies (simulation : SimulationHook) : Species[]
        { return simulation.state.species; }

    public static getSpeciesName (simulation : SimulationHook, speciesIndex : number) : string
        { return simulation.state.species[speciesIndex].getName(); }

    public static getSpeciesNames (simulation : SimulationHook) : string[]
        { return simulation.state.species.map((species : Species) => species.getName()); }

    public static getSpeciesCells (simulation : SimulationHook, speciesIndex : number) : Cell[]
        { return simulation.state.cells.filter((cell : Cell) => cell.belongsTo(speciesIndex)); }

    public static replaceSpeciesCells (simulation : SimulationHook, speciesIndex : number, cells : Cell[]) : void
        { simulation.dispatch({ type: 'replace-species-cells', speciesIndex, cells }); }

    public static setSpeciesColor (simulation : SimulationHook, speciesIndex : number, color : string) : void
        { simulation.dispatch({ type: 'set-species-color', speciesIndex, color }); }

    public static setSpeciesName (simulation : SimulationHook, speciesIndex : number, name : string) : void
        { simulation.dispatch({ type: 'set-species-name', speciesIndex, name }); }

    public static isSpeciesNameTaken (simulation : SimulationHook, speciesName : string) : boolean
        { return simulation.state.species.map((species : Species) => species.getName()).includes(speciesName); }

    public static getConditionsCoefficient (simulation : SimulationHook, conditionsIndex : number) : number
        { return simulation.state.conditions[conditionsIndex].getCoefficient(); }

    public static setConditionsCoefficient (simulation : SimulationHook, conditionsIndex : number, conditionsCoefficient : number) : void
        { simulation.dispatch({ type: 'set-conditions-coefficient', conditionsIndex, conditionsCoefficient }); }

    public static getConditionsName (simulation : SimulationHook, conditionsIndex : number) : string
        { return simulation.state.conditions[conditionsIndex].getName(); }

    public static setConditionsName (simulation : SimulationHook, conditionsIndex : number, conditionsName : string) : void
        { simulation.dispatch({ type: 'set-conditions-name', conditionsIndex, conditionsName }); }

    public static isConditionsNameTaken (simulation : SimulationHook, conditionsName : string) : boolean
        { return simulation.state.conditions.map((conditions : Condition) => conditions.getName()).includes(conditionsName); }

    // ---

    public static toggleSimulation (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'toggle-simulation' }); }

    public static toggleManual (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'toggle-manual' }); }

    public static selectEditMode (simulation : SimulationHook, editMode : number = -1) : void
        { simulation.dispatch({ type: 'change-edit-mode', editMode }); }

    public static selectWorkspaceMode (simulation : SimulationHook, workspaceMode : WorkspaceMode) : void
        { simulation.dispatch({ type: 'change-workspace-mode', workspaceMode }); }

    // ---

    public static resetSimulation (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'reset-simulation' }); }

    public static nextEpoch (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'next-epoch' }); }

    public static increaseSpeed (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'increase-speed' }); }

    public static decreaseSpeed (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'decrease-speed' }); }

    public static increaseScale (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'increase-scale' }); }

    public static decreaseScale (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'decrease-scale' }); }

    public static resetPerspective (simulation : SimulationHook) : void
        { simulation.dispatch({ type: 'reset-perspective' }); }

    // ---

    public static addSpecies (simulation : SimulationHook, speciesColor : string, speciesName : string) : void
        { simulation.dispatch({ type: 'add-species', speciesColor, speciesName }); }

    public static removeSpecies (simulation : SimulationHook, speciesIndex : number) : void
        { simulation.dispatch({ type: 'remove-species', speciesIndex }); }

    public static addCell (simulation : SimulationHook, speciesIndex : number, x : number, y : number) : void
        { simulation.dispatch({ type: 'add-cell', speciesIndex, x, y }); }

    public static removeCell (simulation : SimulationHook, x : number, y : number) : void
        { simulation.dispatch({ type: 'remove-sell', x, y }); }

    public static addCondition (simulation : SimulationHook, conditionName : string,
        speciesIndex : number, conditionCoefficient : number) : void
            { simulation.dispatch({ type: 'add-condition', conditionName, speciesIndex, conditionCoefficient }); }

    public static removeCondition (simulation : SimulationHook, conditionIndex : number) : void
        { simulation.dispatch({ type: 'remove-condition', conditionIndex }); }

    // public static addRule (simulation : SimulationHook) : void
    //     { simulation.dispatch({ type: 'add-rule' }); }

    public static removeRule (simulation : SimulationHook, ruleIndex : number) : void
        { simulation.dispatch({ type: 'remove-rule', ruleIndex }); }

    public static addRelation (simulation : SimulationHook,
        leftSpeciesIndex : number, rightSpeciesIndex : number, relationType : RelationType, relationCoefficient : number) : void
            { simulation.dispatch({ type: 'add-relation', leftSpeciesIndex, rightSpeciesIndex, relationType, relationCoefficient }); }

    public static removeRelation (simulation : SimulationHook, relationIndex : number) : void
        { simulation.dispatch({ type: 'remove-relation', relationIndex }); }
};

export type {

    SimulationObject,
    SimulationHook,
};

export {

    WorkspaceMode,
    Simulation,
};
