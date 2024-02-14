const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Моля въведете име"],
    maxLength: [30, "Името не трябва да съдържа повече от 30 символа"],
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
  stock: {
    type: Number,
    default: 1,
    required: [true, "Моля изберете бройка на продукта"],
  },
});

module.exports = mongoose.model("ProductTest", productSchema);
