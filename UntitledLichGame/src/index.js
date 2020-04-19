﻿import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.hydrate(
    <Game />,
    document.getElementById('gameFrame'),
);