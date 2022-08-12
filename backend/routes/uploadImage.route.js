const router = require("express").Router();
const uploadImgCtrl = require("../controllers/uploadImage.controller");
const uploadCheck = require("../utils/multer");

const multipleUpload = uploadCheck.fields([
  { name: "image01", maxCount: 1 },
  { name: "image02", maxCount: 1 },
]);

router.post("/upload", multipleUpload, uploadImgCtrl.uploadImg);
router.post("/delete", uploadImgCtrl.deleteImg);
module.exports = router;
