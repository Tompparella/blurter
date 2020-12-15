var express = require("express");
var router = express.Router();
const auth = require("../auth");
var postController = require("../controllers/postController");

// Router for the page index.
router.get("/", auth, postController.index);

module.exports = router;