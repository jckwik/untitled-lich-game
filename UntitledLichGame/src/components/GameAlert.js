var React = require('react');
import Alert from 'react-bootstrap/Alert';

export default function GameAlert(props) {
    return (
        <Alert key={props.id} varient={props.varient}>{props.message}</Alert>
    );
}