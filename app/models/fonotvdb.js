var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db_schema = new Schema({
	//text: String
	_id: String,
	source: String,
	orig_page: String,
	likes: Number,
	title: String,
	file: String,
	video_mobile_res: String,
	video_high_res_mutes_muted: String,
	audio_high_res: String,
	video_med_res_muted: String,
	audio_med_res: String
}, {collection: 'hyperlinks'});

module.exports = mongoose.model('Videolink', db_schema);
