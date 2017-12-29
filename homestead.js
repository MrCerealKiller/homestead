/*
 * H0M3ST3AD Project NodeJS Engine
 * Author: Jeremy Mallette
 * Date Last Updated: 27/12/2017
 *
 * Note: Angular Implementation**
 */

// Constants -------------------------------------------------------------------
const port = 3000; // TODO: Change this on release

// Imports ---------------------------------------------------------------------
const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const passport     = require('passport');
const mongoose     = require('mongoose');
const cors         = require('cors');
const favicon      = require('serve-favicon');
const logger       = require('morgan');

// Local Dependencies ----------------------------------------------------------
const db_config   = require('./config/database.js');
const credentials = require('./config/credentials.js');
const routes      = require('./routes/index.js');
const users       = require('./routes/users.js');

// Paths -----------------------------------------------------------------------
var staticPath = path.join(__dirname, 'public');
var iconPath   = path.join(__dirname, 'public', 'res', 'img', 'favicon.ico');

// Initialize App --------------------------------------------------------------
const app = express();

// Initialize Mongoose ---------------------------------------------------------
mongoose.connect(db_config.database);

mongoose.connection.on('connected', function() {
    console.log('Mongoose sucessfully connected to homestead database');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose error connecting to homestead database: ' + err);
});

// Security --------------------------------------------------------------------
app.disable('x-powered-by');
app.use(cors());

// Configs and Middleware ------------------------------------------------------
// Configs
app.use(logger('dev'));
app.use(express.static(staticPath));
app.use(favicon(iconPath));

// Parsers
app.use(bodyParser.json());
app.use(cookieParser(credentials.cookie));

// Authentification
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

// Set Port --------------------------------------------------------------------
app.set('port', process.env.PORT || port);

// Routes ----------------------------------------------------------------------
app.use('/', routes);
app.use('/users', users);

// Error Handlers --------------------------------------------------------------
app.use(function(req, res) {
    var err = new Error('Not Found');
    res.status(404);
    res.type('text/html');
    res.render('404');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(error.stack);
    res.type('text/html');
    res.render('500');
});

// Listen to Port --------------------------------------------------------------
app.listen(app.get('port'), function() {
    console.log('Server started on http://localhost:' + app.get('port'));
});

module.exports = app;
