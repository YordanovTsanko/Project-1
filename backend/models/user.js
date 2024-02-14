const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Моля въведете име"],
    maxLength: [30, "Името не трябва да съдържа повече от 30 символа"],
  },
  lastName: {
    type: String,
    required: [true, "Моля въведете име"],
    maxLength: [30, "Името не трябва да съдържа повече от 30 символа"],
  },
  email: {
    type: String,
    required: [true, "Моля въведете емайл"],
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Моля въведете номер"],
    maxLength: [30, "Името не трябва да съдържа повече от 30 символа"],
  },
  password: {
    type: String,
    required: [true, "Моля въведете парола"],
    minLength: [6, "Паролата трябва да е поне 6 цифри"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cartItems: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductTest",
      },
    },
  ],
});

userSchema.path("cartItems").default([]);


module.exports = mongoose.model("UserTest", userSchema);
