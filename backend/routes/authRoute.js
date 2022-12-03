const router = require("express").Router();
const authController = require("../controllers/auth.controller");
// const middlewareController = require("../controllers/middlewareController");

router.post("/customer/register", authController.registerCustomer);
router.post("/admin/register", authController.registerAdmin);
router.post("/login", authController.loginUser);
// router.post("/refresh", authController.requestRefreshToken);
// router.post(
//   "/logout",
//   middlewareController.verifyToken,
//   authController.logOutUser
// );

module.exports = router;
