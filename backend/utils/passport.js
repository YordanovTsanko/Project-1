const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((email, password, done) => {
      // Find the user by email
      User.findOne({ email: email }, async (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        try {
          const passwordMatch = await bcrypt.compare(password, user.password);

          // Check if passwords match
          if (!passwordMatch) {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      });
    })
  );
  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    await User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
