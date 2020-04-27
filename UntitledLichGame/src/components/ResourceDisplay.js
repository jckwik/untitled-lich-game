var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';

export default function ResourceDisplay({ resource, quantity }) {
    return (
        <ListGroup.Item>{resource}: {quantity}</ListGroup.Item>
    );
}