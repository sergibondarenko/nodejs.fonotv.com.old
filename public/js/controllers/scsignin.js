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
		show_avatar: false,
		playlists: {},
		show_playlist: false,
		player: ""	
	};

	var userPerma;
	$scope.connect_sc = function() {
    // initiate auth popup
    SC.connect().then(function() {
      return SC.get("/me");
    }).then(function(me) {
			userPerma = me.permalink;
			set_sc_ui(me.username, me.avatar_url);
			get_playlists();
    });
	};

	var set_sc_ui = function(username, useravatar) {
		$scope.soundcloud.username = username;
		$scope.soundcloud.avatar = useravatar;
		$scope.soundcloud.show_avatar = true;
		$scope.$apply();
	};

	var get_playlists = function() {
		SC.get("/me/playlists").then(function(response) {
			response.forEach(function(member) {
				$scope.soundcloud.playlists[member.title] = member.permalink;
			});
			$scope.soundcloud.show_playlist = true;
			$scope.$apply();
		});	
	};

	var play = function(uri) {
		var url = "http://soundcloud.com/" + userPerma + "/" + uri;
		SC.oEmbed(url, {auto_play: true, show_artwork: true, maxheight: 100}).then(function (resp) {
			resp.html = resp.html.replace(/scrolling="no"/, 'scrolling="yes"');
			$scope.soundcloud.player = $sce.trustAsHtml(resp.html);
			$scope.$apply();
		});
	};  

	$scope.play_playlist = function(title) {
		if ($scope.soundcloud.playlists.hasOwnProperty(title)) {
			play("sets/" + $scope.soundcloud.playlists[title]);
		}
	};

}]);
