const router = require("express").Router();
const uploadImgCtrl = require("../controllers/uploadImage.controller");
const uploadCheck = require("../utils/multer");

router.post("/upload", uploadCheck.single("image"), uploadImgCtrl.uploadImg);
router.post("/delete", uploadImgCtrl.deleteImg);
module.exports = router;
