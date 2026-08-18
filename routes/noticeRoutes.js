const express = require("express");

const {
    getNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
} = require("../controllers/noticeController");

const router = express.Router();


// GET all notices
router.get("/", getNotices);


// GET notice by ID
router.get("/:id", getNoticeById);


// CREATE notice
router.post("/", createNotice);


// UPDATE notice
router.put("/:id", updateNotice);


// DELETE notice
router.delete("/:id", deleteNotice);


module.exports = router;