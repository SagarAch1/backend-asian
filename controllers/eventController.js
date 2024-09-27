const path = require("path");
const fs = require("fs");
const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
  const { eventName, eventType, eventDate, eventTime, eventLocation } = req.body;

  if (!eventName || !eventType || !eventDate || !eventTime || !eventLocation) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  if (!req.files || !req.files.eventImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the event",
    });
  }

  const { eventImage } = req.files;
  const imageName = `${Date.now()}-${eventImage.name}`;
  const imageUploadPath = path.join(
    __dirname,
    `../public/event/${imageName}`
  );

  try {
    await eventImage.mv(imageUploadPath);

    const newEvent = new Event({
      eventName,
      eventType,
      eventDate,
      eventTime,
      eventLocation,
      eventImage: imageName,
    });

    const event = await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const allEvent = await Event.find({});
    res.status(200).json({
      success: true,
      message: "All events fetched successfully!",
      event: allEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const getSingleEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Event fetched successfully!",
      event: event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found!",
      });
    }

    const oldImagePath = path.join(
      __dirname,
      `../public/event/${event.eventImage}`
    );
    fs.unlinkSync(oldImagePath);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    if (req.files && req.files.eventImage) {
      const { eventImage } = req.files;
      const imageName = `${Date.now()}-${eventImage.name}`;
      const imageUploadPath = path.join(
        __dirname,
        `../public/event/${imageName}`
      );

      await eventImage.mv(imageUploadPath);

      req.body.eventImage = imageName;

      const existingEvent = await Event.findById(req.params.id);
      const oldImagePath = path.join(
        __dirname,
        `../public/event/${existingEvent.eventImage}`
      );
      fs.unlinkSync(oldImagePath);
    }

    // Update the event details including the new fields
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
};
