(function() {

    angular.module('placeApp', ['ngRoute']);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    }

    angular
        .module('placeApp')
        .config(['$routeProvider', config]);

})();