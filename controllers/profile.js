const { ROLE_USER, PROFILE_STATUS } = require("../config/constants");
const { CustomAPIError } = require("../errors/custom-error");
const { getUser, getUserList } = require("../services/internal/user");

const viewProfile = async (req, res) => {
  const user = await getUser(
    { _id: req.params.id, role: ROLE_USER },
    "-password"
  );

  // To give access to view only public profiles for user roles
  if (
    user?.profileStatus === PROFILE_STATUS.PRIVATE &&
    req.user.role === ROLE_USER
  ) {
    throw new CustomAPIError("Unauthorized/Forbidden view access !!", 403);
  }
  res.json({ message: "success", data: user });
};

const listProfile = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let defaultCondition = {};

  // If user role then show only public profiles
  if (req?.user?.role === ROLE_USER) {
    defaultCondition = { profileStatus: PROFILE_STATUS.PUBLIC };
  }
  const data = await getUserList(defaultCondition, "-password", skip, limit);
  res.json({ message: "success", data: data });
};

module.exports = {
  viewProfile,
  listProfile,
};
