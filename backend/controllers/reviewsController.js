const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Reviews = require("../models/reviews");
const Products = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

// Create a review => /api/v1/review/new
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!req.user) {
    return next(
      new ErrorHandler("You must be logged in to leave a review", 401)
    );
  }

  const user = req.user._id;

  const userName = req.user.firstName + " " + req.user.lastName;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await Products.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = await Reviews.create({
    userID: user,
    userName,
    product: productId,
    rating,
    comment,
  });

  const reviews = await Reviews.find({ product: productId });

  let totalRating = 0;

  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.rating = totalRating / reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    review,
  });
});

// Get reviews for a product => /api/v1/review/:id
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new ErrorHandler("Invalid product ID", 400));
  }

  const product = await Products.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = await Reviews.find({ product: productId });

  res.status(200).json({
    success: true,
    reviews,
  });
});
// Edit review => /api/v1/review/edit/:id
exports.editReview = catchAsyncErrors(async (req, res, next) => {
  const reviewId = req.params.id;
  const { comment, rating } = req.body;

  if (!req.user) {
    return next(
      new ErrorHandler("You must be logged in to edit a review", 401)
    );
  }

  const review = await Reviews.findById(reviewId);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  if (review.userID.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to edit this review", 403)
    );
  }
  if (rating <= 0 || rating > 5) {
    return next(new ErrorHandler("Please select rating stars", 401));
  }
  review.comment = comment;
  review.rating = rating;

  await review.save();

  const product = await Products.findById(review.product);
  const reviews = await Reviews.find({ product: product._id });

  let totalRating = 0;

  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.rating = totalRating / reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    review,
  });
});

//Delete reviews for a product => /api/v1/review/delete/:id
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const reviewId = req.params.id;

  if (!req.user) {
    return next(
      new ErrorHandler("You must be logged in to delete a review", 401)
    );
  }

  const review = await Reviews.findById(reviewId);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  const productId = review.product;
  if (review.userID.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to delete this review", 403)
    );
  }

  const rdata = await Reviews.findByIdAndDelete(reviewId);

  const product = await Products.findById(productId);
  const reviews = await Reviews.find({ product: productId });

  let totalRating = 0;

  reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.rating = reviews.length > 0 ? totalRating / reviews.length : 0;

  await product.save();

  res.status(200).json({
    success: true,
    review: rdata,
    message: "Review deleted successfully",
  });
});

//CHECK IS USER AUCH TO EDIT/DEL => /api/v1/review/checkIsAuch/:id
exports.checkIsUserAuchToEditDel = catchAsyncErrors(async (req, res, next) => {
  const reviewId = req.params.id.toString();
  const userId = req.user._id.toString();

  if (reviewId !== userId) {
    return next(new ErrorHandler("You are not authorized for this.", 403));
  }

  res.status(200).json({
    success: true,
  });
});
