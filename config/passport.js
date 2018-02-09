/**
 * @file Authentification Strategy using Passport with a JWT implementation
 * @author Jeremy Mallette
 * @version 1.0.0
 * @module Config/Passport
 *
 * @requires module:Passport-JWT
 * @requires module:Models/User
 * @requires module:Config/Database
 */

// Imports ---------------------------------------------------------------------
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;

// Local Dependencies ----------------------------------------------------------
const User      = require('../models/user.js');
const db_config = require('../config/database.js');

// Retrieve Token --------------------------------------------------------------
/**
 * @name Strategy
 * @memberof module:Config/Passport
 * @description Exports the JWT Strategy implementation for Passport
 */
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
