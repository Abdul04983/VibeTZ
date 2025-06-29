const express = require("express");
const router = express.Router();

const { translateText } = require("../controllers/autoTranslateController");

router.post("/", translateText);

module.exports = router;
