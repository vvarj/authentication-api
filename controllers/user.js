const { CustomAPIError } = require("../errors/custom-error");
const {
  getUser,
  updateUser,
  handlePasswordChange,
} = require("../services/internal/user");

const getProfile = async (req, res) => {
  const user = await getUser({ _id: req.user.userId }, "-password");
  res.json({ message: "success", data: user });
};

const editProfile = async (req, res) => {
  const { name, email, phoneNumber, bio } = req.body;
  const isUserExist = await getUser({ email });

  if (isUserExist && String(isUserExist?._id) !== String(req.user.userId)) {
    throw new CustomAPIError("Email id alredy exist !!", 400);
  }

  const user = await updateUser(
    { _id: req.user.userId },
    { name, email, phoneNumber, bio }
  );
  res.json({ message: "Profile updated successfully", data: user });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  await handlePasswordChange({
    userId: req?.user?.userId,
    oldPassword,
    newPassword,
    confirmPassword,
  });
  res.json({ message: "Password changed successfully" });
};

const changeProfileStatus = async (req, res) => {
  const user = await updateUser(
    { _id: req.user.userId },
    { $set: { profileStatus: req?.body?.profileStatus } }
  );
  res.json({ message: "status changed successfully", data: user });
};

module.exports = {
  getProfile,
  editProfile,
  changePassword,
  changeProfileStatus,
};
