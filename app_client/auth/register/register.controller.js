(function() {
	angular
		.module('placeApp')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl($location, authentication) {
		let vm = this;
		vm.pageHeader = {
			title: 'Создать новый аккаунт'
		};
		vm.credentials = {
			name: '',
			email: '',
			password: ''
		};
		vm.returnPage = $location.search().page || '/';
		vm.onSubmit = function() {
			vm.formError = '';
			if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
				vm.formError = 'Все поля обязательны, пожалуйста попробуйте снова';
				return false;
			} else {
				vm.doRegister();
			}
		};
		vm.doRegister = function() {
			vm.formError = '';
			authentication
				.register(vm.credentials)
				.error(function(err) {
					vm.formError = err;
				})
				.then(function() {
					$location.search('page', null);
					$location.path(vm.returnPage);
				})
		}
	}
})();