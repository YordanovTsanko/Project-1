const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require('./database')

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});
// Setting up .env file
dotenv.config({ path: ".env" });


//Connecting to databse
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle Unhandled Promise rej
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
