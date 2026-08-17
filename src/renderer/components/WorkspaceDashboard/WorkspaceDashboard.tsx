
import Button from '../Button/Button';

import './WorkspaceDashboard.scss';

import { WorkspaceMode, Environment, EnvironmentHook } from '../../models/environment';

interface WorkspaceDashboardProps {

    environment : EnvironmentHook,
};

const WorkspaceDashboard = ({ environment } : WorkspaceDashboardProps) : React.JSX.Element => {

    const selectWorkspace = (workspace : WorkspaceMode) : void =>
        Environment.selectWorkspace(environment, workspace);

    const isWorkspaceSelected = (workspace : WorkspaceMode) : boolean =>
        workspace === environment.state.workspaceMode;

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
