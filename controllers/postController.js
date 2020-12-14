const Post = require("../models/post");
const User = require("../models/user");

const { sanitizeBody } = require("express-validator");
const bcrypt = require("bcrypt");
const { ObjectID, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

// Index handling

exports.index = async function (req, res) {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
    motto: user.motto,
  });
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
    res.end(JSON.stringify(posts));
  });
};

exports.delete = function (req, res) {
  console.log();
  try {
    Post.deleteOne({_id: req.body.id}).then((response) => {
      console.log("Post deleted!");
      res.end();
    });

  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// User handling

exports.register = async function (req, res) {

  try {

  console.log(req.body);

  let { userName , motto , password, passwordCheck } = req.body;


  // Authenticating

    if (!userName || !password || !passwordCheck) {
      return res.status(400).json({msg: "Please give both username and password." });
    }
    if (password.length < 8) {
      return res.status(400).json({msg: "The password must be at least 8 characters long" });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({msg: "The passwords don't match" });
    }

    const existingUser = await User.findOne({ userName: userName });

    if (existingUser) {
      return res.status(400).json({ msg: "That username is already taken!" });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      motto: motto,
      password: hash
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async function (req, res) {
  try {
    const { userName, password } = req.body;

    if (!userName || !password ) {
      res.status(400).json({ msg: "Please enter both username and password." });
    }

    const user = await User.findOne({ userName: userName });
    console.log("Current user: " + user);

    if (!user) {
      return res.status(400).json({ msg: "No account with that username is registered!" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.userName,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.tokenCheck = async function (req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);
    if(!user) {
      return res.json(false);
    }
    return res.json(true);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
/*
exports.userCheck = function (req,res) {
  const user = User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id
  });
};
*/
/*
exports.index = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
  });
};
*/