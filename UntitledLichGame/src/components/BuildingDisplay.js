var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

function workersAssignedWillNotBeNegative(currentWorkers, workersToAssign) {
    if (currentWorkers + workersToAssign >= 0) return true;
    return false;
}

function workersAssignedWillNotExceedCurrentWorkers(currentWorkersAssigned, workersToAssign, currentTotalWorkers) {
    if (currentWorkersAssigned + workersToAssign <= currentTotalWorkers) return true;
    return false;
}

function incrementWorker(workersToAssign, buildingObject, workerObject, currentlyAssignedWorkerObject) {
    if (workersAssignedWillNotExceedCurrentWorkers(currentlyAssignedWorkerObject.quantity, workersToAssign, workerObject.quantity)
        && workersAssignedWillNotBeNegative(buildingObject.workersAssigned, workersToAssign)) {
        buildingObject.workersAssigned += workersToAssign;
        currentlyAssignedWorkerObject.quantity += workersToAssign;
    }
    else {
        //TODO: add error handling and output
    }
}

export default function BuildingDisplay(props) {
    return (
        <ListGroup.Item><div>{props.buildingName}: {props.building.quantity}</div>
            <ProgressBar now={props.building.currentPower} max={props.building.powerRequired} />
            <Button onClick={() => incrementWorker(-1, props.building, props.resources.Worker, props.resources["Currently Assigned Workers"])}>-</Button>
            {props.building.workersAssigned}
            <Button onClick={() => incrementWorker(+1, props.building, props.resources.Worker, props.resources["Currently Assigned Workers"])}>+</Button>
        </ListGroup.Item>
    );
}