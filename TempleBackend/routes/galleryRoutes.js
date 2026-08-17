const express = require("express");
const router = express.Router();

const upload = require("../config/galleryUpload");

const authenticateToken = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/permissionMiddleware");

const {
    getAllGallery,
    getRecentGallery,
    addGallery,
    updateGallery,
    deleteGallery
} = require("../controllers/galleryController");


// Public
router.get(
    "/recent",
    getRecentGallery
);


// Protected
router.get(
    "/",
    authenticateToken,
    checkPermission("gallery"),
    getAllGallery
);

router.post(
    "/",
    authenticateToken,
    checkPermission("gallery"),
    upload.single("image"),
    addGallery
);

router.put(
    "/:id",
    authenticateToken,
    checkPermission("gallery"),
    upload.single("image"),
    updateGallery
);

router.delete(
    "/:id",
    authenticateToken,
    checkPermission("gallery"),
    deleteGallery
);


module.exports = router;