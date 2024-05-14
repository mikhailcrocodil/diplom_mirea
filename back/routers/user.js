const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const User = require("../controllers/user");

router.post("/edit-user", Auth.verify, User.updateUser);
router.post("/get-user", Auth.verify, User.getUser);
router.get("/get-users", Auth.verify, User.getUsers);
router.delete("/delete-user/:id", Auth.verify, User.deleteUser);
router.post("/grant-access", Auth.verify, User.grantAccess);
router.post("/set-role", Auth.verify, User.setUserRole);


module.exports = router;
