var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var mysql = require("mysql");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(3000);
console.log("listening to port 3000");
