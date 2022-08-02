const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");

// Get all products
router.get("/all", productCtrl.getAllProducts);

// Get detail product
router.get("/detail/:id", productCtrl.getDetailProduct);

// Create product
router.post("/create", productCtrl.createProduct);

// Edit product
router.post("/edit/:id", productCtrl.editProduct);

// Delete product
router.delete("/delete/:id", productCtrl.deleteProduct);

module.exports = router;
