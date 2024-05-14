const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth");
const Delete = require("../controllers/delete")

router.post("/theme", Auth.verify, Delete.DeleteTheme);
router.post("/course", Auth.verify, Delete.DeleteCourse);
router.post("/module", Auth.verify, Delete.DeleteModule);
router.post("/material", Auth.verify, Delete.DeleteMaterial);

module.exports = router;