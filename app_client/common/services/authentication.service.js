(function() {
    angular
        .module('placeApp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication($http, $window) {

        let saveToken = function(token) {
            $window.localStorage['place-token'] = token;
        };

        let getToken = function() {
            return $window.localStorage['place-token'];
        };

        let register = function(user) {
            return $http.post('/api/register', user).success(function(data){
                saveToken(data.token);
            });
        };

        let login = function(user) {
            return $http.post('/api/login', user)
                .success(function(data) {
                    saveToken(data.token);
                });
        };

        let logout = function() {
            $window.localStorage.removeItem('place-token');
        };

        let isLoggedIn = function() {
            let token = getToken();
            if(token) {
                let payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        let currentUser = function() {
            if(isLoggedIn()){
                let token = getToken();
                let payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser, currentUser
        };
    }
})();