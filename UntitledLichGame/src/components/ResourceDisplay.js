var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';

export default function ResourceDisplay(props) {
    return (
        <ListGroup.Item>{props.resource}: {props.quantity}</ListGroup.Item>
    );
}