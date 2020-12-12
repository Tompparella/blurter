var express = require("express");
var router = express.Router();
const auth = require("../auth");
var postController = require("../controllers/postController");

router.get("/", auth, postController.index);

module.exports = router;