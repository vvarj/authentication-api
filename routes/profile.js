const express = require("express");
const { viewProfile, listProfile } = require("../controllers/profile");
const asyncWrapper = require("../middleware/async");
const router = express.Router();

// To list all profiles
router.get("/", asyncWrapper(listProfile));

// To view a profile
router.get("/:id", asyncWrapper(viewProfile));

module.exports = router;
