const { CustomAPIError } = require("../errors/custom-error");
const {
  createUser,
  handleLogin,
  getUser,
  handleRefreshToken,
  handleLogout,
} = require("../services/internal/user");

const signUp = async (req, res) => {
  const { name, email, phoneNumber, password, bio } = req.body;
  const isUserExist = await getUser({ email });
  if (isUserExist) {
    throw new CustomAPIError("User already registed", 400);
  }
  const user = await createUser({ name, email, phoneNumber, password, bio });
  res.status(201).json({ message: "Signed Up successfully", data: user });
};

const login = async (req, res, next) => {
  const { user, accessToken, refreshToken } = await handleLogin({
    email: req.body.email,
    password: req.body.password,
  });

  // To set token in the response header
  res.setHeader("accesss-token", accessToken);
  res.setHeader("refresh-token", refreshToken);

  res.json({ message: "Login success", data: user });
};

const refreshTokenToGenerateAccessToken = async (req, res) => {
  const token = req.headers["refresh-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = await handleRefreshToken(token);
  res.setHeader("accesss-token", accessToken);
  return res.status(200).json({ message: "Success Access token generated !!" });
};

const logOut = async (req, res) => {
  const token = req.headers["refresh-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await handleLogout(token);
  return res.status(200).json({ message: "Logout Success !!" });
};
module.exports = {
  signUp,
  login,
  refreshTokenToGenerateAccessToken,
  logOut,
};
