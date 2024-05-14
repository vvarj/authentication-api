const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log("DB ERROR ->", error));
};

module.exports = connectDB;
