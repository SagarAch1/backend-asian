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
  origin:  'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.send("Test API is Working");
});
app.post("/api/payment/verify-payment", (req, res) => {
  const { token, amount } = req.body;
  // Verify payment with Khalti API here
  // Respond with appropriate status and data
  res.status(200).json({ message: "Payment verified successfully" });
});

// Define routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/coupon", require("./routes/discountRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/item", require("./routes/itemRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/ReviewRoutes"));
app.use("/api/slider", require("./routes/sliderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
