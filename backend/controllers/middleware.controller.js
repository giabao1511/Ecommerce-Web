const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({
            message: "Token không hợp lệ",
          });
        }
        req.user = user;
        next();
      });
    }
  },

  verifyTokenAdmin: async (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role != 1) {
        return res.status(403).json({
          message: "You don't have permission",
        });
      }

      next();
    });
  },
};

module.exports = middlewareController;
