const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectDatabase;
