const Item = require("../models/itemModel");

// Search items
exports.searchItems = async (req, res) => {
  try {
    const query = req.query.query;
    const items = await Item.find({ name: { $regex: query, $options: "i" } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error searching items", error });
  }
};
