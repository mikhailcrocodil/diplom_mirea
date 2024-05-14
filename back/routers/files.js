const express = require("express");
const router = express.Router();
const Files = require("../controllers/files");

router.post("/upload-file", Files.uploadFile);

module.exports = router;
