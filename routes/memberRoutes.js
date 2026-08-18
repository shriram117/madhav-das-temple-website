const express = require("express");

const router = express.Router();

const upload = require("../config/memberUpload");

const {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} = require("../controllers/memberController");


router.get("/", getMembers);

router.get("/:id", getMemberById);


// ADD MEMBER + IMAGE
router.post(
    "/",
    upload.single("image"),
    createMember
);


// EDIT MEMBER + IMAGE
router.put(
    "/:id",
    upload.single("image"),
    updateMember
);


router.delete("/:id", deleteMember);


module.exports = router;