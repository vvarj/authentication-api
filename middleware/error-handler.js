const { CustomAPIError } = require("../errors/custom-error");
const mongoose = require("mongoose");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      message: "Invalid request",
      error: err.message,
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(500).json({
      message: "Mongoose schema validation error",
      error: err.message,
    });
  }

  // To log the other errors in the console
  console.log("Error occured:", err);

  res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandlerMiddleware;
