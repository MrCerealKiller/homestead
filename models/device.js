/**
 * @file Model for Devices as stored on the database
 * @author Jeremy Mallette
 * @version 0.0.1
 * @module Models/Device
 *
 * @requires module:Mongoose
 * @requires module:Config/Database
 */

// Imports ---------------------------------------------------------------------
const mongoose  = require('mongoose');
const db_config = require('../config/database.js');

// Create Model ----------------------------------------------------------------
/**
 * @inner
 * @description Device Schema used to interact with MongoDb
 * @const
 * @default
 * @type {object}
 */
const DeviceSchema = mongoose.Schema({
  customId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  deviceService: {
    type: String,
    required: true
  },
  lastIpAddress: {
    type: String,
    required: true
  },
  lastStatusUpdate: {
    type: String,
    required: false
  },
  // dateLastUpdated: {
  //   type: Date,
  //   required: false
  // }
});

/**
 * @inner
 * @description Exports the above schema
 */
const Device = module.exports = mongoose.model('Device', DeviceSchema);

// Getters for Device ----------------------------------------------------------
/**
 * @inner
 * @description Retrieves a single device by it's generated MongoDb ID and
 * places it within an object in the callback
 * @param {String} [id] The unique generated id used by MongoDb of the required
 * device
 * @param {function} [callback] A callback function to which MongoDb sends the
 * device info
 */
module.exports.getDeviceById = function(id, callback) {
  Device.findById(id, callback);
};

/**
 * @inner
 * @description Retrieves a single device by it's custom ID and places
 * it within an object in the callback
 * @param {String} [id] The user's custom id assigned to the required device
 * @param {function} [callback] A callback function to which MongoDb sends the
 * device info
 * @deprecated Not ready for use yet (Possibly not necessary)
 */
module.exports.getDeviceByCustomId = function(customId, callback) {
  var query = {customId: customId};
  Device.findOne(query, callback);
};

/**
 * @inner
 * @description Retrieves a sing device by it's generated MongoDb ID and places
 * it within an object in the callback
 * @param {String} [id] The unique generated id used by MongoDb of the required
 * device
 * @param {function} [callback] A callback function to which MongoDb sends the
 * device info
 * @deprecated Not ready for use yet (Possibly not necessary)
 */
module.exports.getDeviceByIpAddress = function(ipAddress, callback) {
  var query = {lastIpAddress: ipAddress};
  Device.findOne(query, callback);
};

/**
 * @inner
 * @description Retrieves all devices created / assigned to the user
 * @param {String} [username] The unique username of the user
 * @param {function} [callback] A callback function to which MongoDb sends the
 * device info of all the user's devices
 */
module.exports.getUserDevices = function(username, callback) {
  var query = {user: username};
  Device.find(query, callback);
}

// Add Device ------------------------------------------------------------------
/**
 * @inner
 * @description Adds a device to the database
 * @param {Object} [device] An object that corresponds to the device schema
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
module.exports.addDevice = function(device, callback) {
  device.save(callback);
};


// Update Device ---------------------------------------------------------------
/**
 * @inner
 * @description Finds the corresponding device by the MongoDb Id and updates
 * any changed fields
 * @param {Object} [device] A device object corresponding to one that already
 * exists (i.e. the unique Id can be found on the database)
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
 module.exports.updateDeviceById = function(device, callback) {
  Device.findById(device._id, function(err, dbDevice) {
    if (err) {
      throw err;
    }

    dbDevice.customId = device.customId;
    dbDevice.userId = device.userId;
    dbDevice.deviceService = device.deviceService;
    dbDevice.lastIpAddress = device.lastIpAddress;
    dbDevice.lastStatusUpdate = device.lastStatusUpdate;
    dbDevice.dateLastUpdated = device.dateLastUpdated;
    dbDevice.save(callback);
  });
};

// Remove Device ---------------------------------------------------------------
/**
 * @inner
 * @description Finds the corresponding device by the MongoDb Id and removes
 * it from the database
 * @param {String} [id] The unique generated MongoDb Id of the device to be
 * removed
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
module.exports.removeDeviceById = function(id, callback) {
  Device.findById(id, function(err, device) {
    if (err) {
      throw err;
    }

    device.remove(callback);
  });
};
