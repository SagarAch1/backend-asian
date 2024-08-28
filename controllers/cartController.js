const Cart = require("../models/cartModel");

// Function to add an item to the cart
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      const newCartItem = new Cart({ userId, productId, quantity });
      await newCartItem.save();
    }
    res.status(200).send("Item added to cart");
  } catch (error) {
    res.status(500).send("Error adding item to cart");
  }
};

// Function to get cart items
exports.getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.find({ userId }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cart items");
  }
};

// Function to update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating cart item quantity");
  }
};

// Function to remove cart item
exports.removeCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing cart item");
  }
};
