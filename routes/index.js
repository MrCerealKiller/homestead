/*
 * H0M3ST3AD Project Open Routes
 * Author: Jeremy Mallette
 * Date Last Updated: 27/12/2017
 */

// Imports ---------------------------------------------------------------------
var express = require('express');
var router  = express.Router();

// Root ------------------------------------------------------------------------
router.get('/', function(req, res, next) {
    // TODO: Add conditional for login status
    res.render('homepage', {title:'H0M3ST3AD'});
});

router.get('/settings', function(req, res, next) {
    res.render("settings", {title:'H0M3ST3AD - Settings'});
});

router.get('/account', function(req, res, next) {
    res.render('accounts', {title:'H0M3ST3AD - User'});
});

module.exports = router;
