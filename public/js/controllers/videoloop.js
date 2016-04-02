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
      if (index >= videoArrLen) {
        currVideoId = 0;
        loadVideo(el, currVideoId);
      }

      if ((videolinks[index] !== 'undefined') && (videolinks[index].hasOwnProperty('file'))) {
        el.setAttribute('src', videolinks[index].file);
        el.load();
      } else {
        currVideoId++;
        loadVideo(el, currVideoId);
      }
    };

    // Play video for a given video tag
    var playVideo = function(el) {
      el.play();
    };

    // Switch between video elements
    var switchVideo = function() {
      currVideoId++;

      if ($scope.videoSw.next === true) {
        $scope.videoSw.next = false;
        videoSnd.style.display = 'block';
        videoFst.style.display = 'none';

        playVideo(videoSnd);
        loadVideo(videoFst, currVideoId);
      } else {
        $scope.videoSw.next = true;
        videoSnd.style.display = 'none';
        videoFst.style.display = 'block';

        playVideo(videoFst);
        loadVideo(videoSnd, currVideoId);
      } 
    };

    // Play next video if on the current video end
    videoFst.addEventListener('ended', function() {
      switchVideo();
    });
    videoSnd.addEventListener('ended', function() {
      switchVideo();
    });

    // Play next video if error detected
    videoFst.addEventListener('error', function() {
      switchVideo();
    });
    videoSnd.addEventListener('error', function() {
      switchVideo();
    });

    // Play next video if the current video is not available
    videoFst.addEventListener('stalled', function() {
      switchVideo();
      console.log('stalled');
      console.log(videoFst);
    });
    videoSnd.addEventListener('stalled', function() {
      switchVideo();
      console.log('stalled');
      console.log(videoSnd);
    });

    // Load and play first video on the first video el
    loadVideo(videoFst, currVideoId);
    playVideo(videoFst);

    currVideoId++;
    loadVideo(videoSnd, currVideoId);
    $scope.videoSw.next = true;

  });

    
}]);
