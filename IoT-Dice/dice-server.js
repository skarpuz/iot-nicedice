const express = require("express");
const http = require("http");
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './dice-server.env')
});

const baseURL = new URL("localhost:" + process.env.PORT);
const dbUtil = require("./static/js/crud");
const diceAPI = require("./static/js/diceAPI");

var app = express();

// index.html in '/static' folder
app.use(express.static(__dirname + "/static"));

http.createServer(app).listen(process.env.PORT, function () {
  console.log("dice-server listening on port " + process.env.PORT + "!");
  dbUtil.clearDB(() => console.log("Database is cleared, ready for use."));
});

app.get("/rolldice", function (req, res) {
  console.log("\nGET - /rolldice");

  diceAPI.rollDice((numberRolled) => {
    res.json({
      number: numberRolled
    });

    dbUtil.create(numberRolled);
  });
});

app.get("/dicedata", (req, res) => {
  console.log("\nGET - /dicedata");

  dbUtil.getDiceData((arrayDicedata) => {
    res.json({
      amount: arrayDicedata.length,
      data: arrayDicedata
    });
  });
});

app.get('/numbercount', (req, res) => {
  console.log("\nGET - /numbercount");

  let query = retrieveQuery(req);

  if (query.get("number") !== undefined) {
    dbUtil.getCount(query.get('number'), (rollcount) => {
      res.json({
        count: rollcount
      });
    });
  } else {
    res.send("Error: missing 'number' query parameter");
  }
});

app.get('/latestroll', (req, res) => {
  console.log("\nGET - /latestroll");

  dbUtil.getLatestRoll((latestroll) => {
    res.json({
      roll: latestroll,
    });
  });
});

function retrieveQuery(req) {
  let urlParts = new URL(baseURL + req.url);
  return urlParts.searchParams;
}