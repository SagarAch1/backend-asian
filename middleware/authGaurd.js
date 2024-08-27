const jwt = require("jsonwebtoken");

// Auth Guard Middleware
const authGuard = (req, res, next) => {
  console.log(req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }

  try {
    const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeUserData;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Not Authenticated",
    });
  }
};

// Admin Guard Middleware
const adminGuard = (req, res, next) => {
  console.log(req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }

  try {
    const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeUserData; // id, isAdmin

    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Permission Denied! Admin access required.",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Not Authenticated",
    });
  }
};

module.exports = {
  authGuard,
  adminGuard,
};
