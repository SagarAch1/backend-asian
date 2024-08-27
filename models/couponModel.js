// // models/Coupon.js
// const mongoose = require('mongoose');

// const couponSchema = new mongoose.Schema({
//   code: { type: String, required: true, unique: true },
//   discount: { type: Number, required: true }, // Percentage or fixed amount
//   expirationDate: { type: Date }, // Optional: Expiration date of the coupon
//   usageLimit: { type: Number }, // Optional: Maximum number of times coupon can be used
//   usageCount: { type: Number, default: 0 }, // Optional: Number of times coupon has been used
// });

// const Coupon = mongoose.model('Coupon', couponSchema);

// module.exports = Coupon;
