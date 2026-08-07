const express = require("express");

const router = express.Router();

const {

    getAllAarti,
    addAarti,
    updateAarti,
    deleteAarti

} = require("../controllers/aartiController");

router.get("/", getAllAarti);

router.post("/", addAarti);

router.put("/:id", updateAarti);

router.delete("/:id", deleteAarti);

module.exports = router;