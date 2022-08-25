const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authCtrl = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.SECRET_ACCESS_KEY,
      {
        expiresIn: "30s",
      }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.SECRET_REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    );
  },

  registerUser: async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    

  },
};
