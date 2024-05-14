const { body } = require("express-validator");
const {
  PASSWORD_MIN_LENGTH,
  NAME_MIN_LENGTH,
  PROFILE_STATUS: { PRIVATE, PUBLIC },
} = require("../config/constants");

const editProfileSchema = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: NAME_MIN_LENGTH })
    .withMessage("Name must be at least 4 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone()
    .withMessage("Phone number must be valid"),

  body("bio").notEmpty().withMessage("Bio is required"),
];

const changePasswordSchema = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    ),

  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    ),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    )
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirm password does not match new password");
      }
      return true;
    }),
];

const profileStatus = [PRIVATE, PUBLIC];

const changeProfileStatusSchema = [
  body("profileStatus")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(profileStatus)
    .withMessage(
      `Status must be one of the following: ${profileStatus.join(", ")}`
    ),
];

module.exports = {
  editProfileSchema,
  changePasswordSchema,
  changeProfileStatusSchema,
};
