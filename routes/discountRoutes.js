const router = require('express').Router();
const { createDiscount, getAllDiscounts, getSingleDiscount, deleteDiscount } = require("../controllers/discountController");



router.post("/create", createDiscount);
router.get("/get_all_discounts", getAllDiscounts);
router.get("/single-discount/:id", getSingleDiscount);
router.delete("/delete-discount/:id", deleteDiscount);

module.exports = router;
