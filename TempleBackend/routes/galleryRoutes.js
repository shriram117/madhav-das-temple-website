const express = require("express");
const router = express.Router();

const upload = require("../config/galleryUpload");

const {
    getAllGallery,
    getRecentGallery,
    addGallery,
    updateGallery,
    deleteGallery
} = require("../controllers/galleryController");

router.get("/recent", getRecentGallery);

router.get("/", getAllGallery);

router.post("/", upload.single("image"), addGallery);

router.put("/:id", upload.single("image"), updateGallery);

router.delete("/:id", deleteGallery);

module.exports = router;