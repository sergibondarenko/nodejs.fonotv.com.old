/*global angular*/
/*global document*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {
  
  var video = document.getElementById("video-el");

  var playVideo = function(videoSrc) {
    video.setAttribute('src', videoSrc);
    video.load();
    video.play();
  };

  //video.addEventListener("ended", playVideo($scope.videolinks[5].file), false);
  // Get video files and play them   
  Videolinks.get().success(function(data) {
    $scope.videolinks = data;

    playVideo($scope.videolinks[0].file);

  });

    
}]);
