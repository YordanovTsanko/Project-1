const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log({...err})
    // Log the full error object
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    res.status(error.statusCode).json({
      success: false,
      errMessage: error.message || "Internal Server Error",
    });
  }
};
