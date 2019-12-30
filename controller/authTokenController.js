
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.create = create;

function create(req, res) {
    
    console.log("authToken");
    
    passport.authenticate('local', {session: false}, function (err,user) {

            console.log("==============auth==============");
            console.log(err, user);
            if(err || !user) {
                console.log(err);
                return res.status(400).json({
                    message: 'Something is wrong',
                    user : user,
                });
            }
            req.login(user, {session : false}, function (err) {

                if(err) {
                    console.log("login err");
                    res.send(err);
                }
                // jwt.sign('token 내용', 'JWT secretKey')
                const token = jwt.sign(JSON.stringify(user), "1q2w3e4r@");

                console.log(user, token);
                return res.json({user, token});
        });
    })(req, res);
};