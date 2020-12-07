var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");

router.get("/", postController.index);

router.post("/post", postController.post);
router.get("/find", postController.find);

module.exports = router;