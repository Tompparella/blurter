var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

router.post("/register", postController.register);

router.post("/login", postController.login);

router.post("/tokenIsValid", postController.tokenCheck);

module.exports = router;