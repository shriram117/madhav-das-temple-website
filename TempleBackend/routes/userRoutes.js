const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Get All Users
router.get("/", getAllUsers);

// Add User
router.post("/", addUser);

// Update User
router.put("/:id", updateUser);


router.delete("/:id", deleteUser);
module.exports = router;