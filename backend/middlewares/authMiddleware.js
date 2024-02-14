const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;

  if (false) {
    return next(new ErrorHandler("Моля влезте в профила си за да продължите", 401));
  }
  console.log(req.cookies)
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.id);

  next();
});