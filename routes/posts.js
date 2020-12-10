var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
const auth = require("../auth");

router.get("/", postController.index);

router.post("/post", postController.post);
router.get("/find", postController.find);
router.get("/delete", auth, postController.delete);

module.exports = router;