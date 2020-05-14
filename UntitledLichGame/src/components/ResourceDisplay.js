var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import { RoundToX } from './Game';

export default function ResourceDisplay({ resource, quantity, image }) {
    var imageTag = "";
    if (image !== null && image !== '')
        imageTag = <img src={image} alt={resource} />;

    return (
        <ListGroup.Item>{resource} {imageTag}: {RoundToX(quantity, 2)}</ListGroup.Item>
    );
}