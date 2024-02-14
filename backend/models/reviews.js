const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserTest',
    required: true,
  },
  userName:{
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductTest',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ReviewsTest', reviewSchema);
