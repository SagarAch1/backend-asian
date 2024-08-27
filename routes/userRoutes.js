const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { authGuard } = require("../middleware/authGaurd");

// Creating user registration route
router.post("/create", userController.createUser);

// Creating user login route
router.post("/login", userController.loginUser);
// forgot password
router.post("/forgot_password", userController.forgotPassword);
router.post("/verify_otp", userController.verifyOtp);

// Get Current User Profile
router.get("/current_profile", authGuard, userController.getCurrentProfile);

// Get User Token
router.post("/get_user_token", userController.getToken);

// Update User Profile
router.put("/update_profile", authGuard, userController.updateUserProfile);

// Get all User
router.get("/get_all_user", userController.getAllUser);

module.exports = router;
