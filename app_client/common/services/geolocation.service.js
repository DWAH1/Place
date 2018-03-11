(function() {

    angular
        .module('placeApp')
        .service('geolocation', geolocation);

    function geolocation() {
        let getPosition = function(cbSuccess, cbError, cbNoGeo) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
            } else {
                cbNoGeo();
            }
        };
        return {
            getPosition: getPosition
        };
    }

})();