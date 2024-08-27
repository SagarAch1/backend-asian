const User = require('../models/userModel');
const Products = require('../models/productModel');
const Orders = require('../models/orderModel');




const getDashboardStats = async (req, res) => {
  try {
    const totalUserLogins = await User.countDocuments({});
    const totalProductsAdded = await Products.countDocuments({});
    const totalOrders = await Orders.countDocuments({});

    res.status(200).json({
      totalUserLogins,
      totalProductsAdded,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
};
module.exports = { getDashboardStats };