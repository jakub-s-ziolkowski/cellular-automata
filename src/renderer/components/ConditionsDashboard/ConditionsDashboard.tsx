
import { FocusEventHandler, FocusEvent, Fragment } from 'react';

import { SimulationHook, Simulation } from '@utils/models/simulation';
import { Species } from '@utils/models/species';

import { fieldShakeAnimation } from '@utils/helpers/animation';

import './ConditionsDashboard.scss';

const MIN_COEFFICIENT = .1;
const COEFFICIENT_STEP = .1;
const MAX_COEFFICIENT = 10;

interface ConditionsDashboardProps {

    simulation : SimulationHook,
};

const ConditionsDashboard = ({ simulation } : ConditionsDashboardProps) : React.JSX.Element => {

    console.log(simulation.state.conditions)

    const validateConditionsCoefficient = async (element : HTMLInputElement, previousValue : number) : Promise<number> => {

        try {

            const unparsedCoefficient : string = element.value;

            if (!unparsedCoefficient)
                await fieldShakeAnimation(element, 'conditionsWorkspace').then(() =>
                    element.value = String(previousValue));

            else {

                const coefficient = Number(unparsedCoefficient);

                if (isNaN(coefficient)) throw new Error('Unexpected input value');

                if (coefficient < MIN_COEFFICIENT)
                    await fieldShakeAnimation(element, 'conditionsWorkspace').then(() =>
                        element.value = String(MIN_COEFFICIENT));

                else if (MAX_COEFFICIENT < coefficient)
                    await fieldShakeAnimation(element, 'conditionsWorkspace').then(() =>
                        element.value = String(MAX_COEFFICIENT));
            }

            return Number(element.value);

        } catch (error) {

            console.error(error);

            return 1;
        }
    };

    const modifyConditionsCoefficient : FocusEventHandler<HTMLInputElement> =
        async (event : FocusEvent<HTMLInputElement>) => {

            try {

                const element : HTMLInputElement = event.currentTarget;

                if (!element) throw new Error('Undefined element');

                const conditionsIndex = Number(element.dataset['conditionsIndex']);

                if (isNaN(conditionsIndex)) throw new Error('Incorrect conditions index');

                const conditionsCoefficient : number =
                    await validateConditionsCoefficient(element,
                        Simulation.getConditionsCoefficient(simulation, conditionsIndex));

                Simulation.setConditionsCoefficient(simulation, conditionsIndex, conditionsCoefficient);

            } catch (error) { console.error(error); }
        };

    const validateConditionsName = async (element : HTMLInputElement, previousName : string) : Promise<string> => {

        try {

            const newName : string = element.value;

            if (!newName)
                await fieldShakeAnimation(element, 'conditionsWorkspace').then(() =>
                    element.value = previousName);

            else if (Simulation.isConditionsNameTaken(simulation, newName))
                await fieldShakeAnimation(element, 'conditionsWorkspace').then(() =>
                    element.value = previousName);

            return newName;

        } catch (error) {

            console.error(error);

            return '';
        }
    };

    const modifyConditionsName : FocusEventHandler<HTMLInputElement> =
        async (event : FocusEvent<HTMLInputElement>) => {

            try {

                const element : HTMLInputElement = event.currentTarget;

                if (!element) throw new Error('Undefined element');

                const conditionsIndex = Number(element.dataset['conditionsIndex']);

                if (isNaN(conditionsIndex)) throw new Error('Incorrect conditions index');

                const conditionsName : string =
                    await validateConditionsName(element,
                        Simulation.getConditionsName(simulation, conditionsIndex));

                if (!conditionsName) throw new Error('Incorrect conditions name');

                Simulation.setConditionsName(simulation, conditionsIndex, conditionsName);

            } catch (error) { console.error(error); }
        };

    return (
        <form className = "conditionsWorkspace">
            <table className = "conditionsWorkspace__table">
                <thead className = "conditionsWorkspace__header">
                    <tr className = "conditionsWorkspace__row">
                        <th className = "conditionsWorkspace__data conditionsWorkspace__data--wider">
                            <span className = "conditionsWorkspace__label">Species</span>
                        </th>
                        <th className = "conditionsWorkspace__data">
                            <span className = "conditionsWorkspace__label">Name</span>
                        </th>
                        <th className = "conditionsWorkspace__data">
                            <span className = "conditionsWorkspace__label">Coefficient</span>
                        </th>
                    </tr>
                </thead>
                <tbody className = "conditionsWorkspace__body">

                    {Simulation.getSpecies(simulation).map((species : Species, index : number) =>
                        <Fragment key = { index } >
                            <tr className = "conditionsWorkspace__row">
                                <td className = "conditionsWorkspace__data conditionsWorkspace__data--wider">
                                    <div className = "conditionsWorkspace__color" title = "Species color"
                                        style = { {backgroundColor: species.getColor()} }></div>
                                    <span className = "conditionsWorkspace__name"
                                        title = "Species name">{ species.getName() }</span>
                                </td>
                                <td className = "conditionsWorkspace__data">
                                    <input className = "conditionsWorkspace__name" type = "text"
                                        name = { `conditions-name-${index}` } title = "Conditions name"
                                            min = { MIN_COEFFICIENT } max = { MAX_COEFFICIENT } step = { COEFFICIENT_STEP }
                                                defaultValue = { Simulation.getConditionsName(simulation, index) }
                                                    data-conditions-index = { index } onBlur = { modifyConditionsName }/>
                                </td>
                                <td className = "conditionsWorkspace__data">
                                    <input className = "conditionsWorkspace__coefficient" type = "text"
                                        name = { `conditions-coefficient-${index}` } title = "Conditions coefficient"
                                            defaultValue = { Simulation.getConditionsCoefficient(simulation, index) }
                                                data-conditions-index = { index } onBlur = { modifyConditionsCoefficient }/>
                                </td>
                            </tr>
                        </Fragment>)}

                </tbody>
            </table>
        </form>
    );
};

export default ConditionsDashboard;
