
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const sequelize = require('./models').sequelize;
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
// app.use('/', express.static(path.join(__dirname, 'public'))); // 바로 아래와 같음
app.use(express.static(path.join(__dirname, 'public')));
// express.static으로 실주소: /upload 와 접근주소: /img 를 다르게 만듦
app.use('/img', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/user',userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

// catch 404 and foward to error handler 
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port listening');
});