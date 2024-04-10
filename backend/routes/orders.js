const express = require("express");
const router = express.Router();
const {
  newOrder,
  getUserOrders,
  getOrderById,
  addToCart,
  deleteFromCart,
  getItemsFromCart,
  clearCartAffterOrder,
  getAllOrders
} = require("../controllers/ordersController");

router.route("/order/new").post(newOrder);
router.route("/orders").get(getUserOrders);
router.route("/order/:id").get(getOrderById);
router.route("/order/clear/cart").put(clearCartAffterOrder);

router.route("/cart/add/:id").put(addToCart);
router.route("/cart/delete/:id").delete(deleteFromCart);
router.route("/cart").get(getItemsFromCart);

// admin

router.route("/admin/orders").get(getAllOrders);


module.exports = router;
