var React = require('react');
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Resource from './Resource';
import * as Constants from '../constants/Constants';

function getBone(resource, gameState) {
    resource.quantity += 1;
    //gameState.newGame = false;
	// <Button onClick={() => getBone(props.resources["Bone"], props.gameState)}>Search Graveyard</Button>
}

function actionWorkBuilding(building, amount, gameState) {
	building.currentPower += amount;
	//console.log(`Adding ${amount} to ${building}`);
    //gameState.newGame = false;
}

function actionCreateResource(cost, result, props) {
	//cost and result are formatted as an array of Resources
	for (const [costKey, costObject] of Object.entries(cost)) {
		console.log(costObject.name);
		props.resources[costObject.name].quantity -= costObject.quantity;
	}
	for (const [resultKey, resultObject] of Object.entries(result)) {
		console.log(resultObject.name);
		props.resources[resultObject.name].quantity += resultObject.quantity;
	}
}

export default function GameActionGroup(props) {
	var output = [];

	//can always work graveyard
	output.push(<Button onClick={() => actionWorkBuilding(props.buildings["Graveyard"], Constants.CLICK_GRAVEYARD_BUTTON, props.gameState)}>Search Graveyard</Button>);

	if (props.gameState.unlockCraftSkeleton) {
		//disable button if not enough resources... maybe put this in game instead?
		if (props.resources["Bone"].quantity >= Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE) {
			output.push(
				<Button onClick={() => actionCreateResource([new Resource(Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE, "Bone")], [new Resource(1, "Worker")], props)}>Build Skeleton</Button>
			)
		}
		else {
			output.push(
				<Button disabled onClick={() => actionCreateResource([new Resource(Constants.CRAFT_BONE_TO_WORKER_OUTPUT_WORKER, "Bone")], [new Resource(1, "Worker")], props)}>Build Skeleton</Button>
			)
		}
		
	}

	return (<Jumbotron><h1>Actions</h1>
		{output}
	</Jumbotron>);
}