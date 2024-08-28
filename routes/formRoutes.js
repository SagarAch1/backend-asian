const express = require('express');
const router = express.Router();
const { createForm, getAllForm } = require('../controllers/formController');

// Route to create a new form message
router.post('/create', createForm);

// Route to get all form messages
router.get('/get_all_form', getAllForm);

module.exports = router;
