var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// The model for posts/blurts made in the webpage to be posted to the database.
var PostSchema = new Schema({
    creator: String,
    date: String,
    time: String,
    message: String
});

module.exports = mongoose.model("Post", PostSchema);