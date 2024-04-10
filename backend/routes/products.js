const express = require("express");
const router = express.Router();
const {
  getAllProdcutsByCat,
  getSingleProductByID,
  addNewProduct,
  getAdminAllProdcuts,
  getAdminSingleProductDetails,
  deleteProduct,
  searchProduct
} = require("../controllers/productsController");

router.route("/products/:category").get(getAllProdcutsByCat);
router.route("/products/:category/:id").get(getSingleProductByID);
router.route("/product/search/:field").get(searchProduct);
// admin routes
router.route("/admin/product/new").post(addNewProduct);
router.route("/admin/products").get(getAdminAllProdcuts);
router.route("/admin/product/:id").get(getAdminSingleProductDetails);
router.route("/admin/product/delete/:id").delete(deleteProduct);

module.exports = router;
