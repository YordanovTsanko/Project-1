const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/user");
const auth = require("./routes/auth");
const products = require("./routes/products");
const orders = require("./routes/orders");
const reviews = require("./routes/reviews");

// Setting up .env file
dotenv.config({ path: ".env" });
//Setting up CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://project-1-henna-tau.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 204, // No Content status for preflight requests
  })
);

app.use(express.static("public"));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// Passport configuration
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if passwords match
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
app.use("/api/v1", auth);
app.use("/api/v1", products);
app.use("/api/v1", orders);
app.use("/api/v1", reviews);

//Middleware errors
app.use(errorMiddleware);

module.exports = app;
