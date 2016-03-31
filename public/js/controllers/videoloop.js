/*global angular*/
/*global document*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
 
    $scope.videolinks = data;

    var currVideoId = 0;
    var videoArrLen = $scope.videolinks.length;
    var video = document.getElementById("video-el-fst");

    // Load and play video
    var playVideo = function(index) {
      video.setAttribute('src', $scope.videolinks[index].file);
      video.load();
      video.play();
      console.log($scope.videolinks[index].file);
    };

    // Play next video in the DB
    var playNextVideo = function() {
      currVideoId++;
      if (currVideoId >= videoArrLen) {
        currVideoId = 0;
      }
      playVideo(currVideoId);
    };

    // Play the first video
    playVideo(currVideoId);

    // Play next video if on the current video end
    video.addEventListener('ended', function() {
      playNextVideo();
    });

    // Play next video if error detected
    video.addEventListener('error', function() {
      playNextVideo();
    });

    // Play next video if the current video is not available
    video.addEventListener('stalled', function() {
      playNextVideo();
    });

  });

    
}]);
