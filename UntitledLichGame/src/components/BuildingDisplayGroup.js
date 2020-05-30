var React = require('react');
import BuildingDisplay from "./BuildingDisplay";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

function toggleAssignWorkerNumber(gameState) {
	if (gameState.assignWorkerNumber == 1)
		gameState.assignWorkerNumber = 5;
	else if (gameState.assignWorkerNumber == 5)
		gameState.assignWorkerNumber = 10
	else if (gameState.assignWorkerNumber == 10)
		gameState.assignWorkerNumber = 100
	else if (gameState.assignWorkerNumber == 100)
		gameState.assignWorkerNumber = 1000
	else if (gameState.assignWorkerNumber == 1000)
		gameState.assignWorkerNumber = "Max"
	else
		gameState.assignWorkerNumber = 1
}

export default function BuildingDisplayGroup({ resources, buildings, gameState, gameStats }) {
    var output = [];
    for (const [buildingKey, buildingObject] of Object.entries(buildings)) {
        //console.log(buildingKey, buildingObject.quantity);
        if (buildingObject.quantity > 0 || buildingObject.forceVisible === true || buildingObject.canBuild === true)
			//output.push(<BuildingDisplay key={buildingKey} resource={buildingKey} quantity={buildingObject.quantity} progress={buildingObject.currentPower} goal={buildingObject.powerRequired} workers={buildingObject.workersAssigned}/>);
            output.push(<BuildingDisplay key={buildingKey} building={buildingObject} buildingName={buildingKey} resources={resources} gameState={gameState} />);
    }
	return (<Jumbotron><div className="inline-test"><h1>Buildings</h1>
		<Button key="toggleAssignWorker" id="toggle-assign-worker" onClick={() => { toggleAssignWorkerNumber(gameState); }} >+{gameState.assignWorkerNumber}</Button> </div>
        <ListGroup>
            {output}
        </ListGroup>
    </Jumbotron>);
}