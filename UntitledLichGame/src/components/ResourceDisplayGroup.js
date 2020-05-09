var React = require('react');
import ResourceDisplay from './ResourceDisplay';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ManaDisplay from './ManaDisplay';

export default function ResourceDisplayGroup({ resources, buildings, gameState, gameStats }) {
    var output = [];
    if (gameState.newGame === false) output.push(<ManaDisplay key="Manabar" resources={resources} />);
    for (const [resourceKey, resource] of Object.entries(resources)) {
        if (resource.amount > 0 && resource.shouldDisplay) {
            output.push(<ResourceDisplay key={resourceKey} resource={resourceKey} quantity={resource.amount} />);
        }
    }
    return (<Jumbotron><h1>Resources</h1>
        <ListGroup>
            {output}
        </ListGroup>
    </Jumbotron>);
}