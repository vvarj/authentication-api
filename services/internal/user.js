const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { CustomAPIError } = require("../../errors/custom-error");
const { SALT_ROUND } = require("../../config/constants");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const user = new User(data);
  const hashedPassword = await bcrypt.hash(data?.password, SALT_ROUND);
  user.password = hashedPassword;
  await user.save();
};

const generateAccessToken = async (user) => {
  const accessToken = jwt.sign(
    { userId: user?._id, role: user?.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: config?.jwtAccessTokenExpiresIn }
  );
  return accessToken;
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    { userId: user?._id, role: user?.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: config?.jwtRefreshTokenExpiresIn }
  );
  return refreshToken;
};

const handleLogin = async (data) => {
  const userExist = await User.findOne({ email: data.email });
  if (!userExist) {
    throw new CustomAPIError("Email not registered !!", 400);
  }

  await verifyPassword(data.password, userExist?.password);

  const user = await User.findOne({ email: data.email }).select("-password");

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

const verifyPassword = async (inputPassword, encriptedPassword) => {
  const isPasswordVerified = await bcrypt.compare(
    inputPassword,
    encriptedPassword
  );
  if (!isPasswordVerified) throw new CustomAPIError("Incorrect Password", 400);
  return isPasswordVerified;
};

const getUser = async (condition, select) => {
  const user = await User.findOne(condition).select(select);
  return user;
};

const getUserList = async (condition, select, skip, limit) => {
  const [users, total] = await Promise.all([
    User.find(condition).select(select).skip(skip).limit(limit),
    User.countDocuments(condition),
  ]);
  return { users, total };
};

const updateUser = async (condition, data) => {
  const user = await User.findOneAndUpdate(condition, data, {
    new: true,
  }).select("-password");
  return user;
};

const handlePasswordChange = async (data) => {
  const user = await User.findById(data?.userId);
  await verifyPassword(data?.oldPassword, user?.password);
  const hashedPassword = await bcrypt.hash(data?.newPassword, SALT_ROUND);
  await User.findOneAndUpdate(
    { _id: data?.userId },
    { $set: { password: hashedPassword } },
    {
      new: true,
    }
  );
};

module.exports = {
  createUser,
  handleLogin,
  getUser,
  updateUser,
  handlePasswordChange,
  getUserList,
};
