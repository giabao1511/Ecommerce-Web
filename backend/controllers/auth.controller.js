const bcrypt = require("bcrypt");
const {
  serviceCreateUser,
  serviceLoginUser,
} = require("../services/auth.service");

const authCtrl = {
  registerCustomer: async (req, res) => {
    try {
      const { username, email, password, avatar } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);

      const { code, message, element } = await serviceCreateUser({
        username,
        email,
        password: hashedPwd,
        avatar,
      });

      return res.json({
        statusCode: code,
        message,
        element,
      });
    } catch (error) {
      return res.status(406).json({
        error: error.message,
      });
    }
  },

  registerAdmin: async (req, res) => {
    try {
      const { username, email, password, avatar } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);

      const { code, message, element } = await serviceCreateUser({
        username,
        email,
        password: hashedPwd,
        role: 1,
        avatar,
      });

      return res.json({
        statusCode: code,
        message,
        element,
      });
    } catch (error) {
      return res.status(406).json({
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const { code, message, element } = await serviceLoginUser({
        username,
        password,
        res,
      });

      return res.json({
        statusCode: code,
        message,
        element,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = authCtrl;
