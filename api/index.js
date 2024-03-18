var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const experssSesstion=require("express-session")
const passport=require("passport")
const dotenv = require('dotenv');
const process = require('process');





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const cors = require("cors");

app.use(cors());
dotenv.config({ path: path.join(__dirname, "./.env.example") });

// for user logedin 

app.use(experssSesstion({
  resave :false,
  saveUninitialized:false,
  secret:"hey hello"
}
));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT,()=>{
 console.log(`the server start in ${process.env.PORT}` );
});

module.exports = app;
