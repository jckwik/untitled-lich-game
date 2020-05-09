var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ManaDisplay({ resources }) {

    var plural = "workers";
    if (resources.Worker.amount - resources["Currently Assigned Workers"].amount === 1)
        plural = "worker";

    var idleWorkersLabel = `${resources.Worker.amount - resources["Currently Assigned Workers"].amount} ${plural} idle`;

    return (
        <ListGroup.Item><div>Mana used: {resources.Worker.amount} of {resources.Mana.amount}</div>
            <ProgressBar>
                <ProgressBar now={resources.Mana.amount - resources.Worker.amount} max={resources.Mana.amount} striped variant="info" key="currentWorkers" label={idleWorkersLabel} />
                <ProgressBar now={resources.Worker.amount - resources["Currently Assigned Workers"].amount} striped variant="warning" key="idleWorkers" />
            </ProgressBar>
        </ListGroup.Item>
    );
}