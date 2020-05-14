import React, { Component } from 'react';

import ResourceDisplayGroup from './ResourceDisplayGroup';
import BuildingDisplayGroup from './BuildingDisplayGroup';
import GameActionGroup from './GameActionGroup';
import TechnologyActionGroup from './TechnologyActionGroup';
import MessageLogDisplay from './MessageLogDisplay';
import Resource from './Resource';
import Building from './Building';
import * as Constants from '../constants/Constants';

import { setInterval } from 'timers';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Instantiate all resources and buildings here
const resources = {
    "Worker": new Resource(0, "Worker", false),
    "Worker Power": new Resource(0, "Worker Power", false),
    "Currently Assigned Workers": new Resource(0, "Currently Assigned Workers", false),
    "Bone": new Resource(10, "Bone", true, "assets/bone.png"),
    "Coal": new Resource(0, "Coal", true, "assets/coal.png"),
    "Crystal": new Resource(0, "Crystal", true, "assets/crystal.png"),
    "Diamond": new Resource(0, "Diamond"),
    "Fire": new Resource(0, "Fire", true, "assets/fire.png"),
    "Gold": new Resource(0, "Gold", true, "assets/gold.png"),
    "Heart": new Resource(0, "Heart", true, "assets/heart.png"),
    "Ice": new Resource(0, "Ice", true, "assets/ice.png"),
    "Lightning": new Resource(0, "Lightning", true, "assets/lightning.png"),
    "Mana": new Resource(100, "Mana", false),
    "Slime": new Resource(0, "Slime", true, "assets/slime.png"),
    "Soul": new Resource(0, "Soul", true, "assets/soul.png"),
    "Stone": new Resource(0, "Stone", true, "assets/stone.png"),
    "Wood": new Resource(0, "Wood", true, "assets/wood.png"),
    "Zombie": new Resource(0, "Zombie"),
    "Army Power": new Resource(0, "Army Power")
};

const buildings = {
    "Graveyard": new Building("Graveyard",
        1,
        0,
        Constants.BUILD_WORK_REQ_GRAVEYARD_BASE,
        [[resources.Bone, Constants.BUILD_EFFECT_GRAVEYARD_BONE_BASE]],
        [[resources.Bone, Constants.BUILD_CREATE_GRAVEYARD_BONE_BASE, Constants.BUILD_CREATE_GRAVEYARD_BONE_MULTIPLIER]]),
    "Lumberyard": new Building("Lumberyard",
        0,
        0,
        Constants.BUILD_WORK_REQ_LUMBERYARD_BASE,
        [[resources.Gold, Constants.BUILD_EFFECT_LUMBERYARD_GOLD_BASE]],
        [[resources.Gold, Constants.BUILD_CREATE_LUMBERYARD_GOLD_BASE, Constants.BUILD_CREATE_LUMBERYARD_GOLD_MULTIPLIER]]),
    "Mine": new Building("Mine",
        0,
        0,
        Constants.BUILD_WORK_REQ_MINE_BASE,
        [[resources.Gold, Constants.BUILD_EFFECT_MINE_GOLD_BASE]],
        [[resources.Gold, Constants.BUILD_CREATE_MINE_GOLD_BASE, Constants.BUILD_CREATE_MINE_GOLD_MULTIPLIER]],
        function() { for (var increment = 0; increment < this.quantity; increment++) if (getRndInteger(1, 100) <= 5) resources.Diamond.add = 1; })
};

const gameState = {
    newGame: false,
    unlockLumberyard: false,
    unlockTechnology: false,
    unlockCraftSkeleton: false,
    unlockAssignWorkers: false,
    unlockManaBar: false, //might be redudnant with the one above
    assignWorkerNumber: 5,
    buildingsToBuyNumber: 1
};

const gameStats = {
    "Total Resource Clicks": 0
};

const achievements = {
    "First Worker": false
};

const messageLog = ["You find yourself in a graveyard."];

export function RoundToX(num, X) {
    return +(Math.round(num + "e+" + X) + "e-" + X);
}

export function GetPrice(basePrice, multiplier, currentlyOwned) {
    return RoundToX(basePrice * Math.pow(multiplier, currentlyOwned), 0);
}

export function GetPriceForMultiple(basePrice, multiplier, currentlyOwned, numberToBuy) {
    var price = 0;
    for (var iteration = 0; iteration < numberToBuy; iteration++) {
        price += GetPrice(basePrice, multiplier, currentlyOwned+iteration);
    }
    return price;
}

export function GrantAchievement(achievement) {
    if (achievements[achievement] === false)
        achievements[achievement] = true;
}

export function AddLogMessage(message) {
    messageLog.unshift(message);
    if (messageLog.length > 10) messageLog.pop();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop() {

    //gameState checks
    if (gameState.newGame && resources["Bone"].quantity >= 1) {
        gameState.newGame = false;
    }
    if (!gameState.unlockCraftSkeleton && resources["Bone"].quantity >= Constants.CRAFT_BONE_TO_WORKER_INPUT_BONE_BASE) {
        gameState.unlockCraftSkeleton = true;
    }
    if (!gameState.unlockAssignWorkers && resources["Worker"].quantity > 0) {
        gameState.unlockAssignWorkers = true;
        resources["Worker Power"].SetIntialQuantity(Constants.DEFAULT_WORKER_POWER);
    }
    if (!gameState.unlockLumberyard && resources.Worker.amount >= 10) {
        gameState.unlockLumberyard = true;
        buildings.Lumberyard.quantity = 1;
    }


    //building calcs
    for (const [buildingKey, buildingObject] of Object.entries(buildings)) {
        buildingObject.Tick(resources["Worker Power"].amount);
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { time: Date.now() };
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                time: Date.now(),
                resources: resources,
                buildings: buildings,
                gameState: gameState,
                achievements: achievements
            });
            gameLoop();
        }, 20);
    }
    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col sm={8}>
                        {!gameState.newGame &&
                            <Row>

                                <Col>
                                    <ResourceDisplayGroup resources={resources} buildings={buildings} gameState={gameState} gameStats={gameStats} />
                                </Col>
                                <Col>
                                    <GameActionGroup resources={resources} buildings={buildings} gameState={gameState} gameStats={gameStats} />
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
                    </Col>
                    <Col sm={4}>
                        <MessageLogDisplay messageLog={messageLog} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;