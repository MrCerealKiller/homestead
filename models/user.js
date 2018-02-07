/**
 * @file Model for Users as stored on the database
 * @author Jeremy Mallette
 * @version 0.0.1
 * @module Models/User
 *
 * @requires module:Mongoose
 * @requires module:BCrypt
 * @requires module:Config/Database
 */

// Imports ---------------------------------------------------------------------
const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const db_config = require('../config/database.js');

// Create Model ----------------------------------------------------------------
/**
 * @inner
 * @description User Schema used to interact with MongoDb
 * @const
 * @default
 * @type {object}
 */
const userSchema = mongoose.Schema({
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
    sms: {
        type: Number,
        required: false
    }
});

/**
 * @inner
 * @description Exports the above schema
 */
const User = module.exports = mongoose.model('User', userSchema);

// Getters for User ------------------------------------------------------------
/**
 * @inner
 * @description Retrieves a single user by it's generated MongoDb ID and
 * places it within an object in the callback
 * @param {String} [id] The unique generated id used by MongoDb of the required
 * user
 * @param {function} [callback] A callback function to which MongoDb sends the
 * user info
 */
 module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

/**
 * @inner
 * @description Retrieves a single user by it's unique username and
 * places it within an object in the callback
 * @param {String} [username] The unique username of the required user
 * @param {function} [callback] A callback function to which MongoDb sends the
 * user info
 */
module.exports.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
};

/**
 * @inner
 * @description Retrieves a single user by it's unique email and
 * places it within an object in the callback
 * @param {String} [email] The unique email of the required user
 * @param {function} [callback] A callback function to which MongoDb sends the
 * user info
 */
module.exports.getUserByEmail = function(email, callback) {
    var query = {email: email};
    User.findOne(query, callback);
};

// Add User --------------------------------------------------------------------
/**
 * @inner
 * @description Adds a user to the database. During this function the given
 * password is hashed and saved in its encrypted form.
 * @param {Object} [user] An object that corresponds to the user schema
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
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
/**
 * @inner
 * @description Checks the encrypted password
 * @param {String} [attempt] The raw password attempt
 * @param {*} [hash] The hash function that is used to encrypt the password
 * @param {function} [callback] A callback function that includes 'isMatch',
 * which indicates true if it's a match and false otherwise
 */
module.exports.comparePassword = function(attempt, hash, callback) {
    bcrypt.compare(attempt, hash, function(err, isMatch) {
        if (err) {
            throw err;
        }

        callback(null, isMatch);
    });
};

// Update User Info ------------------------------------------------------------
/**
 * @inner
 * @description Finds the corresponding user by the MongoDb Id and updates
 * any changed fields except for the password
 * @param {Object} [user] A user object corresponding to one that already
 * exists (i.e. the unique Id can be found on the database)
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
module.exports.updateUserById = function(user, callback) {
  User.findById(user._id, function(err, dbUser) {
    if (err) {
      throw err;
    }

    dbUser.email = user.email;
    dbUser.sms = user.sms;
    dbUser.save(callback);
  });
};

// Update Password -------------------------------------------------------------
/**
 * @inner
 * @description Finds the corresponding user by the MongoDb Id and update the
 * password which is hashed and saved in its encrypted form
 * @param {Object} [user] A user object corresponding to one that already
 * exists (i.e. the unique Id can be found on the database) with a new password
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
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
/**
 * @inner
 * @description Finds the corresponding user by the MongoDb Id and removes
 * it from the database
 * @param {String} [id] The unique generated MongoDb Id of the user to be
 * removed
 * @param {function} [callback] A callback function that indicates success or
 * failure
 */
module.exports.removeUserById = function(id, callback) {
  User.findById(id, function(err, user) {
    if (err) {
      throw err;
    }

    user.remove(callback);
  });
};
