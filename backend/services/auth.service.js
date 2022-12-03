const _USER = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokens = [];

const authService = {
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

  serviceCreateUser: async ({
    username,
    email,
    password,
    avatar,
    role = 0,
  }) => {
    try {
      if (!username || !email || !password) {
        return {
          code: 406,
          message: "Vui lòng nhập đầy đủ thông tin",
        };
      }

      const checkExistsUsername = await _USER.findOne({ username });

      if (checkExistsUsername) {
        return {
          code: 406,
          message: "Tên tài khoản đã tồn tại",
        };
      } else {
        const checkExistsEmail = await _USER.findOne({ email });
        if (checkExistsEmail) {
          return {
            code: 406,
            message: "Email đã tồn tại",
          };
        }
      }

      const user = await _USER.create({
        username,
        email,
        password,
        role,
        avatar,
      });

      return {
        code: 200,
        message: "Đăng kí thành công",
        element: user,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },

  serviceLoginUser: async ({ username, password, res }) => {
    try {
      const user = await _USER.findOne({ username: username });
      if (!user) {
        return {
          code: 406,
          message: "Tên tài khoản hoặc mật khẩu không khớp",
        };
      }

      const confirmPassword = await bcrypt.compare(password, user.password);

      if (!confirmPassword) {
        return {
          code: 406,
          message: "Tên tài khoản hoặc mật khẩu không khớp",
        };
      }

      if (user && confirmPassword) {
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          secure: false,
        });

        const { password, ...info } = user._doc;

        return {
          code: 200,
          message: "Đăng nhập thành công",
          element: {
            ...info,
            accessToken,
          },
        };
      }
    } catch (error) {
      return {
        code: 406,
        message: error.message,
      };
    }
  },
};

module.exports = authService;
