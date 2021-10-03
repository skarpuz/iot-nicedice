const express = require("express");
const http = require("http");
const mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './dice-server.env') });

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("DB " + connection.state);
});

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
    //      > Update image
    //      > Update counters
    //      > Update DB rows
});

app.get("/dicedata", (req, res) => {
    connection.query('SELECT * from dicedata ORDER BY time DESC;', (err, rows) => {
        if(err) {
            throw err;
        }

        let dicedata = [];

        rows.forEach(row => {
            dicedata.push({
                date: row.date,
                time: row.time,
                number: row.number
            });
        });

        res.json({
            data: dicedata
        });
    });
});