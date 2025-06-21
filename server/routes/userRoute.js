const express = require('express');
const router = express.Router();
// Importing user controller functions
const { register, login, checkUser } = require("../controller/userController");
// authMiddleware to protect routes
const authMiddleware = require("../middleware/authMiddleware");

// register route
router.post("/register", register)

// login route
router.post("/login", login)

// check user route
router.get("/check", authMiddleware, checkUser);



module.exports = router;