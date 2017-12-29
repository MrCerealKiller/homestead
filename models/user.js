/*
 * H0M3ST3AD User Model
 * Author: Jeremy Mallette
 * Date Last Updated: 27/12/2017
 */

// Imports ---------------------------------------------------------------------
const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const db_config = require('../config/database.js');

// Create Model ----------------------------------------------------------------
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    sms_number: {
        type: Number,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Getters for User ------------------------------------------------------------
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

// Add User --------------------------------------------------------------------
module.exports.addUser = function(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                throw err;
            }

            user.password = hash; // Replaces text password with encrypted one
            user.save(callback); // Saves the user
        });
    });
};

// Check Password --------------------------------------------------------------
module.exports.comparePassword = function(attempt, hash, callback) {
    bcrypt.compare(attempt, hash, function(err, isMatch) {
        if (err) {
            throw err;
        }

        callback(null, isMatch);
    });
};
