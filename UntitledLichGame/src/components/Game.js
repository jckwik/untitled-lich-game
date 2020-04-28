﻿import React, { Component } from 'react';

import ResourceDisplayGroup from './ResourceDisplayGroup';
import BuildingDisplayGroup from './BuildingDisplayGroup';
import GameActionGroup from './GameActionGroup';
import TechnologyActionGroup from './TechnologyActionGroup';
import Resource from './Resource';
import Building from './Building';
import * as Constants from '../constants/Constants';

import { setInterval } from 'timers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Instantiate all resources and buildings here
const resources = {
    "Worker": new Resource(0, "Worker"),
    "Worker Power": new Resource(0, "Worker Power"),
    "Currently Assigned Workers": new Resource(0, "Currently Assigned Workers", false),
    "Bone": new Resource(10, "Bone"),
    "Wood": new Resource(0, "Wood")
};

const buildings = {
    "Graveyard": new Building(1, 0, 100, function () { resources.Bone.add = (1 * this.quantity); }, 0),
    "Lumberyard": new Building(0, 0, 1000, function () { resources.Wood.add = (1 * this.quantity); }, 0)
};

const gameState = {
    newGame: false,
	unlockTechnology: false,
	unlockCraftSkeleton: false,
	unlockAssignWorkers: false,
	unlockManaBar: false //might be redudnant with the one above
};

const gameStats = {
    "Total Resource Clicks": 0
};

export function RoundToX(num, X) {
    return +(Math.round(num + "e+" + X) + "e-" + X);
}

export function GetPrice(basePrice, multiplier, currentlyOwned) {
    return RoundToX(basePrice * Math.pow(multiplier, currentlyOwned), 2);
}

function gameLoop() {
    
	//gameState checks
	//if (gameState.newGame && resources["Bone"].quantity >= 1) {
	//	gameState.newGame = false;
	//}
	if (!gameState.unlockCraftSkeleton && resources["Bone"].quantity >= Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE_BASE) {
		gameState.unlockCraftSkeleton = true;
	}
	if (!gameState.unlockAssignWorkers && resources["Worker"].quantity > 0) {
		gameState.unlockAssignWorkers = true;
		resources["Worker Power"].SetIntialQuantity(Constants.DEFAULT_WORKER_POWER);
	}

	//building calcs
    for (const [buildingKey, buildingObject] of Object.entries(buildings)) {
        buildingObject.currentPower += (buildingObject.workersAssigned * resources["Worker Power"].amount);
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
                        <GameActionGroup resources={resources} buildings={buildings} gameState={gameState} gameStats={gameStats} />
						</Col>
					</Row>
                }
				{!gameState.newGame &&
					<Row>

						<Col>
							<ResourceDisplayGroup resources={resources} />
						</Col>
						<Col>
                        <GameActionGroup resources={resources} buildings={buildings} gameState={gameState} gameStats={gameStats}/>
						</Col>

					</Row>
				}
                {!gameState.newGame &&
                    <Row>
                        <Col>
                        <BuildingDisplayGroup buildings={buildings} resources={resources} gameState={gameState} gameStats={gameStats} />

                        </Col>
                        {gameState.unlockTechnology &&
                            <Col>
                        <TechnologyActionGroup buildings={buildings} resources={resources} gameState={gameState} gameStats={gameStats} />
                            </Col>
                        }
                    </Row>
                }
            </Container>
        );
    }
}

export default Game;