var path = require('path');
var Videolink = require('./models/fonotvdb');

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;

// Get links
function getLinks(res){
	Videolink.find(function(err, hyperlinks) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err) {
				res.send(err);
      }

			res.json(hyperlinks); // return all videos in JSON format
		});
}

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	app.get('/api/videolinks', function(req, res) {

		// use mongoose to get all videos in the database
		getLinks(res);
	});

	// delete a video
	app.delete('/api/videolinks/:video_id', function(req, res) {
    var id = req.params.video_id;
		Videolink.remove({
			_id : ObjectId(id)
			//_id : ObjectId('562b9068633288160d8b4568')
		}, function(err) {

			if (err) {
				res.send(err);
      }

			getLinks(res);
		});
	});

	//// create todo and send back all todos after creation
	//app.post('/api/todos', function(req, res) {

	//	// create a todo, information comes from AJAX request from Angular
	//	Todo.create({
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
	app.get('*', function(res) {
		res.sendFile('index.html', {root: path.join(__dirname, './public')}); // load the single view file 
	});
};
