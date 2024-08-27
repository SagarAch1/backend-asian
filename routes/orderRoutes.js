const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getSingleOrder } = require('../controllers/orderController');

// Route to create a new Order message
router.post('/create', createOrder);

// Route to get all Order messages
router.get('/get_all_Orders', getAllOrders);

router.get('/get_single_order/:id', getSingleOrder);

module.exports = router;
