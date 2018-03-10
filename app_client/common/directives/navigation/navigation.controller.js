(function() {
    angular
        .module('placeApp')
        .controller('navigationCtrl', navigationCtrl);

    navigationCtrl.$inject = ['$location', 'authentication'];
    function navigationCtrl($location, authentication) {
        let navvm = this;
        navvm.currentPath = $location.path();
        navvm.isLoggedIn = authentication.isLoggedIn();
        navvm.isAdmin = authentication.isAdmin();
        navvm.currentUser = authentication.currentUser();
        navvm.logout = function() {
            authentication.logout();
            $location.path('/');
            navvm.isLoggedIn = false;
        };
    }
})();