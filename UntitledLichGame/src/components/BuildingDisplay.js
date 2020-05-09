var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import BuildingDisplayProgressBar from './BuildingDisplayProgressBar';
import Button from 'react-bootstrap/Button';
import BuildingBuildButton from './BuildingBuildButton';

function workersAssignedWillNotBeNegative(currentWorkers, workersToAssign) {
    if (currentWorkers + workersToAssign >= 0) return true;
    return false;
}

function workersAssignedWillNotExceedCurrentWorkers(currentWorkersAssigned, workersToAssign, currentTotalWorkers) {
    if (currentWorkersAssigned + workersToAssign <= currentTotalWorkers) return true;
    return false;
}

function buildingExists(buildingObject) {
    return buildingObject.quantity > 0;
}

function incrementWorker(workersToAssign, buildingObject, workerObject, currentlyAssignedWorkerObject) {
    if (workersAssignedWillNotExceedCurrentWorkers(currentlyAssignedWorkerObject.quantity, workersToAssign, workerObject.quantity)
        && workersAssignedWillNotBeNegative(buildingObject.workersAssigned, workersToAssign)
        && buildingExists(buildingObject)) {
        buildingObject.workersAssigned += workersToAssign;
        currentlyAssignedWorkerObject.quantity += workersToAssign;
    }
    else {
        //TODO: add error handling and output
    }
}

export default function BuildingDisplay({ building, buildingName, resources, gameState }) {
    return (
        <ListGroup.Item><div>{buildingName}: {building.quantity}</div>
            <BuildingBuildButton building={building} buildingName={buildingName} />
            <BuildingDisplayProgressBar
                currentPower={building.currentPower}
                maxPower={building.powerRequired}
                currentWorkers={building.workersAssigned}
                workerPower={resources["Worker Power"].amount}
            />
            {building.ResourceOutputToString()}
            <Button onClick={() => incrementWorker(-1, building, resources.Worker, resources["Currently Assigned Workers"])}>-</Button>
            {building.workersAssigned}
            <Button onClick={() => incrementWorker(+1, building, resources.Worker, resources["Currently Assigned Workers"])}>+</Button>
        </ListGroup.Item>
    );
}