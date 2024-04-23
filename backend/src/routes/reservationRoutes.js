// order.routes.js
const express = require("express");
const router = express.Router();
const reservationService = require("../controllers/reservation");

// Create a new order
router.post("/new", async (req, res) => {
  const data = req.body;
  // console.log(req.body);
  try {
    await reservationService.createReservation(data)

    res.json({ success: true });
  } catch (error) {
    console.log(req.body, error.message);
    res
      .status(500)
      .json({ error: "Error creating order", message: error.message });
  }
});


module.exports = router;
