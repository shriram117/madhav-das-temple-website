const express = require("express");

const router = express.Router();

const upload = require("../config/locationUpload");

const {
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
} = require("../controllers/locationController");


// GET ALL LOCATIONS
router.get("/", getLocations);


// GET LOCATION BY ID
router.get("/:id", getLocationById);


// ADD LOCATION + IMAGE
router.post(
    "/",
    upload.single("image"),
    createLocation
);


// EDIT LOCATION + IMAGE
router.put(
    "/:id",
    upload.single("image"),
    updateLocation
);


// DELETE LOCATION
router.delete("/:id", deleteLocation);


module.exports = router;