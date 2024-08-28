const Form = require('../models/formModel'); 

// Function to create a new form message
exports.createForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json({ message: 'Form message created successfully', data: newForm });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create form message', error });
  }
};

// Function to get all form messages
exports.getAllForm = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ message: 'Form retrieved successfully', data: forms });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve form', error });
  }
};
