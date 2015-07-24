'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', function (req, res) {
	var userInfo = {};
	mongoose.model('User')
	.find({})
	.exec()
	.then(function(users){
		
		userInfo.displayName = _.pluck(users, 'facebook.displayName');
		userInfo.photos = _.flatten(_.pluck(users, 'facebook.photos'));

		console.log('whats up', _.flatten(_.pluck(users, 'facebook.photos')))

		res.send(userInfo);

	})
    

});