
import './SpeedDashboard.scss';

interface SpeedDashboardProps {

};

const SpeedDashboard = ({} : SpeedDashboardProps) : React.JSX.Element => {

    return (
        <div className = "speedDashboard">
            <button>B</button>
            <input className = 'speedDashboard__range' title = "Speed"
                type = "range" step = ".01" defaultValue = "50" />
            <button>B</button>
        </div>
    );
};

export default SpeedDashboard;
