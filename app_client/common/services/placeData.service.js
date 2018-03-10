(function() {

    angular
        .module('placeApp')
        .service('placeData', placeData);

    placeData.$inject = ['$http', 'authentication'];
    function placeData($http, authentication) {
        let locationByCoords = function(lat, lng) {
            return $http.get('/api/locations?lng='+lng+'&lat='+lat);
        };
        let locationById = function(locationid) {
            return $http.get('/api/locations/'+locationid);
        };
        let addReviewById = function(locationid, data) {
            console.log("addRew");
            return $http.post('/api/locations/' + locationid + '/reviews', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };
        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }

})();