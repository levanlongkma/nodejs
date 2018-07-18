// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var LibrarySchema   = new mongoose.Schema({
  	id: {type: String , required : true},
	name: {type: String , required : true},
	type: {type: String , required : true},
	author: {type: String , required : true}
});

// Export the Mongoose model
module.exports = mongoose.model('Library', LibrarySchema);