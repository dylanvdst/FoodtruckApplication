import mongoose from 'mongoose';
import Review from './review';
let Schema = mongoose.Schema;

let FoodTruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  foodtype: {
    type: String,
    required: true
  },
  avgcost: Number,
  favourites: {type: Number, default: 0},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
  favouritedBy: [String],
  accountId: String
});

module.exports = mongoose.model('FoodTruck', FoodTruckSchema);
