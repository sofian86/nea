app.factory('ProfileFactory', function ($http) {
    var profile = {};

    profile.getUserInfo = function() {
        return $http.get('/api/user').then(function(res) {
            return res.data;
        }).catch(function (err) {
                throw new Error(err.message);
        });
    }

    return profile;
}); 
