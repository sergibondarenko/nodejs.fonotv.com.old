/*global angular*/
/*global document*/
angular.module('videoloop_blackController', [])

.controller('videoloop_blackController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
    var videolinks = data;
 
    $scope.videoSw = {
      next: false
    };
  
    var currVideoId = 0;
    var videoArrLen = videolinks.length;
    var videoFst = document.getElementById("video-el-fst");
    var extScope = $scope;

    // Load video for a video tag (el)
    var loadVideo = function(el, index) {
      if (index >= videoArrLen) {
        currVideoId = 0;
        loadVideo(el, currVideoId);
      } else {
        el.setAttribute('src', videolinks[currVideoId].file);
        el.load();
      }
    };

    // Play video for a given video tag
    var playVideo = function(el) {
      el.play();
    };

    // Switch between video elements
    var switchVideo = function(el, ev) {
      extScope.origLink = videolinks[currVideoId].orig_page;
      extScope.origLinkTitle = videolinks[currVideoId].title;

      currVideoId++;

      if (ev === 'ended' || ev === 'stalled') {
        loadVideo(el, currVideoId);
        playVideo(el);
      } else { // if error
        loadVideo(el, currVideoId);
        playVideo(el);

        // delete problem link
        var idToDelete = currVideoId - 1;
        Videolinks.delete(videolinks[idToDelete]._id)
          .success(function(data) {
            console.log('Deleted: ' + videolinks[idToDelete].file);
            videolinks = data;
          });
      }
    };

    // Play next video if on the current video end
    videoFst.addEventListener('ended', function() {
      switchVideo(videoFst, 'ended');
    });

    // Play next video if error detected
    videoFst.addEventListener('error', function() {
      switchVideo(videoFst, 'error');
      console.log('!!!error');
      console.log(videoFst);
    });

    // Play next video if the current video is not available
    videoFst.addEventListener('stalled', function() {
      switchVideo(videoFst, 'stalled');
      console.log('stalled');
      console.log(videoFst);
    });

    videolinks = Videolinks.randomize(videolinks);

    // Load and play first video on the first video el
    loadVideo(videoFst, currVideoId);
    playVideo(videoFst);
    
    $scope.origLink = videolinks[currVideoId].orig_page;
    $scope.origLinkTitle = videolinks[currVideoId].title;

    currVideoId++;

  });

    
}]);
