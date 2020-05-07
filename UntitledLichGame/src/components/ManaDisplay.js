var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ManaDisplay({ resources }) {
    
    return (
        <ListGroup.Item><div>Workers: {resources.Worker.amount} of {resources.Mana.amount}</div>
            <ProgressBar now={resources.Mana.amount - resources.Worker.amount} max={resources.Mana.amount} striped varient="info" />
        </ListGroup.Item>
    );
}