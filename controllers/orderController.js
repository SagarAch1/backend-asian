const Order = require("../models/orderModel");
const Cart = require("../models/cartModel"); // Assuming you have a Cart model

// Function to create a new Order
exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, ...orderData } = req.body; // Extract userId from the request body

    await Cart.deleteMany({ userId });

    // Construct the cartItems array
    const cartItems = [];
    let index = 0;
    while (req.body[`cartItems[${index}][productId]`]) {
      cartItems.push({
        productId: req.body[`cartItems[${index}][productId]`],
        quantity: req.body[`cartItems[${index}][quantity]`],
        price: req.body[`cartItems[${index}][price]`],
      });
      index++;
    }


    // Include cartItems in the orderData
    orderData.cartItems = cartItems;

    // Create new Order with userId and orderData
    const newOrder = new Order({ ...orderData, userId });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create Order", error });
  }
};

// Function to get all Orders with populated product details
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("cartItems.productId", {
      productName: 1,
      productPrice: 1,
      productImage: 1,
      productCategory: 1,
    });
    res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve Orders", error });
  }
};

// Function to get a single Order with populated product details
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id }).populate(
      "cartItems.productId",
      {
        productName: 1,
        productPrice: 1,
        productImage: 1,
        productCategory: 1,
      }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order retrieved successfully", data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve Order", error });
  }
};
