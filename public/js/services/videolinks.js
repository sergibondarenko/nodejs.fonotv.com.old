/*global angular, Promise*/
angular.module('fonotvService', [])
// each function returns a promise object 
.factory('Videolinks', ['$http', function($http) {
	return {
		get : function() {
			return $http.get('/api/videolinks');
		},
		delete : function(id) {
			return $http.delete('/api/videolinks/' + id);
		},
        randomize : function(array) {
          var promise = new Promise (function (resolve, reject) {

            var currentIndex = array.length, temporaryValue, randomIndex;
  
            // While there remain elements to shuffle
            while (0 !== currentIndex) {
  
              // Pick a remaining element
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
  
              // And swap it with the current element
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
  
            if (array.length > 0) {
              resolve(array);
            } else {
              reject("empty");
            }

          });

          return promise;
        }
	    };
}]);
