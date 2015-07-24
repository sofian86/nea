app.directive('people', function () {

    return {
        restrict: 'E',
        scope: {},
        controller: 'PeopleController',
        templateUrl: 'js/common/directives/people/people.html'
        
//make factory call/ajax call to get facebook users photos and info to fill screen with
	}

});