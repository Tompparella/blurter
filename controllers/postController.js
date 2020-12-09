const Post = require("../models/post");
const User = require("../models/user");

const { sanitizeBody } = require("express-validator");
const bcrypt = require("bcrypt");
const { ObjectID, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

// Index handling

exports.index = function (req, res, next) {
  res.render("index");
};

// Post handling

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

// User handling

exports.register = function (req, res) {
  const { userName, motto, password } = req.body;

  // Authenticating

  try {
    if (!userName || !password) {
      return res.status(400).json({msg: "Please give both username and password." });
    }
    if (password.length < 8) {
      return res.status(400).json({msg: "The password must be at least 8 characters long" });
    }

    const existingUser = User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ msg: "That username is already taken!" });
    }

    const salt = bcrypt.genSalt();
    const hash = bcrypt.hash(password, salt);
    console.log(hash);

    const newUser = new User( {
      userName: userName,
      motto: motto,
      password: hash
    });

    const savedUser = newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.login = function (req, res) {
  try {
    const { userName, password } = req.body;

    if (!userName || !password ) {
      res.status(400).json({ msg: "Please enter both username and password." });
    }

    const user = User.findOne({ userName: userName });
    if (!user) {
      res.status(400).json({ msg: "No account with that username is registered!" });
    }

    const matched = bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*
exports.index = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
  });
};
*/