const { body } = require("express-validator");
const { PASSWORD_MIN_LENGTH, NAME_MIN_LENGTH } = require("../config/constants");

const signupSchema = [
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

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    ),

  body("bio").notEmpty().withMessage("Bio is required"),
];

const loginSchema = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    ),
];

module.exports = { signupSchema, loginSchema };
