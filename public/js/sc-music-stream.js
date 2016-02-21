(function(){
  var widgetIframe = document.getElementById('sc-widget'),
      widget       = SC.Widget(widgetIframe);
  var play_music = document.getElementById('play-music');
	var track_ind = [];

	function randomizer(array){
		var currentIndex = array.length, temporaryValue, randomIndex;
		
		while(0 !== currentIndex){
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
	
	var MUSIC_STARTED = false;
	var MUSIC_PLAYED = false;
	play_music.addEventListener('click', function(){
		if(MUSIC_PLAYED == false){
			if(MUSIC_STARTED == false){
				track_ind = randomizer(track_ind);
				widget.skip(track_ind[0]);
				MUSIC_STARTED = true;
				MUSIC_PLAYED = true;
			} else {
				widget.pause();	
			}
		} else {
			widget.toggle();
		}
		//widget.toggle();
	});

  widget.bind(SC.Widget.Events.READY, function() {

    widget.bind(SC.Widget.Events.PLAY, function() {
      // get information about currently playing sound
      widget.getCurrentSound(function(currentSound) {
      	console.log('current, sound ' + currentSound + 'began to play');
      });
    });

		// Listen to music FINISH then
		// randomize indexes and play first
    widget.bind(SC.Widget.Events.FINISH, function() {
				track_ind = randomizer(track_ind);
				widget.skip(track_ind[0]);	
    });

		// Get tracks, randomize them and play first track in
		// the randomized array of indexes
		widget.getSounds(function(music_tracks){
			for(i in music_tracks){
				track_ind.push(i);	
			}
			track_ind = randomizer(track_ind);

			//widget.skip(track_ind[0]);				
		});

		
  });

}());
