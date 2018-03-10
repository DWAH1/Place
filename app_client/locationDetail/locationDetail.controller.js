(function() {
	angular
		.module('placeApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$location', '$modal', 'placeData', 'authentication'];
	function locationDetailCtrl($routeParams, $location, $modal, placeData, authentication) {
		let vm = this;
		vm.locationid = $routeParams.locationid;
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.isAdmin = authentication.isAdmin();
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

		vm.deleteReviewById = function (reviewId) {
			if (reviewId && confirm('Рили?')) {
				placeData.deleteReviewById(vm.locationid, reviewId)
					.success(function () {
						vm.data.location.reviews = vm.data.location.reviews.filter(function (review) {
							return review._id !== reviewId;
                        });
						console.log(`%cdeleted <${reviewId}>`, 'color: red');
                    });
			}
        };

		vm.editReviewById = function (reviewId) {
			if (reviewId) {
				let currentReview = vm.data.location.reviews.filter(function (review) {
					return review._id === reviewId;
                })[0];

				let updatedReviewText = prompt('Комментарий: ', currentReview.reviewText);
				if (updatedReviewText) {
					let updatedReview = {
						author: currentReview.author,
                        rating: currentReview.rating,
						reviewText: updatedReviewText,
						createdOn: currentReview.createdOn
					};
                    placeData.updateReviewById(vm.locationid, reviewId, updatedReview)
                        .success(function () {
                            currentReview.reviewText = updatedReviewText;
                            console.log(`%cupdated <${reviewId}>`, 'color: green');
                        });
				}
			}
        };
	}
})();