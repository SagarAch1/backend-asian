const router = require("express").Router();
const {
  createSlider,
  getAllSliders,
  getSingleSlider,
  deleteSlider,
  updateSlider,
} = require("../controllers/sliderController");

router.post("/create", createSlider);
router.get("/get_all_sliders", getAllSliders);
router.get("/single-slider/:id", getSingleSlider);
router.delete("/delete-slider/:id", deleteSlider);
router.put("/update-slider/:id", updateSlider);

module.exports = router;
