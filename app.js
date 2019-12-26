
const express = require("express");
const logger = require("morgan");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
//const passport = require("passport");
const sequelize = require('./models').sequelize;

const app = express();

// db 연동
sequelize.sync()
.then(() => {
    console.log("DB Connection success");
})
.catch(err => {
    console.error(err);
    console.log("DB Connect fail");
    process.exit();
})

const crud = require("./crud");

app.use(logger("dev"));
app.use(body_parser());
app.use(cookie_parser());
//app.use(passport.initialize()); // body-parser에 종속관게, passport등록

module.exports = app;