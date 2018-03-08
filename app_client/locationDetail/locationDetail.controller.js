(function() {
	angular
		.module('placeApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$modal', 'placeData'];
	function locationDetailCtrl($routeParams, $modal, placeData) {
		var vm = this;
		vm.locationid = $routeParams.locationid;

		placeData.locationById(vm.locationid)
			.success(function(data) {
				vm.data = { location: data};
				vm.pageHeader = {
					title: vm.data.location.name
				};
			})
			.error(function(e) {
				console.log(e);
			});

		vm.popupReviewForm = function() {
			var modalInstance = $modal.open({
				templateUrl: '/reviewModal/reviewModal.view.html',
				controller: 'reviewModalCtrl as vm',
				resolve: {
					locationData: function() {
						return {
							locationid: vm.locationid,
							locationName: vm.data.location.name
						};
					}
				}
			});
			modalInstance.result.then(function(data) {
				vm.data.location.reviews.push(data);
			})
		};
	}
})();