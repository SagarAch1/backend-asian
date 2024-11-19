const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const connectDatabase = require("./database/database");

dotenv.config();
connectDatabase();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(fileUpload());
app.use(express.static("./public"));
app.use(express.json());

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  preflightContinue: true, // Pass the request to the next middleware
  optionsSuccessStatus: 204, // Status code for successful preflight requests
}

// Apply CORS middleware
app.use(cors(corsOptions))

app.get("/test", (req, res) => {
  res.send("Test API is Working");
});

// Define routes
app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/contact", require("./routes/contactRoutes"));

app.use("/api/slider", require("./routes/sliderRoutes"));
app.use("/api/event", require("./routes/eventRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/book", require("./routes/bookRoutes"));
app.use("/api/form", require("./routes/formRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
