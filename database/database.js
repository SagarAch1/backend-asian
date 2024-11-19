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

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_CLOUD).then(() => {
    console.log("Database Connected");
  });
};

//Exporting the function
module.exports = connectDatabase;
