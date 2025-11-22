const path = require('path');

// Function to hold all our page listeners
var router = function (server) {
    server.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/home.html"));
    });

    server.get('/enter-data', function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/enter-data.html"));
    });

    server.get('/view-data', function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/view-data.html"));
    });

    server.get('/browse-data', function (req, res) {
        res.sendFile(path.join(__dirname + "/../client/browse-data.html"));
    });

}; 

module.exports = router;