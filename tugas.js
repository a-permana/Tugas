var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();app.use(logger("dev"));
app.use(bodyParser.json());
const Sequelize = require('sequelize');

require("./tugasdua/books.js")(app);
// Create a Server
var server = app.listen(3001, "127.0.0.1", function() {
var host = server.address().address;
var port = server.address().port;
console.log("App listening at http://%s:%s", host, port);
});