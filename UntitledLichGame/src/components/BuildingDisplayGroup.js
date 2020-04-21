var React = require('react');
import BuildingDisplay from "./BuildingDisplay";
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function BuildingDisplayGroup(props) {
    var output = [];
    for (const [buildingKey, buildingObject] of Object.entries(props.buildings)) {
		//console.log(buildingKey, buildingObject.quantity);
		if (buildingObject.quantity > 0)
			output.push(<BuildingDisplay key={buildingKey} resource={buildingKey} quantity={buildingObject.quantity} progress={buildingObject.currentPower} goal={buildingObject.powerRequired} />);
    }
    return (<Jumbotron><h1>Buildings</h1>
        <ListGroup>
            {output}
        </ListGroup>
    </Jumbotron>);
}