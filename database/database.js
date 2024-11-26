// Importing mongoDB package
const mongoose = require("mongoose");

// Importing dotenv package
const dotenv = require("dotenv");

// Configuring dotenv
dotenv.config();

// External File
// Functions (Connection)
// Make a unique function name
// Export
const url='mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2'

const connectDatabase = () => {
  mongoose.connect(url).then(() => {
    console.log("Database Connected");
  });
};

//Exporting the function
module.exports = connectDatabase;
