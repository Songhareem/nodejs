
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
      username: 'junhyeok',
      password: 'hWB/AM3MHngW2N0tphhwhSjH1FagibQamovfQCvo7v2sCfxhDoMv8NEtZjHy3hv5gU242zMpymWIkptqVP5BoocBczcKPLrQ9WNpO+I9NjBUxOMgBazjg649mjc+3kbIomkMSWDxvdxshCXbhNiTmD7iNVeCou/RXTmSDv9mZ8M=',
      displayName: 'Jun',
      salt: 'nYMlZ4HIiz3A0LF2A9t4Hj8NdrdQm8OOLVKf8zoZj9NGOO0EDINhCJaxsocXflE3pBqMSATj5xY0nnmBHvg7IQ=='
    }
]

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.username);
});

//deserializeUser => serializeUser의 done(null, user.username);을 전달받음
passport.deserializeUser(function (uname, done) {
    console.log('deserializeUser', uname);
    
    for(i=0; i<users.length; i++) {
        var user = users[i];
        if(user.username == uname) {
            
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
    
        for(i=0; i<users.length; i++){
            
            const user = users[i];
            if(hash === user.password){
                console.log('LocalStrategy', user);
                done(null, user);
            } else {
                done(null, false);
            }
        });
      }
    }
    done(null, false);
  }));


app.get('/', function (req, res) {

    if(req.user && req.user.displayName) {
        res.render('welcome.pug', {dname: req.user.displayName});
    } else {
        res.render('auth.pug');
    }
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