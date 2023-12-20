var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = require('./routes/index')
const session = require('express-session')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require("dotenv").config()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router.users)
app.use('/', router.suratKp)
app.use('/', router.suratSurvey)
app.use('/', router.profile)
app.use('/', router.views)
app.use('/', router.dosen)
app.use('/', router.mahasiswa)
app.use('/', router.riwayatIzinKp)
app.use('/', router.riwayatSurvey)
app.use('/', router.riwayatTugasKp)
app.use('/', router.profileAdmin)


app.use(session({
  secret: 'xhbsfhsjdfgtuy',
  resave: false,
  saveUninitialized: true,
}))
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

module.exports = app;
