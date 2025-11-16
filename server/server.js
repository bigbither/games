
const express = require('express');
const server = express();

const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

server.use(cors());
server.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/client", express.static(path.resolve(__dirname + "/../client/")));

const port = 5000;

//Page Listeners (our router)
var router = require('./router.js');
router(server);

//Service Listeners (our data processes)
var services = require('./services.js');
services(server);
//Listen
var app = server.listen(port, function(err) {
    if (err) throw err;
    console.log("Listening on port " + port);
});