var React = require('react');
import BuildingDisplay from "./BuildingDisplay";
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function BuildingDisplayGroup({ resources, buildings, gameState, gameStats }) {
    var output = [];
    for (const [buildingKey, buildingObject] of Object.entries(buildings)) {
		//console.log(buildingKey, buildingObject.quantity);
		if (buildingObject.quantity > 0)
			//output.push(<BuildingDisplay key={buildingKey} resource={buildingKey} quantity={buildingObject.quantity} progress={buildingObject.currentPower} goal={buildingObject.powerRequired} workers={buildingObject.workersAssigned}/>);
            output.push(<BuildingDisplay key={buildingKey} building={buildingObject} buildingName={buildingKey} resources={resources} gameState={gameState} />);
    }
    return (<Jumbotron><h1>Buildings</h1>
        <ListGroup>
            {output}
        </ListGroup>
    </Jumbotron>);
}