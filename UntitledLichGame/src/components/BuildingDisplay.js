var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

function incrementWorker(amount, building) {
	building.workersAssigned += amount;
}

export default function BuildingDisplay(props) {
    return (
		<ListGroup.Item><div>{props.buildingName}: {props.building.quantity}</div>
			<ProgressBar now={props.building.currentPower} max={props.building.powerRequired} />
			<Button onClick={() => incrementWorker(-1, props.building)}>-</Button>
			{props.building.workersAssigned}
			<Button onClick={() => incrementWorker(+1, props.building)}>+</Button>
		</ListGroup.Item>
    );
}