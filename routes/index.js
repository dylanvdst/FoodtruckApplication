import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import foodtruck from './foodtruck';
import home from './home';
import account from './account';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/', home({config, db}));
  router.use('/foodtruck', foodtruck({ config, db }));
  router.use('/account', account({ config, db }));
  
  
});

export default router;