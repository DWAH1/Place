(function() {

    angular
        .module('placeApp')
        .controller('homeCtrl', homeCtrl);

    function homeCtrl($scope, placeData, geolocation) {
        let vm = this;
        vm.pageHeader = {
            title: 'Place',
            strapline: 'Найдите места для работы поблизости'
        };
        vm.sidebar = {
            content: 'Ищете место чтобы поработать и вкусно поесть?'
        };
        vm.message = 'Проверяем ваше местоположение...';
        vm.getData = function(position) {
            let lat = position.coords.latitude,
                lng = position.coords.longitude;

            // lat = 48.435237; lng = 35.046494; // DIIT
            console.log(`%clat: ${lat}`, 'color: green');
            console.log(`%clng: ${lng}`, 'color: green');

            vm.message = "Ищем места поблизости...";
            placeData.locationByCoords(lat, lng)
                .success(function(data) {
                    vm.message = data.length > 0 ? '' : 'Не найдено мест поблизости';
                    vm.data = { locations: data };
                })
                .error(function(e) {
                    vm.message = 'Что-то пошло не так';
                });
        };
        vm.showError = function(error) {
            $scope.$apply(function() {
                vm.message = error.message;
            });
        };

        vm.noGeo = function() {
            $scope.$apply(function() {
                vm.message = 'Геолокация не поддерживается вашим браузером';
            })
        };

        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
    }

})();