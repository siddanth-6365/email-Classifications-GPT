const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mail");
const openaiController = require("../controllers/openai");
const { checkAuth } = require("../middlewares");

router.get("/profile", mailController.getProfile);

router.get("/mails", mailController.getMails);

router.post("/mails/:messageId", mailController.readMail);

router.post("/classify", openaiController.classify);

module.exports = router;
