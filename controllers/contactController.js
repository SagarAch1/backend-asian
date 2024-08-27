const Contact = require('../models/contactModel'); 

// Function to create a new contact message
exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact message created successfully', data: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contact message', error });
  }
};

// Function to get all contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ message: 'Contacts retrieved successfully', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contacts', error });
  }
};
