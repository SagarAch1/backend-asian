const router = require("express").Router();
const {
  createGallery,
  getAllGallery,
  getSingleGallery,
  deleteGallery,
  updateGallery,
} = require("../controllers/galleryController");

router.post("/create", createGallery);
router.get("/get_all_gallery", getAllGallery);
router.get("/single-gallery/:id", getSingleGallery);
router.delete("/delete-gallery/:id", deleteGallery);
router.put("/update-gallery/:id", updateGallery);

module.exports = router;
