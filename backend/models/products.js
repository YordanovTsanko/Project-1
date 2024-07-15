const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    maxLength: [100, "Name must be less then 100 characters"],
  },
  img: {
    type: String,
    required: [true, "Please past image url "],
  },
  price: {
    type: Number,
    required: [true, "Please select product price"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, "Please select an category"],
    enum: {
      values: [
        "shoe",
        "woman cloths",
        "man cloths",
        "electronics",
        "jewelry",
        "gym accessories",
      ],
      message: "Please select an exist category",
    },
  },
  description: {
    type: String,
    required: [true, "Please enter a product description"],
    minLength: [200, "Description must be more then 200 characters"],
    maxLength: [2000, "Desctiption must be less then 2000 characters"],
  },
  stock: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("ProductTest", productSchema);
