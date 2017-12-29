/*
 * H0M3ST3AD AuthO Strategy
 * Author: Jeremy Mallette
 * Date Last Updated: 27/12/2017
 */

// Imports ---------------------------------------------------------------------
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;

// Local Dependencies ----------------------------------------------------------
const User      = require('../models/user.js');
const db_config = require('../config/database.js');

// Retrieve Token --------------------------------------------------------------
module.exports = function(passport) {
    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = db_config.key;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.getUserById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            } else if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};
