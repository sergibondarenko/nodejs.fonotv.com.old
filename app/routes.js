var path = require('path');
var CoubVideo = require('./models/coubdb');

var mongodb = require('mongodb');

/*jslint unparam: true*/

// Get links
function getLinks(res){
  CoubVideo.findRandom({}, {}, {limit: 200}, function(err, hyperlinks) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
    	res.send(err);
    }
    
    res.json(hyperlinks); // return all videos in JSON format
  });
}

module.exports = function(app) {

	// api ---------------------------------------------------------------------

  // use mongoose to get all videos in the database
	app.get('/api/videolinks', function(req, res) {
		getLinks(res);
	});

	// delete a video
	app.delete('/api/videolinks/:video_id', function(req, res) {
		CoubVideo.remove({
			_id : mongodb.ObjectID(req.params.video_id)
		}, function(err) {

			if (err) {
				res.send(err);
      }
      console.log("Removed id= " + req.params.video_id);

			getLinks(res);
		});
	});

	//// create todo and send back all todos after creation
	//app.post('/api/videolinks', function(req, res) {

	//	// create a todo, information comes from AJAX request from Angular
	//	CoubVideo.create({
	//		text : req.body.text,
	//		done : false
	//	}, function(err, todo) {
	//		if (err)
	//			res.send(err);

	//		// get and return all the todos after you create another
	//		getTodos(res);
	//	});

	//});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendFile('index.html', {root: path.join(__dirname, '../public')}); // load the single view file 
	});
};
