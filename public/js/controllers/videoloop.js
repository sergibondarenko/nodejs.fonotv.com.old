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

      if (videolinks[index] !== 'undefined') {
        if (videolinks[index].hasOwnProperty('file')) {
          el.setAttribute('src', videolinks[index].file);
          el.load();
        } else {
          currVideoId++;
          loadVideo(el, currVideoId);
        }
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
    var switchVideo = function(el, ev) {
      currVideoId++;

      if (ev === 'ended') {
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
      } else { // if error or stalled
          // switch to playing next video tag
          if (el.style.display === 'none') {
            loadVideo(el, currVideoId);
          } else {
            if (el === videoFst) {
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
          }

          // delete problem link
          var idToDelete = currVideoId - 1;
          Videolinks.delete(videolinks[idToDelete]._id)
            .success(function(data) {
              console.log('Deleted: ' + videolinks[idToDelete].file);
              videolinks = data;
              console.log(videolinks);
            });
      }
    };

    // Play next video if on the current video end
    videoFst.addEventListener('ended', function() {
      switchVideo(videoFst, 'ended');
    });
    videoSnd.addEventListener('ended', function() {
      switchVideo(videoSnd, 'ended');
    });

    // Play next video if error detected
    videoFst.addEventListener('error', function() {
      switchVideo(videoFst, 'error');
      console.log('error');
      console.log(videoFst);
    });
    videoSnd.addEventListener('error', function() {
      switchVideo(videoSnd, 'error');
      console.log('error');
      console.log(videoSnd);
    });

    // Play next video if the current video is not available
    videoFst.addEventListener('stalled', function() {
      switchVideo(videoFst, 'stalled');
      console.log('stalled');
      console.log(videoFst);
    });
    videoSnd.addEventListener('stalled', function() {
      switchVideo(videoSnd, 'stalled');
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
