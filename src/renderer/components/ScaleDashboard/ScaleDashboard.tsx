
import Button from '../Button/Button';

import './ScaleDashboard.scss';

import { MouseEventHandler, MouseEvent } from 'react';

import { Environment, EnvironmentHook } from '../../models/environment';

interface ScaleDashboardProps {

    environment : EnvironmentHook,
};

const ScaleDashboard = ({ environment } : ScaleDashboardProps) : React.JSX.Element => {

    const zoomIn : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.increaseScale(environment);

    const zoomCenter : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.resetPerspective(environment);

    const zoomOut : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Environment.decreaseScale(environment);

    return (
        <div className = "scaleDashboard">
            <Button title = "Zoom in" type = "button" functionality = { zoomIn } />
            <Button title = "Zoom center" type = "button" functionality = { zoomCenter } />
            <Button title = "Zoom out" type = "button" functionality = { zoomOut } />
        </div>
    );
};

export default ScaleDashboard;
