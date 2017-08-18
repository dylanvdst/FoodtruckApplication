import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import mongoose from 'mongoose';
import Account from '../models/account';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());