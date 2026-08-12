
import { EnvironmentObject } from '../../models/environment';

import { Species } from '../../models/species';
import { Cell } from '../../models/cell';
import { Condition } from '../../models/condition';
import { RelationType, Relation } from '../../models/relation';
import { Rule } from '../../models/rule';

type reducerActions = {

    type: string,

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

const environmentReducer = (state : EnvironmentObject, action : reducerActions) : EnvironmentObject => {

    switch (action.type) {

        case 'addSpecies':

            if (action.speciesName === undefined || action.speciesColor === undefined)
                throw new Error('Unexpected action');

            else state.species.push(new Species (action.speciesName, action.speciesColor));

            break;

        case 'addCell':

            if (action.speciesIndex === undefined || action.x === undefined || action.y === undefined)
                throw new Error('Unexpected action');

            else state.cells.push(new Cell(action.speciesIndex, action.x, action.y))

            break;

        case 'addCondition':

            if (action.conditionName === undefined || action.speciesIndex === undefined || action.conditionCoefficient === undefined)
                throw new Error('Unexpected action');

            else state.conditions.push(new Condition(action.conditionName, action.speciesIndex, action.conditionCoefficient));

            break;

        case 'addRelation':

            if (action.leftSpeciesIndex === undefined || action.rightSpeciesIndex === undefined ||
                action.relationType === undefined || action.relationCoefficient === undefined)
                    throw new Error('Unexpected action');

            else state.relations.push(
                new Relation(action.leftSpeciesIndex, action.rightSpeciesIndex, action.relationType, action.relationCoefficient));

            break;

        case 'removeSpecies':

            if (action.speciesIndex === undefined)
                throw new Error('Unexpected action');

            else {

                state.species.splice(action.speciesIndex!, 1);

                state.cells = state.cells.filter((cell : Cell) => !cell.belongsTo(action.speciesIndex!));

                state.conditions = state.conditions
                    .filter((condition : Condition) => !condition.refersTo(action.speciesIndex!));

                state.rules = state.rules
                    .filter((rule : Rule) => !rule.refersTo(action.speciesIndex!))
                        .map((rule : Rule) => rule.filterExpressions(action.speciesIndex!));

                state.relations = state.relations
                    .filter((relation : Relation) => !relation.isParticipatingSpecies(action.speciesIndex!));
            }

            break;

        case 'removeCell':

            if (action.x === undefined || action.y === undefined)
                throw new Error('Unexpected action');

            else state.cells.splice(
                state.cells.findIndex(
                    (cell : Cell) =>
                        action.x === cell.getX() && action.y === cell.getY()), 1);

            break;

        case 'removeCondition':

            if (action.conditionIndex === undefined)
                throw new Error('Unexpected action');

            else state.conditions.splice(action.conditionIndex, 1);

            break;

        case 'removeRule':

            if (action.ruleIndex === undefined)
                throw new Error('Unexpected action');

            else state.rules.splice(action.ruleIndex, 1);

            break;

        case 'removeRelation':

            if (action.relationIndex === undefined)
                throw new Error('Unexpected action');

            else state.relations.splice(action.relationIndex, 1);

            break;
    }

    return state;
};

export {

    environmentReducer,
};
