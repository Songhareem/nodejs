
const express = require("express");
const logger = require("morgan");

const sequelize = require('./models').sequelize;

const app = express();
sequelize.sync();

app.use(logger("dev"));

module.exports = app;