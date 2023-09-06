const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;