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
    required: [true, "Please enter an email"],
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter a phone number"],
    maxLength: [15, "Phone number must be less than 15 numbers"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Password must be at least 6 characters"],
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
