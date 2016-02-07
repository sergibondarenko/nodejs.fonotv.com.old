angular.module('fonotvService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Videolinks', ['$http',function($http) {
		return {
			get : function() {
				console.log('fonotvService works!\n');
				return $http.get('/api/videolinks');
			}//,
			//create : function(todoData) {
			//	return $http.post('/api/videolinks', todoData);
			//},
			//delete : function(id) {
			//	return $http.delete('/api/videolinks/' + id);
			//}
		}
	}]);
