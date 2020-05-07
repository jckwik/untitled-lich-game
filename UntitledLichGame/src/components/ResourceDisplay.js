var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import { RoundToX } from './Game';

export default function ResourceDisplay({ resource, quantity }) {
    return (
        <ListGroup.Item>{resource}: {RoundToX(quantity, 2)}</ListGroup.Item>
    );
}