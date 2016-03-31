/*global angular*/
/*global document*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
    var videolinks = data;
 
    $scope.videoSw = {
      fst: true,
      snd: false,
      next: false
    };
  
    var currVideoId = 0;
    var videoArrLen = videolinks.length;
    var videoFst = document.getElementById("video-el-fst");
    var videoSnd = document.getElementById("video-el-snd");

    // Load video for a video tag (el)
    var loadVideo = function(el, index) {
      el.setAttribute('src', videolinks[index].file);
      el.load();
    };

    // Play video for a given video tag
    var playVideo = function(el) {
      if (currVideoId >= videoArrLen) {
        currVideoId = 0;
        loadVideo(el, currVideoId);
      }
      el.play();
    };

    // Switch between video elements
    var switchVideo = function() {
      if ($scope.videoSw.next === true) {
        $scope.videoSw.next = false;
        $scope.videoSw.fst = false;
        $scope.videoSw.snd = true;
        loadVideo(videoSnd, currVideoId); 
        loadVideo(videoFst, currVideoId + 1);
        playVideo(videoSnd);
      } else {
        $scope.videoSw.next = true;
        $scope.videoSw.fst = true;
        $scope.videoSw.snd = false;
        loadVideo(videoSnd, currVideoId + 1);
        loadVideo(videoFst, currVideoId); 
        playVideo(videoFst);
      } 
    };

    // Play next video if on the current video end
    videoFst.addEventListener('ended', function() {
      currVideoId++;
      switchVideo();
    });
    videoSnd.addEventListener('ended', function() {
      currVideoId++;
      switchVideo();
    });

    // Play next video if error detected
    videoFst.addEventListener('error', function() {
      currVideoId++;
      switchVideo();
    });
    videoSnd.addEventListener('error', function() {
      currVideoId++;
      switchVideo();
    });

    // Play next video if the current video is not available
    videoFst.addEventListener('stalled', function() {
      currVideoId++;
      switchVideo();
    });
    videoSnd.addEventListener('stalled', function() {
      currVideoId++;
      switchVideo();
    });

    // Load and play first video on the first video el
    switchVideo();

    //$scope.videolinks = data;
    //var currVideoId = 0;
    //var videoArrLen = $scope.videolinks.length;
    //var video = document.getElementById("video-el");

    //// Load and play video
    //var playVideo = function(index) {
    //  video.setAttribute('src', $scope.videolinks[index].file);
    //  video.load();
    //  video.play();
    //  console.log($scope.videolinks[index].file);
    //};

    //// Play next video in the DB
    //var playNextVideo = function() {
    //  currVideoId++;
    //  if (currVideoId >= videoArrLen) {
    //    currVideoId = 0;
    //  }
    //  playVideo(currVideoId);
    //};

    //// Play the first video
    //playVideo(currVideoId);

    //// Play next video if on the current video end
    //video.addEventListener('ended', function() {
    //  playNextVideo();
    //});

    //// Play next video if error detected
    //video.addEventListener('error', function() {
    //  playNextVideo();
    //});

    //// Play next video if the current video is not available
    //video.addEventListener('stalled', function() {
    //  playNextVideo();
    //});

  });

    
}]);
