// card.routes.js
const express = require("express");
const router = express.Router();
const cardService = require("../services/card.service");

// Create a new card
router.post("/new", async (req, res) => {
  try {
    const newcard = await cardService.createCard(req.body);
    res.json(newcard);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating card", message: error.message});
  }
});

// Get all cards
router.get("/all", async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Error getting cards" });
  }
});

// get all cards by user id
router.get("/allbyuserid", async (req, res) => {
  try {
    const cards = await cardService.getAllCardsByUserId(req.body);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Error getting cards", message: error.message });
  }
});

// Get a card by ID
router.get("/get", async (req, res) => {

  try {
    const card = await cardService.getCardById(
      req.body
    );

    if (!card) {
      res.status(404).json({ error: "card not found" });
      return;
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ error: "Error getting card" });
  }
});

// Update a card by ID
// router.put("/update", async (req, res) => {

//   try {
//     const updatedcard = await cardService.updatecardById(
//       req.body.id,
//       req.body
//     );

//     if (!updatedcard) {
//       res.status(404).json({ error: "card not found" });
//       return;
//     }

//     res.json(updatedcard);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating card" });
//   }
// });

// Delete a card by ID
router.post("/delete", async (req, res) => {
  try {
    const deletedcard = await cardService.deleteCardById(
      req.body
    );

    res.json(deletedcard);
  } catch (error) {
    res.status(500).json({ error: "Error deleting card", message: error.message });
  }
});

module.exports = router;
