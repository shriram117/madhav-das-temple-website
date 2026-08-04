const express = require("express");
const router = express.Router();

const upload = require("../config/eventUpload");
const {
    getAllEvents,
    getUpcomingEvents,
    addEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

// Get All Events
router.get("/upcoming", getUpcomingEvents);
router.get("/", getAllEvents);

// Add Event
router.post(
    "/",
    upload.single("image"),
    addEvent
);
// Update Event
router.put(
    "/:id",
    upload.single("image"),
    updateEvent
);
//Delete Event
router.delete("/:id", deleteEvent);

module.exports = router;