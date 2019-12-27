
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
            return UserModel.findOne({where : {user_email:email, password: password}})
            .then(function(user) {
                if(!user) {
                    return done(null, false, {message: 'incorrect email or password'});
                }
                return done(null, user, {message: 'Logged In Successfully'});
            })
            .catch(function(err) {
                done(err);
            })
        }   
    ));

    // JWT Strategy
    passport.use(new jwt_strategy({

        jwtFromRequest: extra_jwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : "1q2w3e4r@"   // 나중에 env로 옮길 것
        },
            function(jwtPayload, done) {
                return UserModel.findOneById(jwt_strategy.id)
                .then(function(user) {
                    return done(null, user);
            })
            .catch(function(err) {
                return done(err);
            })
        }
    ));
}

