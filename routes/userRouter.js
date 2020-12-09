var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

router.post("/register", postController.register);

router.post("/login", postController.login);

module.exports = router;