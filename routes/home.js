import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../models/foodtruck';
import Review from '../models/review';
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();
    
        
      // '/v1/' - GET all food trucks
      api.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

      return api;

}