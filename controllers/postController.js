var Post = require("../models/post");
const { sanitizeBody } = require("express-validator");

const { ObjectID, ObjectId } = require("mongodb");

exports.index = function (req, res, next) {
  res.render("index");
};

exports.post = function(req, res, next) {
  sanitizeBody('*').trim().escape();
  var post = new Post( {
    creator: req.body.poster,
    date: req.body.date,
    time: req.body.time,
    message: req.body.msg
  });
  post.save(function(err) {
    if (err) {
      return next(err);
    }
    res.end();
  });
};

exports.find = function (req, res, next) {
  Post.find().exec(function (err, posts) {
    if (err) {
      res.send("Something went wrong!");
      next();
    }
    console.log(typeof(posts));
    res.end(JSON.stringify(posts));
  });
};

/*
exports.index = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
  });
};
*/