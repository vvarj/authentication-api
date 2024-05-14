const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/auth");
const asyncWrapper = require("../middleware/async");
const { body } = require("express-validator");
const { signupSchema, loginSchema } = require("../validators/auth");
const { handleValidationErrors } = require("../validators");

router.post(
  "/signup",
  signupSchema,
  handleValidationErrors,
  asyncWrapper(signUp)
);

router.post("/login", loginSchema, handleValidationErrors, asyncWrapper(login));

module.exports = router;
