var React = require('react');
import Button from './Button';
import Display from './Display';

class Resource {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Building {
    constructor(quantity, workersAssigned, powerRequired, effect) {
        this.quantity = quantity;
        this.workersAssigned = workersAssigned;
        this.powerRequired = powerRequired;
        this.effect = effect;
    }
}

const resources = {
    "Worker": 1,
    "Worker Power": 1,
    "Bone": 1,
    "Wood": 0
};

const buildings = [
    { graveyard: new Building(0, 0, 0, () => AddResource(resources.bone, 1 * this.quantity)) }
];

function AddResource(resource, amount) {
    resource.quantity = resource.quantity + amount;
}

function BuildResourceDisplay() {
    var output = [];
    for (const [resourceKey, resourceQuantity] of Object.entries(resources)) {
        console.log(resourceKey, resourceQuantity);
        output.push(<Display resource={resourceKey} quantity={resourceQuantity} />);
    }
    return (<ul key="blah">
        {output}
        </ul>);
}

export default function Game() {
    const [counter, setCounter] = React.useState(0);
    const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);
    const resourceDisplayGroup = BuildResourceDisplay();
	return (
		<div>
            {resourceDisplayGroup}
		</div>
	);
}