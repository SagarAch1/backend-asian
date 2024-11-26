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
const url='mongodb://asianAdmin:AdminAsian123321@localhost:27019/asian?authSource=admin'

const connectDatabase = () => {
  mongoose.connect(url).then(() => {
    console.log("Database Connected");
  });
};

//Exporting the function
module.exports = connectDatabase;
