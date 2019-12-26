
const passport = require("passport");
const passport_jwt = require("passport-jwt");
const passport_local = require("passport-local");

const jwt_strategy = passport_jwt.Strategy;
const extra_jwt = passport_jwt.ExtractJwt;
const local_strategy = passport_local.Strategy;

let UserModel = require("../models").User;

module.exports = function() {

    // local strategy
    passport.use(new localStorage({
        usernameField: "email",
        passportField: "password",
    },
    function (email, password, done) {
        // 저장된 User와 비교
    }
    ))
}

