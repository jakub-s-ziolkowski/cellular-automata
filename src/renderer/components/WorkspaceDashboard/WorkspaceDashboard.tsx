
import { WorkspaceMode, SimulationHook, Simulation } from '@utils/models/simulation';

import Button from '@components/Button/Button';

import './WorkspaceDashboard.scss';

interface WorkspaceDashboardProps {

    simulation : SimulationHook,
};

const WorkspaceDashboard = ({ simulation } : WorkspaceDashboardProps) : React.JSX.Element => {

    const selectWorkspace = (workspace : WorkspaceMode) : void =>
        Simulation.selectWorkspaceMode(simulation, workspace);

    const isWorkspaceSelected = (workspace : WorkspaceMode) : boolean =>
        workspace === simulation.state.workspaceMode;

    return (
        <div className = "workspaceDashboard">
            <Button title = "Files" type = "tile" />
            <hr className = "workspaceDashboard__line" />
            <Button title = "Species" type = "tile"
                functionality = { () => selectWorkspace(WorkspaceMode.Species) }
                isDisabled = { isWorkspaceSelected(WorkspaceMode.Species) } />
            <Button title = "Charts" type = "tile"
                functionality = { () => selectWorkspace(WorkspaceMode.Charts) }
                isDisabled = { isWorkspaceSelected(WorkspaceMode.Charts) } />
            <Button title = "Rules" type = "tile"
                functionality = { () => selectWorkspace(WorkspaceMode.Rules) }
                isDisabled = { isWorkspaceSelected(WorkspaceMode.Rules) } />
            <Button title = "Conditions" type = "tile"
                functionality = { () => selectWorkspace(WorkspaceMode.Conditions) }
                isDisabled = { isWorkspaceSelected(WorkspaceMode.Conditions) } />
            <Button title = "Relations" type = "tile"
                functionality = { () => selectWorkspace(WorkspaceMode.Relations) }
                isDisabled = { isWorkspaceSelected(WorkspaceMode.Relations) } />
        </div>
    );
};

export default WorkspaceDashboard;
