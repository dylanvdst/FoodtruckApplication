import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../models/foodtruck';
import Review from '../models/review';
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default ({ config, db }) => {
  let api = Router();

  // '/v1/foodtruck' - GET all food trucks
  api.get('/', (req, res) => {
    FoodTruck.find({}, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // parameters
  api.param('id', (req, res, next, id) => {

    FoodTruck.findById(id, (err, foodtruck) => {
      if (err) {
        return next(err);
      }
      if (!foodtruck) { return next(new Error('Can\'t find foodtruck')) }
      req.foodtruck = foodtruck;
      return next();
    });
  });

  // '/v1/foodtruck/:id' - GET a specific food truck
  api.get('/:id', (req, res) => {
    req.foodtruck.populate('reviews', (err, foodtruck) => {
      if (err) { res.send(err); }
      res.json(req.foodtruck);
    });
  });

  api.get('/foodtype/:foodtype', (req, res) => {
    FoodTruck.find({ "foodtype": req.params.foodtype }, (err, foodtrucks) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // '/v1/foodtruck/add' - POST - add a food truck
  api.post('/add', authenticate, (req, res) => {

    let newFoodTruck = new FoodTruck();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.accountId = req.body.accountId;
    //newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    newFoodTruck.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Food Truck saved successfully' });
    });
  });

  // '/v1/foodtruck/:id' - DELETE - remove a food truck
  api.delete('/:id', authenticate, (req, res) => {
    FoodTruck.remove({
      _id: req.params.id
    }, (err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        foodtruck: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Food Truck and Reviews Successfully Removed" });
      });
    });
  });

  // '/v1/foodtruck/:id' - PUT - update an existing record
  api.put('/:id', authenticate, (req, res) => {

    req.foodtruck.name = req.body.name;
    req.foodtruck.foodtype = req.body.foodtype;
    req.foodtruck.avgcost = req.body.avgcost;
    //req.foodtruck.geometry.coordinates = req.body.geometry.coordinates;
    req.foodtruck.save((err, foodtruck) => {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // favourite a foodtruck
  // /v1/foodtruck/:id/favourite
  api.put('/:id/favourite', authenticate, function(req, res) {
    req.foodtruck.favourites = req.body.favourites;
    req.foodtruck.favouritedBy = req.body.favouritedBy;

    req.foodtruck.save((err, foodtruck) => {
      if(err){
        res.send(err);
      }
      FoodTruck.find({}, (err, foodtrucks) => {
        if (err) {
          res.send(err);
        }
        res.json(foodtrucks);
      });
    });
  });
  
  // unfavourite a foodtruck
  // /v1/foodtruck/:id/unfavourite
  api.put('/:id/unfavourite', authenticate, function(req, res) {
    req.foodtruck.favourites = req.body.favourites;
    req.foodtruck.favouritedBy = req.body.favouritedBy;
    
    req.foodtruck.save((err, foodtruck) => {
      if(err){
        res.send(err);
      }
      FoodTruck.find({}, (err, foodtrucks) => {
        if (err) {
          res.send(err);
        }
        res.json(foodtrucks);
      });
    });
  });


  // add a review by a specific foodtruck id
  // '/v1/foodtruck/reviews/add/:id'
  api.post('/reviews/add/:id', authenticate, (req, res) => {

    let newReview = new Review();

    newReview.title = req.body.title;
    newReview.text = req.body.text;
    newReview.foodtruck = req.foodtruck._id;
    newReview.save((err, review) => {
      if (err) {
        res.send(err);
      }
      req.foodtruck.reviews.push(newReview);
      req.foodtruck.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Food truck review saved' });
      });
    });
  });

  // get reviews for a specific foodtruck id
  // '/v1/foodtruck/reviews/:id'
  api.get('/reviews/:id', authenticate, (req, res) => {
    Review.find({ foodtruck: req.params.id }, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
