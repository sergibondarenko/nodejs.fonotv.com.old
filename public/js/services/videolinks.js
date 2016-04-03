/*global angular*/
angular.module('fonotvService', [])

	// each function returns a promise object 
	.factory('Videolinks', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/videolinks');
			},
			delete : function(id) {
				return $http.delete('/api/videolinks/:' + id);
			}
		};
	}]);
