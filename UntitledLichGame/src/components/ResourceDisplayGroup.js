var React = require('react');
import ResourceDisplay from './ResourceDisplay';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function ResourceDisplayGroup(props) {
    var output = [];
    for (const [resourceKey, resource] of Object.entries(props.resources)) {
        //console.log(resourceKey, resourceQuantity);
        output.push(<ResourceDisplay key={resourceKey} resource={resourceKey} quantity={resource.quantity} />);
    }
    return (<Jumbotron><h1>Resources</h1>
        <ListGroup>
        {output}
        </ListGroup>
        </Jumbotron>);
}