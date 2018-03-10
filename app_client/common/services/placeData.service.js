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
            return $http.post('/api/locations/' + locationid + '/reviews', data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };
        let deleteReviewById = function (locationid, reviewId) {
            return $http.delete('/api/locations/' + locationid + '/reviews/' + reviewId, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };
        let updateReviewById = function (locationid, reviewId, data) {
            return $http.put('/api/locations/' + locationid + '/reviews/' + reviewId, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };
        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById: addReviewById,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById
        };
    }

})();