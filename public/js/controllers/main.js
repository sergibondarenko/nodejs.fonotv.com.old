var LOOP = 0;
//var mute = true;
var NEXT = true;

// Randomize
function randomizer(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to play videos
function playVideo(video_source, videoTag, videoNext){
	var video = document.getElementById(videoTag); 
	var video_next = document.getElementById(videoNext); 
	var play_music = document.getElementById('play-music');
	var video_link = document.getElementById('orig-link');
	var video_link_title = document.getElementById('orig-link-title');

	// Randomize video array
	video_source = randomizer(video_source);

	//// Test console output
	//for(var i = 0; i < video_source.length; i++){
	//  console.log(video_source[i].file);
	//} 
	
	// Play coubs
	var videoCount = video_source.length; 
	var videoId = 0;
	
	// Set the first video that starts automatically
	video.setAttribute("src",video_source[videoId].file);
	video_link.setAttribute("href",video_source[videoId].orig_page);
	video_link_title.textContent = video_source[videoId].title;

	video_next.setAttribute("src",video_source[videoId + 1].file);

	// Listen for video end and run handler to play other videos
	video.addEventListener('ended',myHandler,false);

	//play_music.addEventListener('click', function(){
  //	muteVideo(video); 
  //}, false);

	//// Mute and unmute
	//function muteVideo(video){
	//	if(video.muted)
	//		video.muted = false;
	//	else
	//		video.muted = true;	
	//}

	// Play all other videos
	function playVideoForHandler(videoNum)
	{

		if(NEXT == true){
			NEXT = false;
			video_next.style.display = 'block';
			video.style.display = 'none';

	  	video.setAttribute("src",video_source[videoNum].file);
			video.load();
			video_next.play();

			video_link.setAttribute("href",video_source[videoNum].orig_page);
			video_link_title.textContent = video_source[videoNum].title;
		} else {
			NEXT = true;
			video.style.display = 'block';
			video_next.style.display = 'none';

	  	video_next.setAttribute("src",video_source[videoNum].file);
			video_next.load();
			video.play();

			video_link.setAttribute("href",video_source[videoNum].orig_page);
			video_link_title.textContent = video_source[videoNum].title;
		}

		// Check for errors, play next video if error
		video.addEventListener('error', function(){
			videoNum++;
			videoId = videoNum; // Update global variable to not repeat previous video
	  	video.setAttribute("src",video_source[videoNum].file);
			video_link.setAttribute("href",video_source[videoNum].orig_page);
			video_link_title.textContent = video_source[videoNum].title;
		}, true);


		//if(mute == true){
		//	if(NEXT == true)
		//		video_next.muted = true;
		//	else
		//		video.muted = true;	
		//} else {
		//	if(NEXT == false)
		//		video.muted = false;	
		//	else
		//		video_next.muted = false;
		//}

	}

	function myHandler(){
		//if(video.muted)
		//	mute = true;
		//else
		//	mute = false;

	  if (videoId == (videoCount - 1)){
	    videoId = 0;
	    playVideoForHandler(videoId);
	  } else {
	    videoId++;
	    playVideoForHandler(videoId);
	  }
	} // myHandler

}

var video_source = {};

// app controller
angular.module('fonotvController', [])

	// inject the Todo service factory into our controller
	.controller('fonotvController', ['$scope','$http','Videolinks', function($scope, $http, Videolinks) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Videolinks.get()
			.success(function(data) {
				$scope.videolinks = data;
				$scope.loading = false;
				video_source = data;	
				playVideo(video_source, "video-about", "video-about-next");
			});

		//Todos.get()
		//	.success(function(data) {
		//		$scope.todos = data;
		//		$scope.loading = false;
		//	});

		//// CREATE ==================================================================
		//// when submitting the add form, send the text to the node API
		//$scope.createTodo = function() {

		//	// validate the formData to make sure that something is there
		//	// if form is empty, nothing will happen
		//	if ($scope.formData.text != undefined) {
		//		$scope.loading = true;

		//		// call the create function from our service (returns a promise object)
		//		Todos.create($scope.formData)

		//			// if successful creation, call our get function to get all the new todos
		//			.success(function(data) {
		//				$scope.loading = false;
		//				$scope.formData = {}; // clear the form so our user is ready to enter another
		//				$scope.todos = data; // assign our new list of todos
		//			});
		//	}
		//};

		//// DELETE ==================================================================
		//// delete a todo after checking it
		//$scope.deleteTodo = function(id) {
		//	$scope.loading = true;

		//	Todos.delete(id)
		//		// if successful creation, call our get function to get all the new todos
		//		.success(function(data) {
		//			$scope.loading = false;
		//			$scope.todos = data; // assign our new list of todos
		//		});
		//};
	}]);
