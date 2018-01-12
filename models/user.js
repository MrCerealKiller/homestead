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

module.exports.getUserByEmail = function(email, callback) {
    var query = {email: email};
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

// Update User Info ------------------------------------------------------------
module.exports.updateUserById = function(user, callback) {
  User.findById(user._id, function(err, dbUser) {
    if (err) {
      throw err;
    }

    dbUser.sms_number = user.sms_number;
    dbUser.save(callback);
  });
};

// Update Password -------------------------------------------------------------
module.exports.updateUserPasswordById = function(user, callback) {
  User.findById(user._id, function(err, dbUser) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                throw err;
            }

            dbUser.password = hash; // Replaces text password with encrypted one
            dbUser.save(callback); // Saves the user
        });
    });
  });
};

// Remove User -----------------------------------------------------------------
module.exports.removeUserById = function(id, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      throw err;
    }

    user.remove(callback);
  });
};
