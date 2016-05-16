/*global angular*/
/*global document*/
angular.module('videoloopController', [])

.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
    //var videolinks = data;
 
    var video = {
      next: false,
      id: 0,
      arr: data,
      arrLen: data.length,
      fstTag: document.getElementById("video-el-fst"),
      sndTag: document.getElementById("video-el-snd")
    };
  

    // Load video for a video tag (el)
    function loadVideo (tag, index) {
      console.log(video);
      tag.setAttribute("src", video.arr[index].file);
      tag.load();
    }

    // Play video for a given video tag
    function playVideo (tag) {
      tag.play();
    }

    //// Stop video for a given video tag
    //function stopVideo (tag) {
    //  tag.stop();
    //}

    // Switch video
    function switchVideo (tag, currStat) {

      if (video.id >= video.arrLen) {
        video.id = 0;
      }

      if (currStat === "ended" || currStat === "error") {
        video.id++; // next video

        //stopVideo(tag);
        loadVideo(tag, video.id);
        playVideo(tag); 

        // Load video info
        $scope.origLink = "http://coub.com/view/" +  video.arr[video.id].permalink;
        $scope.origLinkTitle = video.arr[video.id].title;
        console.log($scope.origLinkTitle);
      }
    }

    // Play next video if on the current video end
    video.fstTag.addEventListener("ended", function() {
      $scope.$apply(switchVideo(video.fstTag, "ended"));
    });

    // Play next video if error detected
    video.fstTag.addEventListener("error", function() {
      $scope.$apply(switchVideo(video.fstTag, "error"));
    });

    //// Play next video if stalled
    //video.fstTag.addEventListener("stalled", function() {
    //  $scope.$apply(switchVideo(video.fstTag, "stalled"));
    //});

    //// Play first video from video.arr
    // Shuffle videos
    video.arr = Videolinks.randomize(video.arr);

    // Load and play first video on the first video el
    loadVideo(video.fstTag, video.id);
    playVideo(video.fstTag);

    // Load video info
    $scope.origLink = "http://coub.com/view/" +  video.arr[video.id].permalink;
    $scope.origLinkTitle = video.arr[video.id].title;

  });

    
}]);
