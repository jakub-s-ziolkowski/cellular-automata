
import { useReducer } from 'react';

import { SimulationObject, Simulation } from '@utils/models/simulation';
import { simulationReducer } from './App.helpers';

import ScaleDashboard from '@components/ScaleDashboard/ScaleDashboard';
import SpeedDashboard from '@components/SpeedDashboard/SpeedDashboard';
import EpochsDashboard from '@components/EpochsDashboard/EpochsDashboard';
import WorkspaceDashboard from '@components/WorkspaceDashboard/WorkspaceDashboard';

import './App.scss';

const App = () : React.JSX.Element => {
    
    const [ state, dispatch ] = useReducer(simulationReducer, {...new Simulation()} as SimulationObject);
    const simulation = { state, dispatch };

    return (
        <main className = "main">
            <section className = "display">
                <nav className = "display__sidePanel">
                    <ScaleDashboard simulation = { simulation } />
                </nav>
                <section className = "display__frame">
                    <section className = "display__canvas"></section>
                    <nav className = "display__bottomPanel">
                        <SpeedDashboard simulation = { simulation } />
                        <EpochsDashboard simulation = { simulation } />
                    </nav>
                </section>
            </section>
            <section className = "workspaceFrame">
                <span className = "workspaceFrame__title">{ simulation.state.workspaceMode }</span>
                <section className = "workspace">

                </section>
                <nav className = "workspaceFrame__nav">
                    <WorkspaceDashboard simulation = { simulation } />
                </nav>
            </section>
        </main>
    );
};

export default App;
