const mongoose = require("mongoose");

// Create a counter schema for managing sequence numbers
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

// Model for the counter schema
const Counter = mongoose.model("Counter", CounterSchema);

// Define the Order schema
const OrderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      // required: true,
    },
    district: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Nepal", // Default to "Nepal" as per form's initial value
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Khalti"],
      required: true,
    },
    orderId: {
      type: Number,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },


    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate sequential order ID
OrderSchema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: "orderId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      doc.orderId = counter.sequence_value;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = mongoose.model("Order", OrderSchema);
