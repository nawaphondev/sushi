// cart.routes.js
const express = require("express");
const router = express.Router();
const cartService = require("../services/cart.service");

// Create a new cart
router.post("/carts", async (req, res) => {
  try {
    const newCart = await cartService.createCart(req.body);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart" });
  }
});

// Get all carts
router.get("/carts", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error getting carts" });
  }
});

// Get a cart by ID
router.get("/carts/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error getting cart" });
  }
});

// Update a cart by ID
router.put("/carts/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const updatedCart = await cartService.updateCartById(cartId, req.body);

    if (!updatedCart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart" });
  }
});

// Delete a cart by ID
router.delete("/carts/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const deletedCart = await cartService.deleteCartById(cartId);

    if (!deletedCart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ error: "Error deleting cart" });
  }
});

module.exports = router;
