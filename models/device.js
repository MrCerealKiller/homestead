/*
 * H0M3ST3AD Device Model
 * Author: Jeremy Mallette
 * Date Last Updated: 11/01/2018
 */

// Imports ---------------------------------------------------------------------
const mongoose  = require('mongoose');
const db_config = require('../config/database.js');

// Create Model ----------------------------------------------------------------
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

const Device = module.exports = mongoose.model('Device', DeviceSchema);

// Getters for Device ----------------------------------------------------------
module.exports.getDeviceById = function(id, callback) {
  Device.findById(id, callback);
};

module.exports.getDeviceByCustomId = function(customId, callback) {
  var query = {customId: customId};
  Device.findOne(query, callback);
};

module.exports.getDeviceByIpAddress = function(ipAddress, callback) {
  var query = {lastIpAddress: ipAddress};
  Device.findOne(query, callback);
};

module.exports.getUserDevices = function(username, callback) {
  var query = {user: username};
  Device.find(query, callback);
}

// Add Device ------------------------------------------------------------------
module.exports.addDevice = function(device, callback) {
  device.save(callback);
};

// Update Device ---------------------------------------------------------------
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
module.exports.removeDeviceById = function(id, callback) {
  Device.findById(id, function(err, device) {
    if (err) {
      throw err;
    }

    device.remove(callback);
  });
};
