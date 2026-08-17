
import { MouseEventHandler, useState, MouseEvent } from 'react';

import './Button.scss';

import ZoomInIcon from '../../assets/icons/zoom-in.svg';
import ZoomCenterIcon from '../../assets/icons/center.svg';
import ZoomOutIcon from '../../assets/icons/zoom-out.svg';

import SnailIcon from '../../assets/icons/snail.svg';
import HareIcon from '../../assets/icons/hare.svg';

import ResetIcon from '../../assets/icons/square.svg';
import StartIcon from '../../assets/icons/start.svg';
import PauseIcon from '../../assets/icons/pause.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';

import File from '../../assets/icons/file.svg';
import EditIcon from '../../assets/icons/edit.svg';
import Chart from '../../assets/icons/chart.svg';
import LeafIcon from '../../assets/icons/leaf.svg';
import RelationsIcon from '../../assets/icons/relations.svg';
import ClipboardEditIcon from '../../assets/icons/clipboard-edit.svg';

interface ButtonProps {

    title : string,
    type: string,
    functionality? : MouseEventHandler<HTMLButtonElement>,
    isDisabled? : boolean,
};

const Button = ({ title, type, functionality = () => {}, isDisabled = false } : ButtonProps) : React.JSX.Element => {

    const [ isDuringAnimation, setAnimation ] = useState<boolean>(false);

    const animationOnClick : MouseEventHandler = (event : MouseEvent<HTMLButtonElement>) => {

        if (isDuringAnimation) return;

        setAnimation(true);

        // buttonShakeAnimation(event.currentTarget)
        //     .then(() => setAnimation(false));
    };

    return <button className = { type + (isDisabled ? ` ${type}--inactive` : '') }
            type = "button" title = { title } onClick = { isDisabled ? animationOnClick : functionality }>
                {(() => {
                    switch (title) {

                        case 'Zoom in': return <ZoomInIcon />;
                        case 'Zoom center': return <ZoomCenterIcon />;
                        case 'Zoom out': return <ZoomOutIcon />;

                        case 'Min speed': return <SnailIcon />;
                        case 'Max speed': return <HareIcon />;

                        case 'Reset': return <ResetIcon />;
                        case 'Start': return <StartIcon />;
                        case 'Stop': return <PauseIcon />;
                        case 'Step': return <ArrowIcon />;

                        // case 'Cells': return <ClickIcon />;
                        // case 'Add': return <CirclePlus />;
                        // case 'Remove': return <CircleMinus />;

                        case 'Files': return <File />;
                        case 'Species': return <EditIcon />;
                        case 'Charts': return <Chart />;
                        case 'Conditions': return <LeafIcon />;
                        case 'Relations': return <RelationsIcon />;
                        case 'Rules': return <ClipboardEditIcon />;

                        default: return '';
                    }
                })()}
          </button>
};

export default Button;
