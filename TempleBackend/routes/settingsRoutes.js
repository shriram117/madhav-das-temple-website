const express = require("express");
const router = express.Router();

const upload = require("../config/settingsUpload");

const {
    getSettings,
    updateSettings
} = require("../controllers/settingsController");

// Get Settings
router.get("/", getSettings);

// Update Settings
router.put(
    "/",
    upload.fields([
        { name: "temple_logo", maxCount: 1 },
        { name: "temple_banner", maxCount: 1 }
    ]),
    updateSettings
);

module.exports = router;