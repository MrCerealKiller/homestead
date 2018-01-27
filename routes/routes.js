/**
 * @file Non-user-specific, unsecured backend routes.
 * @author Jeremy Mallette
 * @version 0.0.2
 * @module Routes/Open
 * @see {@link module:Routes/User} for protected routes
 *
 * @requires module:Express
 * @requires module:Passport
 * @requires module:JsonWebToken
 * @requires module:Config/Database
 * @requires module:Models/User
 * @requires module:Models/Device
 */

// Global Constants ------------------------------------------------------------
/**
 * @inner
 * @description Default expiry stamp on JSON Web Token in ms
 * @const
 * @default
 * @type {number}
 */
const TOKEN_EXPIRY_SEC = 259200 // 3 days
/**
 * @inner
 * @description "Remember Me" expiry stamp on JSON Web Token in ms
 * @const
 * @default
 * @type {number}
 */
const REMEMBER_ME_TOKEN_EXPIRY_SEC = 1814400 // 3 weeks

// Imports ---------------------------------------------------------------------
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');

// Local Dependencies ----------------------------------------------------------
const db_config = require('../config/database.js');
const User      = require('../models/user.js');
const Device    = require('../models/device.js');

// Register --------------------------------------------------------------------
/**
 * @inner
 * @description Register Routes (Supports POST)
 */
router.route('/register')
  .post(function(req, res, next) {
    registerUser(req, res);
  });

// Authenticate ----------------------------------------------------------------
/**
 * @inner
 * @description Authenticate Routes (Supports POST)
 */
router.route('/auth')
  .post(function(req, res, next) {
    authenticateUser(req, res);
  });

/**
 * @inner
 * @description Exports all defined routes in this file
 */
module.exports = router;

// Member Functions ------------------------------------------------------------

/**
 * @inner
 * @description POST to /register - Registers a user
 * @param {JSON} [req] Must contain a user object with all user data
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function registerUser(req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    sms_number: req.body.sms_number
  });

  // Check is Username is already taken
  User.getUserByUsername(newUser.username, function(err, user) {
    if (err) {
      throw err;
    }

    if (user) {
      res.json({
        success: false,
        msg: 'This username has already been taken.'
      });
    } else {
      // Check is email is already in use
      User.getUserByEmail(newUser.email, function(err, user) {
        if (err) {
          throw err;
        }

        if (user) {
          res.json({
            success: false,
            msg: 'This email address is already in use.'
          });
        } else {
          // If all data is not in use, proceed to addUser
          User.addUser(newUser, function(err, user) {
            if (err) {
              res.json({
                success: false,
                msg: 'Could not register user. Error: ' + err
              });
            } else {
              res.json({
                success: true,
                msg: user.username + ' was registered.'
              });
            }
          });
        }
      });
    }
  });
}

/**
 * @inner
 * @description POST to /auth - Validates the password and provides a JWT
 * @param {JSON} [req] Must contain a username and password attempt in the body
 * @param {JSON} [res] Contains the result {success : boolean, msg: String,
 * token : String(JWT), user: JSON(user data)}
 */
function authenticateUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.getUserByUsername(username, function(err, user) {
    if (err) {
      throw err;
    }

    if (!user) {
      return res.json({
        success: false,
        msg: username + ' not found.'
      });
    } else {
      User.comparePassword(password, user.password, function(err, success) {
        if (err) {
          throw err;
        }

        if (success) {
          const token = jwt.sign(user.toJSON(), db_config.key, {
            expiresIn: TOKEN_EXPIRY_SEC
          });

          return res.json({
            success: true,
            token: 'Bearer ' + token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          });
        } else {
          return res.json({
            success: false,
            msg: 'Incorrect Password'
          });
        }
      });
    }
  });
}
