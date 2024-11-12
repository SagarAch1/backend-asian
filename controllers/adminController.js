const User = require('../models/userModel');






const getDashboardStats = async (req, res) => {
  try {
    const totalUserLogins = await User.countDocuments({});
 

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