var React = require('react');
import ProgressBar from 'react-bootstrap/ProgressBar';
import * as Constants from '../constants/Constants';

export default function BuildingDisplayProgressBar({ currentPower, maxPower, currentWorkers, workerPower }) {
    if (currentWorkers * workerPower >= maxPower * Constants.DISPLAY_PROGRESS_BAR_SWAP) {
        var nowOutput = currentWorkers * workerPower;
        if (nowOutput >= maxPower)
            nowOutput = maxPower;
        return <ProgressBar now={nowOutput} max={maxPower} animated />;
    }
    return <ProgressBar now={currentPower} max={maxPower} />;
}