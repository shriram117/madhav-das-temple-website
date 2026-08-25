const express = require("express");

const router = express.Router();

const upload = require("../config/serviceUpload");

const {
    getAllServices,
    addService,
    updateService,
    deleteService
} = require("../controllers/serviceController");


// ======================================================
// GET ALL SERVICES
// ======================================================

router.get(
    "/",
    getAllServices
);


// ======================================================
// ADD SERVICE
// ======================================================

router.post(
    "/",
    upload.single("image"),
    addService
);


// ======================================================
// UPDATE SERVICE
// ======================================================

router.put(
    "/:id",
    upload.single("image"),
    updateService
);


// ======================================================
// DELETE SERVICE
// ======================================================

router.delete(
    "/:id",
    deleteService
);


module.exports = router;