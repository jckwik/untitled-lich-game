var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';

export default function MessageLogDisplay({ messageLog }) {
    var output = [];
    var key = 0;
    messageLog.forEach(message => output.push(<ListGroup.Item key={key++}>{message}</ListGroup.Item>));
    return (<Jumbotron><h1>Message Log</h1>
        <ListGroup>
            {output}
        </ListGroup>
    </Jumbotron>);
}