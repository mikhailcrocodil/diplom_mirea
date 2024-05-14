const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");

router.post("/registration", Auth.registration);
router.post("/authorization", Auth.login);
router.post("/verify", Auth.verify);


module.exports = router;
