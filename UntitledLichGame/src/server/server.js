import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Game from '../components/Game';

const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
    const initialMarkup = ReactDOMServer.renderToString(<Game />);

    res.send(`
    <html>
      <head>
        <title>Untitled Lich Clicker</title>
      </head>
      <body>
        <div id="gameFrame">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `)
});

server.listen(4242, () => console.log('Server is running...'));
//run command: "C:\Users\Erika\Documents\code\UntitledLichGame\UntitledLichGame\node_modules\nodemon\bin\nodemon.js" server.js
// webpack command RUN FROM source folder: node_modules\.bin\webpack app.jsx --config webpack.config.js