const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const uploadCheck = require("../utils/multer");

const multipleUpload = uploadCheck.fields([
  { name: "image01", maxCount: 1 },
  { name: "image02", maxCount: 1 },
]);

// Get all products
router.get("/all", productCtrl.getAllProducts);

// Get detail product
router.get("/detail/:id", productCtrl.getDetailProduct);

// Create product
router.post("/create", multipleUpload, productCtrl.createProduct);

// Edit product
router.post("/edit/:id", productCtrl.editProduct);

// Delete product
router.delete("/delete/:id", productCtrl.deleteProduct);

module.exports = router;
