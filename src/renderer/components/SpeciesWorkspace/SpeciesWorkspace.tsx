
import { useRef, useState, FocusEventHandler, FocusEvent, Fragment, SubmitEventHandler } from 'react';

import { Simulation, SimulationHook } from '@utils/models/simulation';
import { Species } from '@utils/models/species';
import { Cell } from '@utils/models/cell';

import { fieldShakeAnimation } from '@utils/helpers/animation';

import Button from '@components/Button/Button';

import './SpeciesWorkspace.scss';

interface SpeciesWorkspaceProps {

    simulation : SimulationHook
};

const SpeciesWorkspace = ({ simulation } : SpeciesWorkspaceProps) : React.JSX.Element => {

    const [ content, setContent ] = useState<string[]>(new Array(simulation.state.species.length).fill('')
        .map((_ : any, index : number) => Simulation.getSpeciesCells(simulation, index)
            .map((cell : Cell) => cell.toString())
                .join(', ')));

    const [ isDuringAnimation, setAnimation ] = useState<boolean>(false);

    const inputs = {

        'new-species-color': useRef(null),
        'new-species-name': useRef(null),
    };

    const modifyColor : FocusEventHandler
        = (event : FocusEvent<HTMLInputElement>) : void => {

            try {

                const target : HTMLInputElement = event.currentTarget as HTMLInputElement;

                if (!target) throw new Error('Undefined element');

                const newColor : string = target.value;

                if (!newColor) throw new Error('Undefined value');

                const speciesIndex = Number(target.dataset['speciesId']);

                if (isNaN(speciesIndex)) throw new Error('Incorrect species index');

                Simulation.setSpeciesColor(simulation, speciesIndex, newColor);

            } catch (error) { console.error(error); }
        };

    const modifyName : FocusEventHandler<HTMLInputElement>
        = (event : FocusEvent<HTMLInputElement>) : void => {

            try {

                const target : HTMLInputElement = event.currentTarget as HTMLInputElement;

                if (!target) throw new Error('Undefined element');

                const speciesIndex = Number(target.dataset['speciesId']);

                if (isNaN(speciesIndex)) throw new Error('Incorrect species index');

                const newName : string = target.value.trim();

                if (!newName || Simulation.isSpeciesNameTaken(simulation, newName))
                    fieldShakeAnimation(target, 'speciesWorkspace')
                        .then(() => target.value = Simulation.getSpeciesName(simulation, speciesIndex));

                else Simulation.setSpeciesName(simulation, speciesIndex, newName);

            } catch (error) { console.error(error); }
        };

    const modifyCells : FocusEventHandler<HTMLTextAreaElement>
        = (event : FocusEvent<HTMLTextAreaElement>) => {

            try {

                const target = event.currentTarget as HTMLTextAreaElement;

                if (!target) throw new Error('Undefined element');

                const newCells : string = target.value;

                const speciesIndex = Number(target.dataset['speciesId']);

                if (isNaN(speciesIndex)) throw new Error('Incorrect species index');

                const cells : Cell[] = [];

                const regex = /^\(-?\d+,-?\d+\)(,\(-?\d+,-?\d+\))*$/;

                if (!newCells || regex.test(newCells.replaceAll(/\s+/g, ''))) {

                    for (const row of newCells
                        .replaceAll(/\s+/g, '')
                        .slice(1, -1)
                        .split('),(')) {

                        const [x, y] = row.split(',').map(value => Number(value));

                        if (isNaN(x) || isNaN(y)) continue;

                        cells.push(new Cell(speciesIndex, x, y));
                    }

                    Simulation.replaceSpeciesCells(simulation, speciesIndex, cells);
                }

                else fieldShakeAnimation(target, 'speciesWorkspace')
                    .then(() =>
                        target.value =
                            Simulation.getSpeciesCells(simulation, speciesIndex)
                                .map((cell : Cell) => cell.toString())
                                .join(', '));

            } catch (error) { console.error(error); }
        };

    const toggleEditMode = (speciesIndex : number) : void =>
        Simulation.selectEditMode(simulation, speciesIndex);

    const removeSpecies = (speciesIndex : number) : void => {

        if (isDuringAnimation) return;

        try {

            Simulation.removeSpecies(simulation, speciesIndex);

        } catch (error) { console.error(error); }
    };

    const addSpecies : SubmitEventHandler<HTMLFormElement> = (event : React.SubmitEvent) => {

        event.preventDefault();

        if (isDuringAnimation) return;

        try {

            const target = event.currentTarget as HTMLFormElement;

            if (!target) throw new Error('Undefined element');

            const formData = new FormData(target);

            const color : string = formData.get('new-species-color') as string;
            const name : string = formData.get('new-species-name') as string;

            const errors : any = {};
            Object.keys(inputs).forEach((key : string) => errors[key] = false);

            setAnimation(true);

            if (!color)
                errors['new-species-color'] = true;

            if (!name || Simulation.getSpeciesNames(simulation).some((speciesName : string) => speciesName === name))
                errors['new-species-name'] = true;

            if (!Array.from(Object.values(errors)).some(Boolean))
                Simulation.addSpecies(simulation, color, name);

            else
                for (let input in inputs)
                    if (errors[input]) {

                        const elementRef = inputs[input as keyof typeof inputs];

                        if (!elementRef || !elementRef.current) throw new Error('Incorrect element reference');

                        const element : HTMLElement = elementRef.current;

                        if (!element) throw new Error('Undefined element');

                        fieldShakeAnimation(element, 'speciesWorkspace');
                    }

            setTimeout(() => setAnimation(false), 800);

        } catch (error) { console.error(error); }
    };

    return (
        <form className = "speciesWorkspace" onSubmit = { addSpecies }>
            <table className = "speciesWorkspace__table">
                <tbody className = "speciesWorkspace__body">
                    { Simulation.getSpecies(simulation).map((species : Species, index : number) =>
                        <Fragment key = { index }>
                            <tr className = "speciesWorkspace__row">
                                <td className = "speciesWorkspace__data">
                                    <input className = "speciesWorkspace__color" title = "Color" type = "color"
                                        data-species-id = { index } name = { `species-color-${index}` }
                                            onBlur = { modifyColor } defaultValue = { species.getColor() } />
                                </td>
                                <td className = "speciesWorkspace__input">
                                    <input className = "speciesWorkspace__name" title = "Name" type = "text"
                                        data-species-id = { index } name = { `species-name-${index}` }
                                            onBlur = { modifyName } defaultValue = { species.getName() } />
                                </td>
                                <td className = "speciesWorkspace__data speciesWorkspace__data--wider">
                                    <Button title = "Cells" type = "tile"
                                        functionality = { () => toggleEditMode(index) } />
                                </td>
                                <td className = "speciesWorkspace__data">
                                    <Button title = "Remove" type = "tile"
                                        functionality = { () => removeSpecies(index) } />
                                </td>
                            </tr>
                            <tr className = "speciesWorkspace__row">
                                <td className = "speciesWorkspace__data speciesWorkspace__data--wider">
                                    <textarea className = "speciesWorkspace__textarea" title = "Coordinates"
                                        data-species-id = { index } name = { `species-cells-${index}` }
                                            onBlur = { modifyCells } defaultValue = { content[index] } >
                                    </textarea>
                                </td>
                            </tr>
                        </Fragment>
                    )}
                </tbody>
                <tfoot className = "speciesWorkspace__footer">
                    <tr className = "speciesWorkspace__row">
                        <td className = "speciesWorkspace__smallInput">
                            <input className = "speciesWorkspace__color" type = "color"
                                ref = { inputs['new-species-color'] }
                                name = "new-species-color" title = "Color" />
                        </td>
                        <td className = "speciesWorkspace__input">
                            <input className = "speciesWorkspace__name" type = "text"
                                ref = { inputs['new-species-name'] }
                                name = "new-species-name" title = "Name"
                                placeholder = "Name"
                                spellCheck = "false" />
                        </td>
                        <td className = "speciesWorkspace__smallInput">
                            <Button title = "Add" type = "tile" isSubmit = { true } />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    );
};

export default SpeciesWorkspace;
