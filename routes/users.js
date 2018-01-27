/**
 * @file User-specific, secured backend routes
 * @author Jeremy Mallette
 * @version 0.0.2
 * @module Routes/User
 * @see {@link module:Routes/Open} for unprotected routes.
 */

// Global Constants ------------------------------------------------------------
/**
 * @inner
 * @description Options for when any authentification check fails
 * @const
 * @default
 * @type {JSON}
 */
const secOpts = {
  session: false,
  failureRedirect: '/login'
}

// Imports ---------------------------------------------------------------------
const express  = require('express');
const router   = express.Router();
const passport = require('passport');
const jwt      = require('jsonwebtoken');

// Local Dependencies ----------------------------------------------------------
const db_config = require('../config/database.js');
const User      = require('../models/user.js');
const Device    = require('../models/device.js');

// Get Users Devices -----------------------------------------------------------
/**
 * @inner
 * @description Devices Routes (Supports GET, POST)
 */
router.route('/devices', passport.authenticate('jwt', secOpts))
  .get(function(req, res, next) {
    getDevices(req,res);
  })
  .post(function(req, res, next) {
    addDevice(req, res);
  });

// User Dashboard --------------------------------------------------------------
router.route('/dashboard', passport.authenticate('jwt', secOpts))
  .get(function(req, res, next) {});

// User Profile ----------------------------------------------------------------
router.route('/profile', passport.authenticate('jwt', secOpts))
  .get(function(req, res, next) {});

// User Settings ---------------------------------------------------------------
router.route('/settings', passport.authenticate('jwt', secOpts))
  .get(function(req, res, next) {});

/**
 * @inner
 * @description Exports all defined routes in this file
 */
module.exports = router;

// Member Functions ------------------------------------------------------------

/**
 * @inner
 * @description GET to /devices - Retrieves a user's devices
 * @param {JSON} [req] Must contain the user's username
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function addDevice(req, res) {
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
}

/**
 * @inner
 * @description POST to /devices - Adds a device to a user's devices
 * @param {JSON} [req] Must contain the user's username
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function getDevices(req, res) {
  var username = req.headers.username;

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
}
