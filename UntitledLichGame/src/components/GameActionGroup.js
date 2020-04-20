var React = require('react');
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

function getBone(resource, gameState) {
    resource.quantity += 1;
    gameState.newGame = false;
}

export default function GameActionGroup(props) {


    return (<Jumbotron><h1>Actions</h1>
        <Button onClick={() => getBone(props.resources["Bone"], props.gameState)}>Search Graveyard</Button>
    </Jumbotron>);
}