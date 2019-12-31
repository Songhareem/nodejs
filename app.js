
const express = require("express");
const logger = require("morgan");
const cookie_parser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./config/passport");
const routeAuth = require("./routes/auth");
const routeRoot = require("./routes/root");
const models = require('./models');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const pbkdf2password = require('pbkdf2-password');
//const authToken = require("./controller/authTokenController");

const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;

const app = express();
const hasher = pbkdf2password();

// db 연동
models.sequelize.sync()
.then(() => {
    console.log("DB Connection success");
    require("./crud");
})
.catch(err => {
    console.error(err);
    console.log("DB Connect fail");
    process.exit();
})

// session 세팅
app.use(session({
    key: 'service_name',
    secure: true,       // https에서만 세션을 주고 받음
    HttpOnly: true,     // js를 통해 세션 쿠키를 사용하지 못하게 함
    secret: '1q2w3e4r@',
    resave: false,
    saveUninitialized: true,
    store: new mysqlStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '0000',
        database: "for_test"
    }),
}))

app.set('view-engine', "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookie_parser());
app.use(passport.initialize());
app.use(passport.session());

const users = [
    
    {
      useremail: 'elaha00@naver.com',
      password: 'hWB/AM3MHngW2N0tphhwhSjH1FagibQamovfQCvo7v2sCfxhDoMv8NEtZjHy3hv5gU242zMpymWIkptqVP5BoocBczcKPLrQ9WNpO+I9NjBUxOMgBazjg649mjc+3kbIomkMSWDxvdxshCXbhNiTmD7iNVeCou/RXTmSDv9mZ8M=',
      name: 'Song',
      salt: 'nYMlZ4HIiz3A0LF2A9t4Hj8NdrdQm8OOLVKf8zoZj9NGOO0EDINhCJaxsocXflE3pBqMSATj5xY0nnmBHvg7IQ=='
    }
    
]

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.useremail);
});

//deserializeUser => serializeUser의 done(null, user.username);을 전달받음
passport.deserializeUser(function (uemail, done) {
    console.log('deserializeUser', uemail);
    
    for(i=0; i<users.length; i++) {
        var user = users[i];
        if(user.useremail == uemail) {
            
            return done(null, user);
        }
    }
});

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
       
        const uname = username;
        const pwd = password;
        
        console.log("asdasd");

        for(i=0; i<users.length(); i++){
            const user = users[i];
            console.log(user);
            if(uname === user.username){
                console.log("correct useremail");
                hasher({password: pwd, salt: user.salt}, 
                    function (err,pass,salt, hash) {
                        if(hash === user.password) {
                            console.log("correct password");
                            console.log(hash, user.password);
                            done(null, user);
                        } else {
                            done(null, false, { message: 'Incorrect password.'});
                        }
                    });
            } else {
                done(null, false, { message: 'Incorrect email.'});
            }
        }
        // err 처리
        done(null, false);
    }
  ));


app.get('/', function (req, res) {

    if(req.user && req.user.displayName) {
        console.log('move welcome');
        res.render('welcome.pug', {dname: req.user.displayName});
    } else {
        res.render('home.pug');
    }
});

app.post('/', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/home',
    failureFlash: false,
}));

app.get('/welcome', function (req, res) {
    console.log(req.user, req.user.name);
    if(req.user && req.user.name) {
        res.render('welcome.pug', {dname: req.user.name});
    } else {
        res.redirect('/');
    }
});

app.get('/register', function(req,res) {

    res.render('register.pug');
})

app.post('/register', function (req, res) {

    console.log(users);

    const uemail = req.body.email;
    const pwd = req.body.password;
    const dname = req.body.name;
    hasher({password: pwd}, function (err, pass, salt, hash) {
        const user = {
            useremail: uemail,
            password: hash,
            name: dname,
            salt: salt,
        }
        users.push(user);
        req.login(user, function (err) {
            req.session.save( function() {
                res.redirect('/welcome');
            });
        });
    });

    console.log(users);
});

app.get('/logout', function(req,res) {
    req.logout();
    req.session.save(function () {
        res.redirect('/');
    });
});


/*
//passportConfig();

app.use('/', routeRoot);
app.use('/auth', routeAuth);

app.use('/', passport.authenticate('jwt', {session: false}), routeRoot);
app.get('/auth', function getAuth(req, res) {
    console.log("get auth");
    res.render('auth.pug');
});
app.post('/auth', authToken.create);
*/

module.exports = app;