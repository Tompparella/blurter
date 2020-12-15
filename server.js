const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Promise = require("bluebird");

var mongoose = require("mongoose");

var postRouter = require("./routes/posts");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");

// Handles everything serverside, from database connection to establishing routes.

// Mongoose connection
var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = "";

var mongoURL = process.env.MONGODB_CONNECTION_STRING;

  // For local dev
if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
    mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
    mongoDatabase = process.env[mongoServiceName + "_DATABASE"];
    mongoPassword = process.env[mongoServiceName + "_PASSWORD"];
    mongoUser = process.env[mongoServiceName + "_USER"];

    // If using env vars from secret from service binding
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = "mongodb://";
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ":" + mongoPassword + "@";
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ":" + mongoPort + "/" + mongoDatabase;
    mongoURL += mongoHost + ":" + mongoPort + "/" + mongoDatabase;
  }
}

//Get default connection
mongoose.connect(mongoURL);
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // show error message
  res.status(err.status || 500);
  console.log(res.locals.error);
});

app.listen(port, () => console.log(`Server started on port ${port}`));