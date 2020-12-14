var express = require("express");
var router = express.Router();
var postController = require("../controllers/postController");
const auth = require("../auth");

router.get("/", auth, postController.index);

router.post("/post", postController.post);
router.get("/find", postController.find);
router.post("/delete", auth, postController.delete);

module.exports = router;