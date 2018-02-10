/**
 * @file Model for Devices as stored on the database
 * @author Jeremy Mallette
 * @version 0.1.1
 * @module App/Server
 *
 * @requires module:Express
 * @requires module:Path
 * @requires module:BodyParser
 * @requires module:CookieParser
 * @requires module:Passport
 * @requires module:Mongoose
 * @requires module:Cors
 * @requires module:Morgan
 * @requires module:Config/Database
 * @requires module:Credentials
 * @requires module:Routes/Open
 * @requires module:Routes/Users
 */

// ######################################
// ## CONSTANTS, IMPORTS, DEPENDENCIES ##
// ######################################

// Constants -------------------------------------------------------------------
/**
 * @inner
 * @description The port on which the backend is served during development
 * @const
 * @default
 * @type {number}
 */
const _PORT = 3000;
/**
 * @inner
 * @description The port on which the backend is served during production
 * @const
 * @default
 * @type {number}
 */
const _PORT_PRODUCTION = 80

// Imports ---------------------------------------------------------------------
const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const passport     = require('passport');
const mongoose     = require('mongoose');
const cors         = require('cors');
const logger       = require('morgan');

// Local Dependencies ----------------------------------------------------------
const db_config   = require('./config/database.js');
const index       = require('./routes/index.js');
const users       = require('./routes/users.js');

// Paths -----------------------------------------------------------------------
var staticPath = path.join(__dirname, 'public');

// Initialize App --------------------------------------------------------------
const app = express();

// ##############
// ## DATABASE ##
// ##############

// Initialize Mongoose ---------------------------------------------------------
mongoose.connect(db_config.database, db_config.opts);

mongoose.connection.on('connected', function() {
    console.log('Sucessfully connected to Homestead database\n\n');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose error connecting to homestead database: ' + err);
});

// ################
// ## MIDDLEWARE ##
// ################

// Security --------------------------------------------------------------------
app.disable('x-powered-by');
app.use(cors());

// Configs ---------------------------------------------------------------------
// Configs
app.use(logger('dev'));
app.use(express.static(staticPath));

// Parsers
app.use(bodyParser.json());

// Authentification
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

// #####################
// ## PORT AND ROUTES ##
// #####################

// Set Port --------------------------------------------------------------------
app.set('port', process.env.PORT || _PORT);

// Routes ----------------------------------------------------------------------
app.use('/', index);
app.use('/users', users);

// Fallback to index.html ------------------------------------------------------
// app.use(function(req, res) {
//     res.sendFile(staticPath + '/index.html');
// });

// Listen to Port --------------------------------------------------------------
app.listen(app.get('port'), function() {
    console.log('Server started on http://localhost:' + app.get('port'));
});

/**
 * @inner
 * @description Exports the Express App
 */
module.exports = app;
