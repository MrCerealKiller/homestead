/**
 * @file User-specific, secured backend routes
 * @author Jeremy Mallette
 * @version 0.0.2
 * @module Routes/User
 * @see {@link module:Routes/Open} for unprotected routes
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
 * @description Options for when any authentification check fails
 * @const
 * @default
 * @type {JSON}
 */
const SECURITY_OPTS = {
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

// ############
// ## ROUTES ##
// ############

// Devices ---------------------------------------------------------------------
/**
 * @inner
 * @name /devices
 * @description Devices Routes (Supports GET, POST, PUT, DELETE)
 */
router.route('/devices', passport.authenticate('jwt', SECURITY_OPTS))
  .get(function(req, res, next) {
    getDevices(req,res);
  })
  .post(function(req, res, next) {
    addDevice(req, res);
  })
  .put(function(req, res, next) {
    updateDevice(req, res);
  })
  .delete(function(req, res, next) {
    deleteDevice(req, res);
  });

// User Profile ----------------------------------------------------------------
/**
 * @inner
 * @name /profile
 * @description Devices Routes (Supports GET, PUT, DELETE)
 */
router.route('/profile', passport.authenticate('jwt', SECURITY_OPTS))
  .get(function(req, res, next) {
    getFullProfile(req, res);
  })
  .put(function(req, res, next) {
    updateProfile(req, res);
  })
  .delete(function(req, res, next) {
    deleteProfile(req, res);
  });

// User Settings ---------------------------------------------------------------
router.route('/settings', passport.authenticate('jwt', SECURITY_OPTS))
  .get(function(req, res, next) {});

/**
 * @inner
 * @description Exports all defined routes in this file
 */
module.exports = router;

// ######################
// ## MEMBER FUNCTIONS ##
// ######################

// Device Functions ------------------------------------------------------------

/**
 * @inner
 * @description GET to /devices - Retrieves all a user's devices in detail
 * @param {JSON} [req] Must contain the user's username or contain the
 * device ID to retrieve a single device
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function getDevices(req, res) {
  var username = req.headers.username;
  var id = req.headers.id;

  if (id != null && id != undefined && id != "") {
    Device.getDeviceById(id, function(err, device) {
      if (err || device == null) {
        res.json({
          success: false,
          msg: ('Could not retrieve devices. Error: ' + err),
          device: undefined
        });
      } else {
        res.json({
          success: true,
          msg: 'Retrieved user\s devices',
          device: device
        });
      }
    });
  } else {
    Device.getUserDevices(username, function(err, devices) {
      if (err || devices == null) {
        res.json({
          success: false,
          msg: ('Could not retrieve devices. Error: ' + err),
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
}

/**
 * @inner
 * @description POST to /devices - Adds a device to the user
 * @param {JSON} [req] All required fields of the device schema
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
    if (err || device == null) {
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
 * @description PUT to /devices - Overwrites a pre-existing Device
 * @param {JSON} [req] All required fields of the device schema
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function updateDevice(req, res) {
  var update = new Device({
    _id: req.body._id,
    customId: req.body.customId,
    user: req.body.user,
    deviceService: req.body.deviceService,
    lastIpAddress: req.body.lastIpAddress,
    lastStatusUpdate: req.body.lastStatusUpdate,
    //dateLastUpdated: Date()
  });

  Device.updateDeviceById(update, function(err, device) {
    if (err || device == null) {
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
 * @description DELETE to /devices - Deletes a pre-existing Device
 * @param {JSON} [req] Must contain the MongoDb Id in the key:value
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function deleteDevice(req, res) {
  var id = req.headers.id;

  Device.removeDeviceById(id, function(err, device) {
    if (err || device == null) {
      res.json({
        success: false,
        msg: 'Could not delete device. Error: ' + err
      });
    } else {
      res.json({
        success: true,
        msg: device.customId + ' was deleted.'
      });
    }
  });
}

// User Functions --------------------------------------------------------------

/**
 * @inner
 * @description GET to /profile - Get a user's full profile
 * @param {JSON} [req] Must contain the user's username
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function getFullProfile(req, res) {
  var username = req.headers.username;

  User.getUserByUsername(username, function(err, user) {
    if (err || user == null) {
      res.json({
        success: false,
        msg: ('Could not retrieve profile. Error ' + err),
        profile: undefined
      });
    } else {
      res.json({
        success: true,
        msg: 'Retrieved user profile',
        profile: user
      });
    }
  });
}

/**
 * @inner
 * @description PUT to /profiles - Overwrites changeable elements of the user
 * profile
 * @param {JSON} [req] Requires _id:value, email:value, sms_number:value
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function updateProfile(req, res) {
  var update = {
    _id: req.body._id,
    email: req.body.email,
    isEmailUpdate: req.body.isEmailUpdate,
    sms_number: req.body.sms_number
  };

  // Check is email is already in use
  User.getUserByEmail(update.email, function(err, user) {
    if (err) {
      throw err;
    }

    if (user && (update.isEmailUpdate == true)) {
      res.json({
        success: false,
        msg: 'This email address is already in use.'
      });
    } else {
      User.updateUserById(update, function(err, user) {
        if (err || user == null) {
          res.json({
            success: false,
            msg: 'Could not save profile. Error: ' + err
          });
        } else {
          res.json({
            success: true,
            msg: user.username + ' was saved.'
          });
        }
      });
    }
  });
}

/**
 * @inner
 * @description DELETE to /profile - Deletes a pre-existing User
 * @param {JSON} [req] Must contain the MongoDb Id in the _id:value
 * @param {JSON} [res] Contains the result {success : boolean, msg: String}
 */
function deleteProfile(req, res) {
  var id = req.headers.id;

  User.removeUserById(id, function(err, user) {
    if (err || user == null) {
      res.json({
        success: false,
        msg: 'Could not delete user. Error: ' + err
      });
    } else {
      res.json({
        success: true,
        msg: user.username + ' was deleted.'
      });
    }
  });
}
