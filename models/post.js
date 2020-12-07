var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    creator: String,
    date: String,
    time: String,
    message: String
});

module.exports = mongoose.model("Post", PostSchema);