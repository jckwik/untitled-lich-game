var React = require('react');
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function BuildingDisplayProgressBar({ currentPower, maxPower, currentWorkers, workerPower }) {
    if (currentWorkers * workerPower >= maxPower * 0.25) {
        var nowOutput = currentWorkers * workerPower;
        if (nowOutput >= maxPower)
            nowOutput = maxPower;
        return <ProgressBar now={nowOutput} max={maxPower} animated />;
    }
    return <ProgressBar now={currentPower} max={maxPower} />;
}