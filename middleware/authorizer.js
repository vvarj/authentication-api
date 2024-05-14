const jwt = require("jsonwebtoken");

const isUserAuthenicated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(authHeader);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access !!" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid/expired" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  isUserAuthenicated,
};
