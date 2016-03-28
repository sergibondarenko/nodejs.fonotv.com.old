/*global angular*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {
  $scope.formData = {};
  $scope.loading = true;
  
  // GET =====================================================================
  // when landing on the page, get all todos and show them
  // use the service to get all the todos
  Videolinks.get().success(function(data) {
    $scope.videolinks = data;
  });


    
}]);
