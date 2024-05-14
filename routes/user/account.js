const express = require("express");
const router = express.Router();
const asyncWrapper = require("../../middleware/async");
const {
  getProfile,
  editProfile,
  changePassword,
  changeProfileStatus,
} = require("../../controllers/user");
const {
  editProfileSchema,
  changePasswordSchema,
  changeProfileStatusSchema,
} = require("../../validators/user");
const { handleValidationErrors } = require("../../validators");

router.get("/profile", asyncWrapper(getProfile));

router.put(
  "/profile",
  editProfileSchema,
  handleValidationErrors,
  asyncWrapper(editProfile)
);

router.put(
  "/change-password",
  changePasswordSchema,
  handleValidationErrors,
  asyncWrapper(changePassword)
);

router.put(
  "/change-status",
  changeProfileStatusSchema,
  handleValidationErrors,
  asyncWrapper(changeProfileStatus)
);

module.exports = router;
