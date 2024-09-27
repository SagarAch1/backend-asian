

// module.exports = router;
const router = require("express").Router();
const {
  createEvent,
  getAllEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

router.post("/create", createEvent);
router.get("/get_all_event", getAllEvent);
router.get("/single-event/:id", getSingleEvent);
router.delete("/delete-event/:id", deleteEvent);
router.put("/update-event/:id", updateEvent);

module.exports = router;
