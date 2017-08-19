import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
require('./config/passport');
import Account from './models/account';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import uiRoute from './routes/home';
import db from './db';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
app.use(passport.initialize());


// api routes v1
app.use('/', uiRoute({db, config}));
app.use('/v1', routes);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

export default app;