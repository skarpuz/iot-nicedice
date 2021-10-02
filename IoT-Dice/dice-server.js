const express = require("express");
const http = require("http");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './dice-server.env') });

var app = express();

// index.html in '/static' folder
app.use(express.static(__dirname + "/static"));

http.createServer(app).listen(process.env.PORT, function () {
    console.log("dice-server listening on port " + process.env.PORT + "!");
});

app.get("/rolldice", function (req, res) {
    console.log("/rolldice - GET");
    res.json({
        data: null
    });

    // TODO

    // 0.  Arduino/Wemos: Button click
    // 01. Arduino stuurt request naar het endpoint waar deze comment zich in bevindt -> localhost:{$PORT}/rolldice

    // 1. Request naar API: GET http://api.iot.hva-robots.nl/dice
    // 2. Response van API: JSON met dice data
    // 3. JSON parsen

    // 4. Update DB met latest roll (UPDATE)

    // 5. Van DB dice count ophalen (READ)
    // 6. Correct plaatje ophalen

    // 7. Met AJAX de browser updaten
});