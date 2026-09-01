
import { WorkspaceMode, SimulationObject, Simulation } from '@utils/models/simulation';
import { Species } from '@utils/models/species';
import { Coordinates } from '@utils/models/coordinates';
import { Cell } from '@utils/models/cell';
import { Condition } from '@utils/models/condition';
import { RelationType, Relation } from '@utils/models/relation';
import { Rule } from '@utils/models/rule';

type reducerActions = {

    type: string,

    editMode?: number,
    workspaceMode?: WorkspaceMode,

    speciesName?: string,
    speciesColor?: string,

    cellSpeciesIndex?: number,
    x?: number,
    y?: number,

    conditionName? : string,
    conditionSpeciesIndex? : number,
    conditionCoefficient? : number,

    leftSpeciesIndex?: number,
    rightSpeciesIndex?: number,
    relationType?: RelationType,
    relationCoefficient?: number,

    speciesIndex?: number,
    conditionIndex?: number,
    ruleIndex?: number,
    relationIndex?: number,
};

const simulationReducer = (state : SimulationObject, action : reducerActions) : SimulationObject => {

    switch (action.type) {

        case 'toggle-simulation':
            return { ...state, isRunning: !state.isRunning }

        case 'toggle-manual':
            return { ...state, isManual: !state.isManual }

        case 'change-edit-mode':

            if (action.editMode === undefined)
                throw new Error('Unexpected action');

            else return { ...state, editMode: (state.editMode === action.editMode ? -1 : action.editMode) };

        case 'change-workspace-mode':

            if (action.workspaceMode === undefined)
                throw new Error('Unexpected action');

            else return { ...state, workspaceMode: action.workspaceMode };

        // ---

        case 'reset-simulation':
            return new Simulation();

        case 'next-epoch':
            return { ...state, epochs: state.epochs + 1};

        case 'increase-speed':
            return { ...state, speed: state.speed + .1 };

        case 'decrease-speed':
            return { ...state, speed: state.speed - .1 };

        case 'increase-scale':
            return { ...state, scale: state.scale + 1 };

        case 'decrease-scale':
            return { ...state, scale: state.scale - 1 };

        case 'reset-perspective':
            return { ...state, scale: 1, coordinates: new Coordinates()};

        // ---

        case 'add-species':

            if (action.speciesName === undefined || action.speciesColor === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                species: [ ...state.species,
                    new Species (action.speciesName, action.speciesColor) ]};

        case 'remove-species':

            if (action.speciesIndex === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                species: state.species.filter((_ : Species, index : number) => index !== action.speciesIndex),
                cells: state.cells.filter((cell : Cell) => !cell.belongsTo(action.speciesIndex!)),
                rules: state.rules
                    .filter((rule : Rule) => !rule.refersTo(action.speciesIndex!))
                        .map((rule : Rule) => rule.filterExpressions(action.speciesIndex!)),
                relations: state.relations
                    .filter((relation : Relation) => !relation.isParticipatingSpecies(action.speciesIndex!))};

        case 'add-cell':

            if (action.speciesIndex === undefined || action.x === undefined || action.y === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                cells: [ ...state.cells,
                    new Cell(action.speciesIndex, action.x, action.y) ]};

        case 'remove-cell':

            if (action.x === undefined || action.y === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                cells: state.cells.filter((cell : Cell) => cell.getX() === action.x && cell.getY() === action.y)};

        case 'add-condition':

            if (action.conditionName === undefined || action.speciesIndex === undefined || action.conditionCoefficient === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                conditions: [ ...state.conditions,
                    new Condition(action.conditionName, action.speciesIndex, action.conditionCoefficient) ]};

        case 'remove-condition':

            if (action.conditionIndex === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                conditions: state.conditions.filter((_ : Condition, index : Number) => index !== action.conditionIndex)};

        // case 'add-rule':

        //     if (action === undefined)
        //         throw new Error('Unexpected action');

        //     else return { ...state, };

        case 'remove-rule':

            if (action.ruleIndex === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                rules: state.rules.filter((_ : Rule, index : number) => index !== action.ruleIndex)};

        case 'add-relation':

            if (action.leftSpeciesIndex === undefined || action.rightSpeciesIndex === undefined ||
                action.relationType === undefined || action.relationCoefficient === undefined)
                    throw new Error('Unexpected action');

            else return { ...state,
                relations: [ ...state.relations,
                    new Relation(action.leftSpeciesIndex, action.rightSpeciesIndex, action.relationType, action.relationCoefficient) ]};

        case 'remove-relation':

            if (action.relationIndex === undefined)
                throw new Error('Unexpected action');

            else return { ...state,
                relations: state.relations.filter((_ : Relation, index : number) => index !== action.relationIndex)};
    }

    return { ...state };
};

export {

    simulationReducer,
};
