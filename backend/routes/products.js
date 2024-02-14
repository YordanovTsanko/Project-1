const express = require("express");
const router = express.Router();
const {
  getAllProdcutsByCat,
  getSingleProductByID,
  addNewProduct
} = require("../controllers/productsController");

router.route("/products/:category").get(getAllProdcutsByCat);
router.route("/products/:category/:id").get(getSingleProductByID);
// admin routes
router.route("/admin/product/new").post(addNewProduct);

module.exports = router;
