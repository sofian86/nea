'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var _ = require('lodash');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ['id', 'displayName', 'photos']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
       var photos = _.pluck(profile.photos, 'value'), userInfoTheSame;
        UserModel.findOne({ 'facebook.id': profile.id }).exec()
            .then(function (user) {
                userInfoTheSame =_.every(user, {id: profile.id, displayName: profile.displayName, photos: photos});

                console.log('inside the callback verifyty', user)
                if(user && userInfoTheSame){
                    return user;
                }
                else if (!user) {
                    return UserModel.create({
                        facebook: {
                            id: profile.id,
                            displayName: profile.displayName,
                            photos: photos
                        }
                    }); 
                } else {
                    user.facebook.id = profile.id;
                    user.facebook.displayName = profile.displayName;
                    user.facebook.photos = photos;
                    return user.save(done);
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['public_profile, email, user_photos']}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
