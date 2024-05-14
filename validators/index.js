const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObject = {};
    errors.errors.forEach((error) => {
      // to covert array to objects and also if same key exist then choose the first key Not to update the errorObject
      if (!Object.hasOwnProperty.call(errorObject, error?.path)) {
        errorObject[error?.path] = error?.msg;
      }
    });
    return res
      .status(400)
      .json({ message: "validation error", errors: errorObject });
  }
  next();
};

module.exports = { handleValidationErrors };
