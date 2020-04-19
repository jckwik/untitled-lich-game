import React, { Component } from 'react';
import ResourceDisplayGroup from './ResourceDisplayGroup';
import BuildingDisplayGroup from './BuildingDisplayGroup';
import { setInterval } from 'timers';

class Resource {
    constructor(quantity) {
        this.quantity = quantity;
    }
}

class Building {
    constructor(quantity, workersAssigned, powerRequired, effect, currentPower = 0) {
        this.quantity = quantity;
        this.workersAssigned = workersAssigned;
        this.powerRequired = powerRequired;
        this.effect = effect;
        this.currentPower = currentPower;
    }
}

// Instantiate all resources and buildings here
const resources = {
    "Worker": new Resource(1),
    "Worker Power": new Resource(1),
    "Bone": new Resource(1),
    "Wood": new Resource(0)
};

const buildings = {
    "Graveyard": new Building(1, 1, 100, function () { AddResource(resources.Bone, 1 * this.quantity); }, 0)
};

function AddResource(resource, amount) {
    resource.quantity += amount;
}

function gameLoop() {
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
            <div>
                <ResourceDisplayGroup resources={resources} />
                <BuildingDisplayGroup buildings={buildings} />
            </div>
        );
    }
}

export default Game;