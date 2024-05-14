const { CustomAPIError } = require("../errors/custom-error");
const {
  createUser,
  handleLogin,
  getUser,
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
  res.setHeader("Accesss-Token", accessToken);
  res.setHeader("Refresh-Token", refreshToken);

  res.json({ message: "Login success", data: user });
};

module.exports = {
  signUp,
  login,
};
