var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function BuildingDisplay(props) {
    return (
        <ListGroup.Item><div>{props.resource}: {props.quantity}</div>
            <ProgressBar now={props.progress} max={props.goal} /></ListGroup.Item>
    );
}