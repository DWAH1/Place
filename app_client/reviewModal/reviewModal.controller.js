(function() {
	angular
		.module('placeApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject = ['$modalInstance', 'placeData', 'locationData'];
	function reviewModalCtrl($modalInstance, placeData, locationData) {
		var vm = this;

        vm.formData = {};
        vm.formData.rating = 3;
		vm.locationData = locationData;
		vm.modal = {
			close: function(result) {
				$modalInstance.close(result);
			},
			cancel: function() {
				$modalInstance.dismiss('cancel');
			}
		};
		vm.onSubmit = function() {
			vm.formError = "";
			if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "Все поля обязательны, попробуйте снова.";
				return false;
			} else {
				vm.doAddReview(vm.locationData.locationid, vm.formData);
			}
		};
		vm.doAddReview = function(locationid, formData) {
			placeData.addReviewById(locationid, {
				author: formData.name,
				rating: formData.rating,
				reviewText: formData.reviewText
			})
			.success(function(data) {
				vm.modal.close(data);
			})
			.error(function(data) {
				vm.formError = "Не удалось сохранить отзыв, попробуйте снова";
			});
			return false;
		}
	}
})();