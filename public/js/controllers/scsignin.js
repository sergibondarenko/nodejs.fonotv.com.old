/*global angular*/
/*global document*/
fonotvApp.controller('scSigninController', ['$scope', '$sce', function($scope, $sce) {

	SC.initialize({
		client_id: '8ebe7791917d11f0e573ef82a7bb1295',
		redirect_uri: 'http://fonotv.com/callback.html'
	});

	$scope.soundcloud = {
		username: "",
		avatar: "img/default_avatar.png",
		playlists: {},
		player: ""	
	};

	var userPerma;
	$scope.connect_sc = function() {
    // initiate auth popup
    SC.connect().then(function() {
      return SC.get("/me");
    }).then(function(me) {
			console.log(me);
			userPerma = me.permalink;
			set_sc_ui(me.username, me.avatar_url);
			get_playlists();
    });
	};

	var set_sc_ui = function(username, useravatar) {
		$scope.soundcloud.username = username;
		$scope.soundcloud.avatar = useravatar;
		console.log($scope.soundcloud.username);
		$scope.$apply();
	};

	var get_playlists = function() {
		var i;
		SC.get("/me/playlists").then(function(response) {
			console.log(response);
			for(i = 0; i < response.length; i++) {
				$scope.soundcloud.playlists[response[i].title] = response[i].permalink;
			}
			console.log($scope.soundcloud.playlists);
			$scope.$apply();
		});	
	};

	var play = function(uri) {
		//var url = "http://soundcloud.com/" + userPerma + "/" + uri;
		var url = "http://soundcloud.com/forss/flickermood"; 
		console.log(url);
		SC.oEmbed(url, {auto_play: true, maxheight: 100}).then(function (resp) {
			$scope.soundcloud.player = $sce.trustAsHtml(resp.html);
			console.log($scope.soundcloud.player);
			$scope.$apply();
		});
	};  

	$scope.play_playlist = function(title) {
		if ($scope.soundcloud.playlists.hasOwnProperty(title)) {
			play("sets/" + $scope.soundcloud.playlists[title]);
		}
	};

}]);
