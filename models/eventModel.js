const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { // Changed from sliderName to eventName for clarity
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDate: { // New field for event date
    type: Date,
    required: true,
  },
  eventTime: { // New field for event time
    type: String, // You can choose 'String' for time format like 'HH:mm'
    required: true,
  },
  eventLocation: { // New field for event location
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
