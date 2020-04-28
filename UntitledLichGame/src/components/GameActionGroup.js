var React = require('react');
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import Resource from './Resource';
import * as Constants from '../constants/Constants';
import { GetPrice } from './Game';

function actionWorkBuilding(building, amount, gameState) {
    building.currentPower += amount;
    //console.log(`Adding ${amount} to ${building} for a total of ${building.currentPower}`);
    if (building.currentPower >= building.powerRequired)
        gameState.newGame = false;
}

function actionCreateResource(cost, result, resources) {
    //cost and result are formatted as an array of Resources
    for (const [costKey, costObject] of Object.entries(cost)) {
        resources[costObject.name].remove = costObject.amount;
    }
    for (const [resultKey, resultObject] of Object.entries(result)) {
        resources[resultObject.name].add = resultObject.amount;
    }
}

function skeletonCraftActionButton(resources) {
    var output;
    var button;

    var priceBone = GetPrice(Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE_BASE, Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE_MULTIPLIER, resources["Worker"].amount);

    //disable button if not enough resources
    if (resources["Bone"].amount >= priceBone) {
        button = (
            <Button key="unlockSkeleton"
                onClick={() => actionCreateResource([new Resource(priceBone, "Bone")], [new Resource(1, "Worker")], resources)}
            >
                Build Skeleton
            </Button>
        );
    }
    else {
        button = (
            <Button key="unlockSkeleton"
                disabled
                onClick={() => actionCreateResource([new Resource(priceBone, "Bone")], [new Resource(1, "Worker")], resources)}
            >
                Build Skeleton
            </Button>
        );
    }

    output = (
        <OverlayTrigger
            overlay={<Tooltip id="bone-to-worker">Bone: {priceBone}</Tooltip>}
            placement="bottom"
            shouldUpdatePosition
            key="bone-to-worker"
        >
            <span className="d-inline-block">
                {button}
            </span>
        </OverlayTrigger>
    );

    return output;
}

export default function GameActionGroup({ resources, buildings, gameState, gameStats }) {
    var buttons = [];

    //can always work graveyard
    buttons.push(<Button key="createBone" onClick={() => { actionWorkBuilding(buildings["Graveyard"], Constants.CLICK_GRAVEYARD_BUTTON, gameState); }}>Search Graveyard</Button>);

    if (gameState.unlockCraftSkeleton) {
        buttons.push(skeletonCraftActionButton(resources));
    }

    //var x = 0;
    //buttons.forEach(button => {
    //	output.push(<Row>)

    //	x++;
    //	</Row>	
    //	});

    return (<Jumbotron><h1>Actions</h1>
        {buttons}
    </Jumbotron>);
}