(function() {
	angular
		.module('placeApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'placeData', 'authentication'];
	function locationDetailCtrl($routeParams, $location, $modal, placeData, authentication) {
		let vm = this;
		vm.locationid = $routeParams.locationid;
		vm.isLoggedIn = authentication.isLoggedIn();
		// vm.isAdmin = authentication.isAdmin();
		vm.currentPath = $location.path();

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
			let modalInstance = $modal.open({
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