const express = require('express');
const router = express.Router();
const { createContact, getAllContacts } = require('../controllers/contactController');

// Route to create a new contact message
router.post('/create', createContact);

// Route to get all contact messages
router.get('/get_all_contacts', getAllContacts);

module.exports = router;
