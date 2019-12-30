
const express = require("express");
const router = express.Router();

function getAuth(req, res) {
    console.log(req.session);
    res.render('home.pug');
}

router.get("/",getAuth);

module.exports = router;