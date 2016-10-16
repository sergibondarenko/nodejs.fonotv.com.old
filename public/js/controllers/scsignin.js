/*global angular*/
/*global document*/
fonotvApp.controller('scSigninController', ['$scope', function($scope) {

	SC.initialize({
		client_id: '8ebe7791917d11f0e573ef82a7bb1295',
		redirect_uri: 'http://fonotv.com/callback.html'
	});

	$scope.soundcloud = {
		username: "",
		avatar: "img/default_avatar.png",
		playlists: {}	
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
		url = "http://soundcloud.com/" + userPerma + "/" + uri;
		SC.oEmbed(url, {maxheight: 200}, function (resp) {
			$scope.scPlayer = resp.html;
		});
	};  

	var play_playlist = function(title) {
		if ($scope.playlists.hasOwnProperty(title)) {
			play("sets/" + playlists[title]);
		}
	};

}]);
