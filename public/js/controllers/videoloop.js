/*global angular*/
/*global document, fonotvApp*/
fonotvApp.controller('videoloopController', ['$scope', 'Videolinks', function($scope, Videolinks) {

  // Get video files and play them   
  Videolinks.get().success(function(data) {
 
    var video = {
      next: false,
      id: 0,
      arr: data,
      arrLen: data.length,
      timesPlayed: 0,
      fstTag: document.getElementById("video-el-fst"),
      sndTag: document.getElementById("video-el-snd")
    };
  
    // Increment video id before video load 
    // Load video for a video tag (el)
    function loadVideo (tag, index) {
      if (video.arr[index] === undefined || video.arr[index] === null) {

        if (index > video.arrLen - 1) {
          video.id = 0;
        } else {
          video.id++; // next video
        }

        tag.setAttribute("src", video.arr[video.id].file_versions.html5.video.med.url);
      } else {
        tag.setAttribute("src", video.arr[index].file_versions.html5.video.med.url);
      }

      tag.load();
    }

    // Play video for a given video tag
    function playVideo (tag) {
      tag.play();
      video.timesPlayed++;
      if (video.timesPlayed === 101) {
        Videolinks.get().success(function(data) {
          video.arr = data;
          video.timesPlayed = 0;
        });
      }
    }

    // Switch video
    function switchVideo (tag, currStat) {

      if (video.id > video.arrLen - 1) {
        video.id = 0;
      } else {
        video.id++; // next video
      }

      if (currStat === "ended" || currStat === "error") {

        if (tag === video.sndTag) {
          video.sndTag.style.display = "block"; // show tag
          video.fstTag.style.display = "none"; // hide tag
          loadVideo(video.fstTag, video.id + 1); // load with next id
        } else {
          video.sndTag.style.display = "none";
          video.fstTag.style.display = "block";
          loadVideo(video.sndTag, video.id + 1);
        }

        playVideo(tag); // play current video 

        // Load video info
        $scope.origLink = "http://coub.com/view/" +  video.arr[video.id].permalink;
        $scope.origLinkTitle = video.arr[video.id].title;
      }
    }

    // Play next video if on the current video end
    video.fstTag.addEventListener("ended", function() {
      $scope.$apply(switchVideo(video.sndTag, "ended"));
    });
    video.sndTag.addEventListener("ended", function() {
      $scope.$apply(switchVideo(video.fstTag, "ended"));
    });

    // Play next video if error detected
    video.fstTag.addEventListener("error", function() {
      $scope.$apply(switchVideo(video.sndTag, "error"));
    });
    video.sndTag.addEventListener("error", function() {
      $scope.$apply(switchVideo(video.fstTag, "error"));
    });

    //// Shuffle videos. !!! Initial shuffling is done on the backend be findRandom()
    //Videolinks.randomize(video.arr).then(function (data) {
    //  video.arr = data;
    //});

    // Play first video from video.arr
    loadVideo(video.fstTag, video.id);
    playVideo(video.fstTag);

    // Load video info
    $scope.origLink = "http://coub.com/view/" +  video.arr[video.id].permalink;
    $scope.origLinkTitle = video.arr[video.id].title;

    // Load next video into hidden tag
    loadVideo(video.sndTag, video.id + 1);
  });
}]);
