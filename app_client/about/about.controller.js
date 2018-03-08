(function() {
	angular
		.module('placeApp')
		.controller('aboutCtrl', aboutCtrl);

	function aboutCtrl() {
		var vm = this;
		vm.pageHeader = {
			title: 'О Place'
		};
		vm.main = {
			content: 'Place был создан чтобы помочь людям найти место где можно приятно провести время\n\n' +
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit Nunc sed lorem ac nisi dignissim accumsan.'
		};
	}
})();