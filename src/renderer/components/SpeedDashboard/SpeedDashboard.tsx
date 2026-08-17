
import { MouseEventHandler, MouseEvent } from 'react';

import { SimulationHook, Simulation } from '@utils/models/simulation';

import Button from '@components/Button/Button';

import './SpeedDashboard.scss';

interface SpeedDashboardProps {

    simulation : SimulationHook,
};

const SpeedDashboard = ({ simulation } : SpeedDashboardProps) : React.JSX.Element => {

    const slowDown : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.decreaseSpeed(simulation);

    const speedUp : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.increaseSpeed(simulation);

    return (
        <div className = "speedDashboard">
            <Button title = "Min speed" type = "pin" functionality = { slowDown } />
            <input className = 'speedDashboard__range' title = "Speed"
                type = "range" step = ".01" defaultValue = "50" />
            <Button title = "Max speed" type = "pin" functionality = { speedUp } />
        </div>
    );
};

export default SpeedDashboard;
