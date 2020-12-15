const Post = require("../models/post");
const User = require("../models/user");

const { sanitizeBody } = require("express-validator");
const bcrypt = require("bcrypt");
const { ObjectID, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

/* 
  Despite its name, this script handles all requests made to the server from the client.
  I did this on just one script, since I feel that multiple controllers would have been sort of
  useless due to the projects' relatively small size.
*/

// Index handling. Fetches the current users' information.

exports.index = async function (req, res) {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
    motto: user.motto,
  });
};

// Post handling

// Posts a new 'Blurt' to the database.
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

// Finds all 'Blurts' and returns them.
exports.find = function (req, res, next) {
  Post.find().exec(function (err, posts) {
    if (err) {
      res.send("Something went wrong!");
      next();
    }
    res.end(JSON.stringify(posts));
  });
};

// Deletes a certain post.
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

// Registers a new user.
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

    // Securing the password with a salt and hash.
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

// Logs the user in to their account.
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

    // Bcrypt is used to compare the hashed password in the database to the password given by the user.
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // Gives a login token to the local storage of the user for automatic authentication in the future.
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

// Checks the client for login tokens.
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
