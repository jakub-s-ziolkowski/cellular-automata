
import Button from '../Button/Button';

import './EpochsDashboard.scss';

import { MouseEventHandler, MouseEvent } from 'react';

import { EnvironmentHook, Environment } from '../../models/environment';

interface EpochsDashboardProps {

    environment : EnvironmentHook
};

const EpochsDashboard = ({ environment } : EpochsDashboardProps) : React.JSX.Element => {

    const checkMode = ( strict : boolean = true ) : boolean =>
        strict ? (!environment.state.isManual || environment.state.editMode >= 0)
            : (environment.state.editMode >= 0);

    const resetSimulation : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.resetSimulation(environment);

    const toggleSimulation : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.toggleSimulation(environment);

    const nextEpoch : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.nextEpoch(environment);

    return (
        <div className = "epochsDashboard">
            <Button title = "Reset" type = "button" functionality = { resetSimulation }
                isDisabled = { checkMode() } />
            <Button title = { environment.state.isRunning ? "Start" : "Stop" } type = "button"
                functionality = { toggleSimulation } isDisabled = { checkMode(false) } />
            <Button title = "Step" type = "button" functionality = { nextEpoch }
                isDisabled = { checkMode() } />
        </div>
    );
};

export default EpochsDashboard;
