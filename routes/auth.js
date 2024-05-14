const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  refreshTokenToGenerateAccessToken,
  logOut,
} = require("../controllers/auth");
const asyncWrapper = require("../middleware/async");
const { signupSchema, loginSchema } = require("../validators/auth");
const { handleValidationErrors } = require("../validators");

router.post(
  "/signup",
  signupSchema,
  handleValidationErrors,
  asyncWrapper(signUp)
);

router.post("/login", loginSchema, handleValidationErrors, asyncWrapper(login));

router.post("/token/refresh", asyncWrapper(refreshTokenToGenerateAccessToken));

router.post("/logout", asyncWrapper(logOut));

module.exports = router;
