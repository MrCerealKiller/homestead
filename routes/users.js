/*
 * H0M3ST3AD Project Protected Routes
 * Author: Jeremy Mallette
 * Date Last Updated: 11/01/2018
 */

// Global Constants ------------------------------------------------------------
const tokenExpiresInSecs = 259200 // 3 days
const rememberMeTokenExpiresInSecs = 1814400 // 3 weeks

// Imports ---------------------------------------------------------------------
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');

// Local Dependencies ----------------------------------------------------------
const db_config = require('../config/database.js');
const User      = require('../models/user.js');
const Device    = require('../models/device.js');

// Register (Post) -------------------------------------------------------------
router.post('/register', function(req, res, next) {
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
});

// Authenticate (Post) ---------------------------------------------------------
router.post('/auth', function(req, res, next) {
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
                        expiresIn: tokenExpiresInSecs
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
});

// Get Users Devices -----------------------------------------------------------
router.post('/devices/list', function(req, res, next) {

  console.error('\n\n\nGETS HERE\n\n\n' + username)

  var username = req.body.username;

  Device.getUserDevices(username, function(err, devices) {
    if (err) {
      res.json({
        success: false,
        msg: ('Could not retrieve devices. Error' + err),
        devices: undefined
      });
    } else {
      res.json({
        success: true,
        msg: 'Retrieved user\s devices',
        devices: devices
      });
    }
  });
});

// Add Device ------------------------------------------------------------------
router.post('/devices/add', function(req, res, next) {
  var newDevice = new Device({
      customId: req.body.customId,
      user: req.body.user,
      deviceService: req.body.deviceService,
      lastIpAddress: req.body.lastIpAddress,
      lastStatusUpdate: req.body.lastStatusUpdate,
      //dateLastUpdated: Date()
  });

  Device.addDevice(newDevice, function(err, device) {
      if (err) {
          res.json({
              success: false,
              msg: 'Could not save device. Error: ' + err
          });
      } else {
          res.json({
              success: true,
              msg: device.customId + ' was saved.'
          });
      }
  });
});
// User Dashboard (Get) --------------------------------------------------------
router.get('/dashboard', function(req, res, next) {

});

// User Profile (Get) ----------------------------------------------------------
router.get('/profile',
            passport.authenticate('jwt',
            {
                session: false,
                failureRedirect: '/settings'
            }),
            function(req, res, next) {
    //res.json({user: req.user});
    res.render('accounts', {title:'H0M3ST3AD - User'});
});

// User Settings (Get) ---------------------------------------------------------
router.get('/settings', function(req, res, next) {

});

module.exports = router;
