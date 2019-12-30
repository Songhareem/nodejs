
const express = require("express");
const router = express.Router();
const authTokenControll = require("../controller/authTokenController");

function getAuth(req, res) {
    console.log(req.session);
    res.render('auth.pug');
}

function postAuth(req, res) {
    console.log("post auth");
    console.log(req.body);
    res.render('auth.pug');
}

router.get("/",getAuth);

module.exports = router;