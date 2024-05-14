const express = require("express");
const router = express.Router();
const accountRoutes = require("./account");

// account related routes
router.use("/account", accountRoutes);

module.exports = router;
