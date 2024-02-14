const User = require(".././models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    ) {
      return next(
        new ErrorHandler(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one symbol.",
          400
        )
      );
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // Validate the new user document
    await newUser.validate();

    // Save the document
    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      user: savedUser,
      message: "You have been registered successfully. Please log in...",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login a user => /api/v1/login
exports.loginUser = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        reject(err);
        return;
      }

      if (info && info.message.length > 0) {
        reject(info);
        return;
      }

      req.logIn(user, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      });
    })(req, res, next);
  })
    .then((user) => {
      res.status(200).json({
        success: true,
        user,
      });
    })
    .catch((error) => {
      res.status(401).json({
        success: false,
        errMessage: error.message || "Login failed",
      });
    });
};
// Logout user => /api/v1/logout
exports.logoutUser = catchAsyncErrors((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(new ErrorHandler(err, 500));
    }
    res.status(200).json({ success: true, message: "Logout successful" });
  });
});
// Check if user is logged in => /api/v1/isloggedin
exports.isLoggedIn = catchAsyncErrors((req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: true, user: req.user });
  } else {
    return res.status(401).json({ success: false, user: null });
  }
});
// Edit user => /api/v1/user/edit/:id
exports.editUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  //firstName, lastName,phoneNumber, password
  const updatedUserData = req.body;
  updatedUserData.phoneNumber &&
    (updatedUserData.phoneNumber = Number(updatedUserData.phoneNumber));

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (updatedUserData.password) {
      if (
        updatedUserData.newPassword === "" &&
        updatedUserData.confirmPassword === ""
      ) {
        return next(
          new ErrorHandler("Please write new password and confirm it", 400)
        );
      }
      if (updatedUserData.newPassword !== updatedUserData.confirmPassword) {
        return next(
          new ErrorHandler(
            "New password and confirm password do not match",
            400
          )
        );
      }

      const isPasswordMatch = await bcrypt.compare(
        updatedUserData.password,
        user.password
      );

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Current password is incorrect", 400));
      }

      const hashedPassword = await bcrypt.hash(updatedUserData.newPassword, 10);
      updatedUserData.password = hashedPassword;
    }
    if (updatedUserData.email) {
      const existingUser = await User.findOne({ email: updatedUserData.email });
      if (existingUser) {
        if (existingUser.email !== user.email) {
          return next(new ErrorHandler("Email already exists", 400));
        }
      }
    }

    const response = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Profile was updated" });
  } catch (error) {
    // Handling Mongoose Validation Errors
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return next(new ErrorHandler(message, 400));
    }

    return next(
      new ErrorHandler(error._message || "Internal Server Error", 500)
    );
  }
});
