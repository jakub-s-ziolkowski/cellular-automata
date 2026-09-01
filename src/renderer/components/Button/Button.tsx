
import { MouseEventHandler, MouseEvent, useState } from 'react';

import { buttonShakeAnimation } from '@utils/helpers/animation';

import './Button.scss';

import ZoomInIcon from '@assets/icons/zoom-in.svg';
import ZoomCenterIcon from '@assets/icons/center.svg';
import ZoomOutIcon from '@assets/icons/zoom-out.svg';

import SnailIcon from '@assets/icons/snail.svg';
import HareIcon from '@assets/icons/hare.svg';

import ResetIcon from '@assets/icons/square.svg';
import StartIcon from '@assets/icons/start.svg';
import PauseIcon from '@assets/icons/pause.svg';
import ArrowIcon from '@assets/icons/arrow.svg';

import FileIcon from '@assets/icons/file.svg';
import EditIcon from '@assets/icons/edit.svg';
import ChartIcon from '@assets/icons/chart.svg';
import LeafIcon from '@assets/icons/leaf.svg';
import RelationsIcon from '@assets/icons/relations.svg';
import ClipboardEditIcon from '@assets/icons/clipboard-edit.svg';

import CirclePlusIcon from '@assets/icons/circle-plus.svg'
import CircleMinusIcon from '@assets/icons/circle-minus.svg'
import HandClickIcon from '@assets/icons/hand-click.svg'

interface ButtonProps {

    title : string,
    type: string,
    functionality? : MouseEventHandler<HTMLButtonElement>,
    isDisabled? : boolean,
    isSubmit? : boolean,
};

const Button = ({ title, type, functionality = () => {}, isDisabled = false, isSubmit = false } : ButtonProps) : React.JSX.Element => {

    const [ isDuringAnimation, setAnimation ] = useState<boolean>(false);

    const animationOnClick : MouseEventHandler = (event : MouseEvent<HTMLButtonElement>) => {

        if (isDuringAnimation) return;

        setAnimation(true);

        buttonShakeAnimation(event.currentTarget, type)
            .then(() => setAnimation(false));
    };

    return <button className = { type + (isDisabled ? ` ${type}--inactive` : '') }
            type = { isSubmit ? 'submit' : 'button' } title = { title } onClick = { isDisabled ? animationOnClick : functionality }>
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
                        
                        case 'Files': return <FileIcon />;
                        case 'Species': return <EditIcon />;
                        case 'Charts': return <ChartIcon />;
                        case 'Conditions': return <LeafIcon />;
                        case 'Relations': return <RelationsIcon />;
                        case 'Rules': return <ClipboardEditIcon />;

                        case 'Cells': return <HandClickIcon />;
                        case 'Add': return <CirclePlusIcon />;
                        case 'Remove': return <CircleMinusIcon />;

                        default: return '';
                    }
                })()}
          </button>
};

export default Button;
