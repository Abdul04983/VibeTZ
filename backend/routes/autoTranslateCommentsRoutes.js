const express = require("express");
const router = express.Router();
const { autoTranslateComment } = require("../controllers/autoTranslateCommentsController");

router.post("/", autoTranslateComment);

module.exports = router;
