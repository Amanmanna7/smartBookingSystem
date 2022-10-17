const jwt = require("jsonwebtoken");

const signToken = (info) => {
  return jwt.sign(info, process.env.SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { signToken };
