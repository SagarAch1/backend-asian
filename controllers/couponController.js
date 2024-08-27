// // controllers/couponController.js
// const Coupon = require('../models/couponModel');

// exports.applyCouponCode = async (req, res) => {
//   const { couponCode } = req.body;

//   try {
//     // Find the coupon by code
//     const coupon = await Coupon.findOne({ code: couponCode });

//     if (!coupon) {
//       return res.status(400).json({ error: 'Invalid coupon code' });
//     }

//     // Check if coupon is expired
//     const currentDate = new Date();
//     if (coupon.expirationDate && coupon.expirationDate < currentDate) {
//       return res.status(400).json({ error: 'Coupon code has expired' });
//     }

//     // Check if coupon usage limit has been reached
//     if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
//       return res.status(400).json({ error: 'Coupon code usage limit reached' });
//     }

//     // Update coupon usage count
//     if (coupon.usageLimit) {
//       coupon.usageCount += 1;
//       await coupon.save();
//     }

//     // Respond with the discount value
//     res.json({ discount: coupon.discount });
//   } catch (error) {
//     console.error('Error applying coupon:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
