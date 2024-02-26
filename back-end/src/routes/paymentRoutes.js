// Payment.routes.js
const express = require("express");
const router = express.Router();
const paymentService = require("../controllers/payment");

// Create a new Payment
router.post("/new", async (req, res) => {
  try {
    const newPayment = await paymentService.createPayment(req.body);
    res.json(newPayment);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating Payment", message: error.message });
  }
});

// Get all Payment
router.get("/all", async (req, res) => {
  try {
    const Payment = await paymentService.getAllPayments();
    res.json(Payment);
  } catch (error) {
    res.status(500).json({ error: "Error getting Payment" });
  }
});

// get all Payment by user id
router.get("/allbyuserid", async (req, res) => {
  try {
    const Payment = await paymentService.getAllPaymentsByUserId(req.body);
    res.json(Payment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting Payment", message: error.message });
  }
});

// Get a Payment by ID
router.get("/get", async (req, res) => {
  try {
    const Payment = await paymentService.getPaymentById(req.body);

    if (!Payment) {
      res.status(404).json({ error: "Payment not found" });
      return;
    }

    res.json(Payment);
  } catch (error) {
    res.status(500).json({ error: "Error getting Payment" });
  }
});

// Update a Payment by ID
router.put("/update", async (req, res) => {
  try {
    const updatedPayment = await paymentService.updatePaymentById(
      req.body.id,
      req.body
    );

    if (!updatedPayment) {
      res.status(404).json({ error: "Payment not found" });
      return;
    }

    res.json(updatedPayment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating Payment", message: error.message });
  }
});

// Delete a Payment by ID
router.post("/delete", async (req, res) => {
  try {
    const deletedPayment = await paymentService.deletePaymentById(req.body);

    res.json(deletedPayment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting Payment", message: error.message });
  }
});

module.exports = router;
