import React, { Component } from 'react';

import ResourceDisplayGroup from './ResourceDisplayGroup';
import BuildingDisplayGroup from './BuildingDisplayGroup';
import GameActionGroup from './GameActionGroup';
import TechnologyActionGroup from './TechnologyActionGroup';
import Resource from './Resource';
import * as Constants from '../constants/Constants';

import { setInterval } from 'timers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Building {
    constructor(quantity, workersAssigned, powerRequired, effect, currentPower = 0) {
        this.quantity = quantity; //number of this building
        this.workersAssigned = workersAssigned; //number of workers assigned
        this.powerRequired = powerRequired; //progress bar max value
        this.effect = effect; //effect once bar is filled
        this.currentPower = currentPower; //progress bar current value
    }
}

// Instantiate all resources and buildings here
const resources = {
    "Worker": new Resource(0),
    "Worker Power": new Resource(0),
    "Bone": new Resource(0),
    "Wood": new Resource(0)
};

const buildings = {
    "Graveyard": new Building(1, 0, 100, function () { AddResource(resources.Bone, 1 * this.quantity); }, 0),
    "Lumberyard": new Building(0, 0, 1000, function () { AddResource(resources.Wood, 1 * this.quantity); }, 0)
};

const gameState = {
    newGame: true,
	unlockTechnology: false,
	unlockCraftSkeleton: false,
	unlockAssignWorkers: false,
	unlockManaBar: false,//might be redudnant with the one above
};

function AddResource(resource, amount) {
    resource.quantity += amount;
}

function gameLoop() {
	//gameState checks
	if (gameState.newGame && resources["Bone"].quantity >= 1) {
		gameState.newGame = false;
	}
	if (!gameState.unlockCraftSkeleton && resources["Bone"].quantity >= Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE) {
		gameState.unlockCraftSkeleton = true;
	}
	if (!gameState.unlockAssignWorkers && resources["Worker"].quantity > 0) {
		gameState.unlockAssignWorkers = true;
		resources["Worker Power"].quantity = Constants.DEFAULT_WORKER_POWER;
		console.log(resources["Worker Power"].quantity);
	}

	//building calcs
    for (const [buildingKey, buildingObject] of Object.entries(buildings)) {
        buildingObject.currentPower += (buildingObject.workersAssigned * resources["Worker Power"].quantity);
        if (buildingObject.currentPower >= buildingObject.powerRequired) {
            buildingObject.effect();
			buildingObject.currentPower = 0;
        }
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { time: Date.now() };
    }
    componentDidMount() {
        this.interval = setInterval(() => { this.setState({ time: Date.now() }); gameLoop(); }, 20);
    }
    render() {
        return (
            <Container fluid="true">
                {gameState.newGame &&
					<Row>
						<Col className="text-center">You find yourself in a graveyard.</Col>
						<Col className="text-center">
							<GameActionGroup resources={resources} buildings={buildings} gameState={gameState}  />
						</Col>
					</Row>
                }
				{!gameState.newGame &&
					<Row>

						<Col>
							<ResourceDisplayGroup resources={resources} />
						</Col>
						<Col>
							<GameActionGroup resources={resources} buildings={buildings} gameState={gameState} />
						</Col>

					</Row>
				}
                {!gameState.newGame &&
                    <Row>
                        <Col>
                            <BuildingDisplayGroup buildings={buildings} />

                        </Col>
                        {gameState.unlockTechnology &&
                            <Col>
                                <TechnologyActionGroup />
                            </Col>
                        }
                    </Row>
                }
            </Container>
        );
    }
}

export default Game;