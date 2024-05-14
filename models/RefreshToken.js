const mongoose = require("mongoose");
const config = require("../config/config");

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config?.jwtRefreshTokenExpiresIn,
  },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
