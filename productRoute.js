const express = require("express");
const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require("../controller/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;