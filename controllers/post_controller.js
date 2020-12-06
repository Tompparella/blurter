var Game = require("../models/post");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const { ObjectID, ObjectId } = require("mongodb");

/*
exports.index = function (req, res, next) {
  Game.findOne({gameId: 1}).exec(function (err, game) {
    if (err) {
      return next(err);
    }
  });
};
*/