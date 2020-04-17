'use strict';
var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 4242);

var server = app.listen(app.get('port'), function () {
	console.log('listening');
});
//run command: "C:\Users\Erika\Documents\code\UntitledLichGame\UntitledLichGame\node_modules\nodemon\bin\nodemon.js" server.js
// webpack command RUN FROM source folder: node_modules\.bin\webpack app.jsx --config webpack.config.js