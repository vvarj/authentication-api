const mongoose = require("mongoose");
const {
  PROFILE_STATUS,
  ROLE_ADMIN,
  ROLE_USER,
} = require("../config/constants");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
  },
  gmailId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  isGoogleSignedIn: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
  },
  profileStatus: {
    type: String,
    enum: [PROFILE_STATUS?.PRIVATE, PROFILE_STATUS?.PUBLIC],
    default: PROFILE_STATUS?.PRIVATE,
  },
  role: {
    type: String,
    enum: [ROLE_ADMIN, ROLE_USER],
    default: ROLE_USER,
  },
});

module.exports = mongoose.model("User", UserSchema);
