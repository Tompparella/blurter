var express = require("express");
const auth = require("../auth");
var router = express.Router();
var postController = require("../controllers/postController");

// Router for handling requests made to /users route.

router.post("/register", postController.register);

router.post("/login", postController.login);

router.post("/tokenIsValid", postController.tokenCheck);

router.get("/", auth, postController.index);

module.exports = router;