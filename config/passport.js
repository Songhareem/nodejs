
const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportLocal = require("passport-local");

const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

let UserModel = require("../models").User;
const dummy = require("../dummy");

console.log("models read");

module.exports = function() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            console.log('LocalStrategy', username, password);
            console.log(dummy[0]);
        
            if(username === dummy[0].useremail) {
                console.log("correct name");
                if(password === dummy[0].password) {
                    console.log("correct password");
                    return done(null, dummy[0]);
                } else {
                    console.log("incorrect password");
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }
            } else {
                console.log("incorrect name");
                return done(null, false, {
                    message: 'Incorrect username'
                });
            }
            /*
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
            */
        }
    ));

    passport.use(new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : "1q2w3e4r@"
        },
        function (jwt_payload, done) {
            console.log("jwt strategy");
            console.log("jwt_payload.sub :" + jwt_payload.sub);
            /*
            User.findOne({id: jwt_payload.sub},
                function(err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                        // or you could create a new account
                    }
                });
            */
        }
    ));
}
