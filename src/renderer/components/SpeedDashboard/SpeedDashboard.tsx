
import Button from '../Button/Button';

import './SpeedDashboard.scss';

import { MouseEventHandler, MouseEvent } from 'react';

import { Environment, EnvironmentHook } from '../../models/environment';

interface SpeedDashboardProps {

    environment : EnvironmentHook,
};

const SpeedDashboard = ({ environment } : SpeedDashboardProps) : React.JSX.Element => {

    const slowDown : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.decreaseSpeed(environment);

    const speedUp : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.increaseSpeed(environment);

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
