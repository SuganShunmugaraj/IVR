const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Customer = require("../app/models/customer.model.js");
const User = require("./../app/models/user.model.js");

passport.use("userLocal", new LocalStrategy({
        usernameField: "email"
    },
    function(username, password, done) {
        Customer.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Password is wrong"
                });
            }
            return done(null, user);
        });
    }
));

passport.use("local", new LocalStrategy({
        usernameField: "email"
    },
    function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: "User not found"
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: "Password is wrong"
                });
            }
            return done(null, user);
        });
    }
));