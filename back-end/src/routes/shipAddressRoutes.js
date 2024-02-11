// shipAddress.routes.js
const express = require("express");
const router = express.Router();
const shipAddressService = require("../services/ship_address.service");

// Create a new shipAddress
router.post("/ship_addresss", async (req, res) => {
  try {
    const newShipAddress = await shipAddressService.createShipAddress(req.body);
    res.json(newShipAddress);
  } catch (error) {
    res.status(500).json({ error: "Error creating shipAddress" });
  }
});

// Get all shipAddresss
router.get("/ship_addresss", async (req, res) => {
  try {
    const shipAddresss = await shipAddressService.getAllShipAddresss();
    res.json(shipAddresss);
  } catch (error) {
    res.status(500).json({ error: "Error getting shipAddresss" });
  }
});

// Get a shipAddress by ID
router.get("/ship_addresss/:id", async (req, res) => {
  const shipAddressId = parseInt(req.params.id, 10);

  try {
    const shipAddress = await shipAddressService.getShipAddressById(
      shipAddressId
    );

    if (!shipAddress) {
      res.status(404).json({ error: "ShipAddress not found" });
      return;
    }

    res.json(shipAddress);
  } catch (error) {
    res.status(500).json({ error: "Error getting shipAddress" });
  }
});

// Update a shipAddress by ID
router.put("/ship_addresss/:id", async (req, res) => {
  const shipAddressId = parseInt(req.params.id, 10);

  try {
    const updatedShipAddress = await shipAddressService.updateShipAddressById(
      shipAddressId,
      req.body
    );

    if (!updatedShipAddress) {
      res.status(404).json({ error: "ShipAddress not found" });
      return;
    }

    res.json(updatedShipAddress);
  } catch (error) {
    res.status(500).json({ error: "Error updating shipAddress" });
  }
});

// Delete a shipAddress by ID
router.delete("/ship_addresss/:id", async (req, res) => {
  const shipAddressId = parseInt(req.params.id, 10);

  try {
    const deletedShipAddress = await shipAddressService.deleteShipAddressById(
      shipAddressId
    );

    if (!deletedShipAddress) {
      res.status(404).json({ error: "ShipAddress not found" });
      return;
    }

    res.json(deletedShipAddress);
  } catch (error) {
    res.status(500).json({ error: "Error deleting shipAddress" });
  }
});

module.exports = router;
