
import { MouseEventHandler, MouseEvent } from 'react';

import { SimulationHook, Simulation } from '@utils/models/simulation';

import Button from '@components/Button/Button';

import './ScaleDashboard.scss';

interface ScaleDashboardProps {

    simulation : SimulationHook,
};

const ScaleDashboard = ({ simulation } : ScaleDashboardProps) : React.JSX.Element => {

    const zoomIn : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.increaseScale(simulation);

    const zoomCenter : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.resetPerspective(simulation);

    const zoomOut : MouseEventHandler
        = (_ : MouseEvent<HTMLButtonElement>) : void =>
            Simulation.decreaseScale(simulation);

    return (
        <div className = "scaleDashboard">
            <Button title = "Zoom in" type = "button" functionality = { zoomIn } />
            <Button title = "Zoom center" type = "button" functionality = { zoomCenter } />
            <Button title = "Zoom out" type = "button" functionality = { zoomOut } />
        </div>
    );
};

export default ScaleDashboard;
