(function VideoController($angular) {

    /**
     * @module ngVideo
     * @author Adam Timberlake
     * @link https://github.com/Wildhoney/ngVideo
     * @controller VideoController
     * @param $scope {Object}
     */
    $angular.module(APP_NAME).controller('VideoController', 

    function videoController($scope, $http, $timeout, video) {

        /**
         * @property playlistOpen
         * @type {Boolean}
         * @default false
         */
        $scope.playlistOpen = false;

        $http.get('/api/videolinks').then(function(data){
          $scope.videolinks = data;
        
          var i;
          $scope.videofiles = {};
          for(i = 0; i < $scope.videolinks.data.length; i++) {
            $scope.videofiles[i] = $scope.videolinks.data[i].file;
          }

          /**
           * @property videos
           * @type {Object}
           */
          $scope.videos = {
              first:  'http://www.w3schools.com/html/mov_bbb.mp4',
              second: 'http://www.w3schools.com/html/movie.mp4'
          };

          /**
           * @method playVideo
           * @param sourceUrl {String}
           * @return {void}
           */
          $scope.playVideo = function playVideo(sourceUrl) {
              video.addSource('mp4', sourceUrl, true);
          };

          /**
           * @method getVideoName
           * @param videoModel {Object}
           * @return {String}
           */
          $scope.getVideoName = function getVideoName(videoModel) {

              switch (videoModel.src) {
                  case ($scope.videos.first): return "Big Buck Bunny";
                  case ($scope.videos.second): return "The Bear";
                  default: return "Unknown Video";
              }

          };

          // Add some video sources for the player!
          //video.addSource('mp4', $scope.videos.first);
          //video.addSource('mp4', $scope.videos.second);
          ///video.addSource('mp4', $scope.videofiles[1]);
          ///video.addSource('mp4', $scope.videofiles[2]);
          ///video.addSource('mp4', $scope.videofiles[3]);
          ///video.addSource('mp4', $scope.videofiles[4]);
          video.addSource('mp4', 'video/iphone_1442959294_iphone.mp4');
          video.addSource('mp4', 'video/iphone_1443534053_iphone.mp4');
          video.addSource('mp4', 'video/iphone_1442505339_iphone.mp4');
        });

    });

})(window.angular);
