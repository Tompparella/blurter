var express = require("express");
var router = express.Router();
var post_controller = require("../controllers/postController");

router.get("/", post_controller.index);

module.exports = router;