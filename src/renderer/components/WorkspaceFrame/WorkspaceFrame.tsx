
import { WorkspaceMode, SimulationHook } from '@utils/models/simulation';

import SpeciesWorkspace from '@components/SpeciesWorkspace/SpeciesWorkspace';
import ConditionsDashboard from '@components/ConditionsDashboard/ConditionsDashboard';
import WorkspaceDashboard from '@components/WorkspaceDashboard/WorkspaceDashboard';

import './WorkspaceFrame.scss';

interface WorkspaceFrameProps {

    simulation : SimulationHook,
};

const WorkspaceFrame = ({ simulation } : WorkspaceFrameProps) : React.JSX.Element => {

    return (
        <section className = "workspaceFrame">
            <span className = "workspaceFrame__title">{ simulation.state.workspaceMode }</span>
            <section className = "workspace">
                {(() => { switch (simulation.state.workspaceMode) {

                    case WorkspaceMode.Species:

                        return <SpeciesWorkspace simulation = { simulation } />

                    case WorkspaceMode.Charts:

                        return 'ChartsWorkspace';

                    case WorkspaceMode.Conditions:

                        return <ConditionsDashboard simulation = { simulation } />

                    case WorkspaceMode.Relations:

                        return 'RelationsWorkspace'

                    case WorkspaceMode.Rules:

                        return 'RulesWorkspace'

                    default: return '';

                }})()}
            </section>
            <nav className = "workspaceFrame__nav">
                <WorkspaceDashboard simulation = { simulation } />
            </nav>
        </section>
    );
};

export default WorkspaceFrame;
