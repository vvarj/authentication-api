const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const userRoutes = require("./user/index");
const profileRoutes = require("./profile");
const { isUserAuthenicated } = require("../middleware/authorizer");

// authentication routes
router.use("/auth", authRoutes);

// user routes
router.use("/user", isUserAuthenicated, userRoutes);

// common route for both admin and user
router.use("/profile", isUserAuthenicated, profileRoutes);

module.exports = router;
