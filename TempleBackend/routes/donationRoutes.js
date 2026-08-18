const express = require("express");

const router = express.Router();

const {
    getAllDonations,
    getDonationById,
    addDonation,
    updateDonation,
    deleteDonation,
    getDonationSummary
} = require("../controllers/donationController");


// =====================================
// DONATION SUMMARY
// =====================================

router.get("/summary", getDonationSummary);


// =====================================
// GET ALL DONATIONS
// =====================================

router.get("/", getAllDonations);


// =====================================
// GET DONATION BY ID
// =====================================

router.get("/:id", getDonationById);


// =====================================
// ADD DONATION
// =====================================

router.post("/", addDonation);


// =====================================
// UPDATE DONATION
// =====================================

router.put("/:id", updateDonation);


// =====================================
// DELETE DONATION
// =====================================

router.delete("/:id", deleteDonation);


module.exports = router;