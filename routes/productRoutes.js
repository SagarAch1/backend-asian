const express = require("express");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct, // Add the updateProduct controller
  paginationProducts,
  getProductsCount
} = require("../controllers/productController");
const router = express.Router();

router.post("/create", createProduct);
router.get("/get_all_products", getAllProducts);
router.get("/get_single_product/:id", getSingleProduct); // Update this route
router.put("/update_product/:id", updateProduct); // Ensure this route is added
router.delete("/delete-product/:id", deleteProduct);
router.get("/pagination", paginationProducts);
router.get("/count", getProductsCount);

module.exports = router;
