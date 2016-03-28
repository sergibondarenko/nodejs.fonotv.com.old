/*global angular*/
/*global document*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
 
    $scope.videolinks = data;

    var currVideoId = 0;
    var videoArrLen = $scope.videolinks.length;
    var video = document.getElementById("video-el");

    // Load and play video
    var playVideo = function(index) {
      video.setAttribute('src', $scope.videolinks[index].file);
      video.load();
      video.play();
      console.log($scope.videolinks[index].file);
    };

    // Play first video
    playVideo(currVideoId);

    // Play other videos
    video.addEventListener('ended', function() {
      currVideoId++;
      if (currVideoId >= videoArrLen) {
        currVideoId = 0;
      }
      playVideo(currVideoId);
    });

  });

    
}]);
