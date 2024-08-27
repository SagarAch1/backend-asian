const path = require("path");
const fs = require("fs");
const Discount = require("../models/discountModel");

const createDiscount = async (req, res) => {
  // Destructuring the incoming body data (json)
  const { couponName, couponType } = req.body;

  // Validating the incoming data
  if (!couponName || !couponType) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  // Validating if there is a file
  if (!req.files || !req.files.couponImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the coupon",
    });
  }

  const { couponImage } = req.files;

  

  const imageName = `${Date.now()}-${couponImage.name}`;

  // 2. Make a upload path (/path/upload - directory)

  const imageUploadPath = path.join(
    __dirname,
    `../public/discounts/${imageName}`
  );

  
  try {
    await couponImage.mv(imageUploadPath);

    // 4. Save the data to the database
    const newDiscount = new Discount({
      couponName: couponName,
      couponType: couponType,
      couponImage: imageName,
    });

    const discount = await newDiscount.save();

    res.status(201).json({
      success: true,
      message: "Discount created successfully!",
      data: discount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const allDiscounts = await Discount.find({});
    res.status(200).json({
      success: true,
      message: "All discounts fetched successfully!",
      discounts: allDiscounts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

const getSingleDiscount = async (req, res) => {
  const discountId = req.params.id;

  try {
    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(400).json({
        success: false,
        message: "Discount not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Discount fetched successfully!",
      discount: discount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

const deleteDiscount = async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

const updateDiscount = async (req, res) => {
  try {
    // if there is an image in the request
    if (req.files && req.files.couponImage) {
      const { couponImage } = req.files;

      const imageName = `${Date.now()}-${couponImage.name}`;

      const imageUploadPath = path.join(
        __dirname,
        `../public/discounts/${imageName}`
      );

      await couponImage.mv(imageUploadPath);

      req.body.couponImage = imageName;

      if (req.body.couponImage) {
        const existingDiscount = await Discount.findById(req.params.id);

        const oldImagePath = path.join(
          __dirname,
          `../public/discounts/${existingDiscount.couponImage}`
        );

        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedDiscount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Discount updated successfully!",
      data: updatedDiscount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getSingleDiscount,
  deleteDiscount,
  updateDiscount,
};
