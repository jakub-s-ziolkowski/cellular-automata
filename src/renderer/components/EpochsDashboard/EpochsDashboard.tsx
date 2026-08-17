
import { MouseEventHandler, MouseEvent } from 'react';

import { SimulationHook, Simulation } from '@utils/models/simulation';

import Button from '@components/Button/Button';

import './EpochsDashboard.scss';

interface EpochsDashboardProps {

    simulation : SimulationHook
};

const EpochsDashboard = ({ simulation } : EpochsDashboardProps) : React.JSX.Element => {

    const checkMode = ( strict : boolean = true ) : boolean =>
        strict ? (!simulation.state.isManual || simulation.state.editMode >= 0)
            : (simulation.state.editMode >= 0);

    const resetSimulation : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.resetSimulation(simulation);

    const toggleSimulation : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.toggleSimulation(simulation);

    const nextEpoch : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.nextEpoch(simulation);

    return (
        <div className = "epochsDashboard">
            <Button title = "Reset" type = "button" functionality = { resetSimulation }
                isDisabled = { checkMode() } />
            <Button title = { simulation.state.isRunning ? "Start" : "Stop" } type = "button"
                functionality = { toggleSimulation } isDisabled = { checkMode(false) } />
            <Button title = "Step" type = "button" functionality = { nextEpoch }
                isDisabled = { checkMode() } />
        </div>
    );
};

export default EpochsDashboard;
