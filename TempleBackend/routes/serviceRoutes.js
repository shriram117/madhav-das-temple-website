const express = require("express");
const router = express.Router();

const upload = require("../config/serviceUpload");

const {
    getAllServices,
    addService,
    updateService,
    deleteService
} = require("../controllers/serviceController");

router.get("/", getAllServices);

router.post("/", upload.single("image"), addService);

router.put("/:id", upload.single("image"), updateService);

router.delete("/:id", deleteService);

module.exports = router;