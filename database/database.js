// Importing mongoDB package
const mongoose = require("mongoose")

// Importing dotenv package
const dotenv = require("dotenv")

// Configuring dotenv
dotenv.config()

// External File
// Functions (Connection)
// Make a unique function name
// Export
const url = process.env.MONGODB_URL

const connectDatabase = () => {
  mongoose.connect(url).then(() => {
    console.log("Database Connected")
  })
}

//Exporting the function
module.exports = connectDatabase
