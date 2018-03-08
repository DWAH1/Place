(function() {

    angular
        .module('placeApp')
        .service('placeData', loc8rData);

    function loc8rData($http) {
        var locationByCoords = function(lat, lng) {
            return $http.get('/api/locations?lng='+lng+'&lat='+lat);
        };
        var locationById = function(locationid) {
            return $http.get('/api/locations/'+locationid);
        };
        var addReviewById = function(locationid, data) {
            return $http.post('/api/locations/' + locationid + '/reviews', data);
        };
        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById
        };
    }

})();