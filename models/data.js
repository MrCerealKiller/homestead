/**
 * @file Model for Devices as stored on the database
 * @author Jeremy Mallette
 * @version 1.0.0
 * @module Models/Data
 *
 * @requires module:Mongoose
 * @requires module:Config/Database
 */

// Imports ---------------------------------------------------------------------
const mongoose  = require('mongoose');
const db_config = require('../config/database.js');

// Create Models ---------------------------------------------------------------

/**
 * @inner
 * @description Exports the Data Schema
 * @const
 * @default
 * @type {object}
 */
const dataSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  current: {
    datum: String,
    default: '',
    trim: true,
    required: true,
  },
  instances: [{
    datum: String,
    timestamp: Date
  }],
}, {timestamps: true});

module.exports = dataSchema;
