var React = require('react');
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Save, Load, Export, ResetGameCompletely } from './SaveFunctions';

export default function Settings(props) {

    var saveButton = <Button key="saveButton" onClick={() => { Save(); }}>Save Game</Button>;
    var loadButton = <Button key="loadButton" onClick={() => { Load(); }}>Load Game</Button>;
    var exportButton = <Button key="exportButton" onClick={() => { Export(); }}>Export Game</Button>;
    var resetButton = <Button key="resetButton" onClick={() => { ResetGameCompletely(); }}>Reset Game (Warning non-recoverable)</Button>;

    return (<Jumbotron><h1>Settings</h1>
        <ListGroup>
            <ListGroup.Item>{saveButton}</ListGroup.Item>
            <ListGroup.Item>{loadButton}</ListGroup.Item>
            <ListGroup.Item>{exportButton}</ListGroup.Item>
            <ListGroup.Item>{resetButton}</ListGroup.Item>
        </ListGroup>
    </Jumbotron>);
}