app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('people', {
        url: '/people',
        controller: 'PeopleController',
        templateUrl: 'js/about/about.html'
    });
});

app.controller('PeopleController', function ($scope, ProfileFactory) {

    ProfileFactory.getUserInfo().then(function(res){
    	$scope.names = res.displayName;
    	$scope.photos = res.photos;

    })
    

});