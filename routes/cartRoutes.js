const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authGuard } = require("../middleware/authGaurd");

// Route to add item to cart
router.post("/add", authGuard, cartController.addToCart);

// Route to get cart items
router.get("/get_cart_items", authGuard, cartController.getCartItems);

// Route to update cart item quantity
router.put(
  "/update_quantity/:id",
  authGuard,
  cartController.updateCartItemQuantity
);

// Route to remove cart item
router.delete("/remove_item/:id", authGuard, cartController.removeCartItem);

module.exports = router;
