const express = require("express");
const router = express.Router();
const {
  createReview,
  getProductReviews,
  editReview,
  deleteReview
} = require("../controllers/reviewsController");

router.route("/review/new").post(createReview);
router.route("/review/:id").get(getProductReviews);
router.route("/review/edit/:id").put(editReview);
router.route("/review/delete/:id").delete(deleteReview);

module.exports = router;
