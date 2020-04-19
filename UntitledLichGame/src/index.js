﻿import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './style/game.css';

ReactDOM.render(
    <Game />,
    document.getElementById('gameFrame'),
);