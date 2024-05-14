const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const Test = require("../controllers/test");


router.get("/get-questions", Auth.verify, Test.getQuestions);

module.exports = router;