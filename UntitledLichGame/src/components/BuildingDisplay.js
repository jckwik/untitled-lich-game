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

function maximumNumberOfWorkersCurrentlyAssigned(currentWorkers, currentWorkersAssigned) {
    return currentWorkers === currentWorkersAssigned;
}

function buildingExists(buildingObject) {
    return buildingObject.quantity > 0;
}

function incrementWorker(workersToAssign, buildingObject, workerObject, currentlyAssignedWorkerObject) {
	console.log(workersToAssign);
	if (workersToAssign == "Max") {
		var newWorkersToAssign = workerObject.amount - currentlyAssignedWorkerObject.amount;
		buildingObject.workersAssigned += newWorkersToAssign;
		currentlyAssignedWorkerObject.add = newWorkersToAssign;
	}
	else if (isNaN(workersToAssign)) {//negative "Max"
		var workersToUnassign = buildingObject.workersAssigned;
		buildingObject.workersAssigned -= workersToUnassign;
		currentlyAssignedWorkerObject.remove = workersToUnassign;
	}
    else if (workersAssignedWillNotExceedCurrentWorkers(currentlyAssignedWorkerObject.amount, workersToAssign, workerObject.amount)
        && workersAssignedWillNotBeNegative(buildingObject.workersAssigned, workersToAssign)
        && buildingExists(buildingObject)) {
        buildingObject.workersAssigned += workersToAssign;
        currentlyAssignedWorkerObject.add = workersToAssign;
    }
    else if (!workersAssignedWillNotExceedCurrentWorkers(currentlyAssignedWorkerObject.amount, workersToAssign, workerObject.amount)
        && buildingExists(buildingObject)) {
        var newWorkersToAssign = workerObject.amount - currentlyAssignedWorkerObject.amount;
        buildingObject.workersAssigned += newWorkersToAssign;
        currentlyAssignedWorkerObject.add = newWorkersToAssign;
    }
    else if (!workersAssignedWillNotBeNegative(buildingObject.workersAssigned, workersToAssign)
        && buildingExists(buildingObject)) {
        var workersToUnassign = buildingObject.workersAssigned;
        buildingObject.workersAssigned -= workersToUnassign;
        currentlyAssignedWorkerObject.remove = workersToUnassign;
    }
    else {
        console.log("What is happening I can't actually assign workers?!?!?!?!?");
    }
}

export default function BuildingDisplay({ building, buildingName, resources, gameState }) {
    var decrementWorkerButton = <Button onClick={() => incrementWorker(-gameState.assignWorkerNumber, building, resources.Worker, resources["Currently Assigned Workers"])}>-{gameState.assignWorkerNumber}</Button>;
    if (building.workersAssigned === 0 || !buildingExists(building))
        decrementWorkerButton = <Button disabled onClick={() => incrementWorker(-gameState.assignWorkerNumber, building, resources.Worker, resources["Currently Assigned Workers"])}>-{gameState.assignWorkerNumber}</Button>;
    var incrementWorkerButton = <Button onClick={() => incrementWorker(gameState.assignWorkerNumber, building, resources.Worker, resources["Currently Assigned Workers"])}>+{gameState.assignWorkerNumber}</Button>;
    if (maximumNumberOfWorkersCurrentlyAssigned(resources.Worker.amount, resources["Currently Assigned Workers"].amount) || !buildingExists(building))
        incrementWorkerButton = <Button disabled onClick={() => incrementWorker(+gameState.assignWorkerNumber, building, resources.Worker, resources["Currently Assigned Workers"])}>+{gameState.assignWorkerNumber}</Button>;

    return (
        <ListGroup.Item><div>{buildingName}: {building.quantity}</div>
            <BuildingBuildButton building={building} buildingName={buildingName} numberToBuild={gameState.buildingsToBuyNumber} />
            <BuildingDisplayProgressBar
                currentPower={building.currentPower}
                maxPower={building.powerRequired}
                currentWorkers={building.workersAssigned}
                workerPower={resources["Worker Power"].amount}
            />
            {building.ResourceOutputToString()}
            {decrementWorkerButton}
            {building.workersAssigned}
            {incrementWorkerButton}
        </ListGroup.Item>
    );
}