// contact.routes.js
const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/mail");

// Create a new order
router.post("/", async (req, res) => {
  try {
    sendEmail(req.body);
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
