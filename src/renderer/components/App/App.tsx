
import { useReducer,  } from 'react';

import ScaleDashboard from '../ScaleDashboard/ScaleDashboard';
import SpeedDashboard from '../SpeedDashboard/SpeedDashboard';
import EpochsDashboard from '../EpochsDashboard/EpochsDashboard';
import WorkspaceDashboard from '../WorkspaceDashboard/WorkspaceDashboard';

import './App.scss';

import { EnvironmentObject, Environment } from '../../models/environment';
import { environmentReducer } from './App.helpers';

const App = () : React.JSX.Element => {
    
    const [ state, dispatch ] = useReducer(environmentReducer, {...new Environment()} as EnvironmentObject);
    const environment = { state, dispatch };

    return (
        <main className = "main">
            <section className = "display">
                <nav className = "display__sidePanel">
                    <ScaleDashboard />
                </nav>
                <section className = "display__frame">
                    <section className = "display__canvas"></section>
                    <nav className = "display__bottomPanel">
                        <SpeedDashboard />
                        <EpochsDashboard />
                    </nav>
                </section>
            </section>
            <section className = "workspaceFrame">
                <span className = "workspaceFrame__title">Title</span>
                <section className = "workspace">
                </section>
                <nav className = "workspaceFrame__nav">
                    <WorkspaceDashboard />
                </nav>
            </section>
        </main>
    );
};

export default App;
