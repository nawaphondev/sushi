// product.routes.js
const express = require("express");
const router = express.Router();
const productService = require("../services/product.service");
const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const { name, description, color, capacity, price, stock } = req.body;

    // Handle image upload
    const productImg64 = req.body.productImg
      ? await saveImage(req.body.productImg)
      : "";
    console.log(productImg64);
    const newProduct = await productService.createProduct({
      name,
      description,
      color,
      capacity,
      price,
      stock,
      productImg64,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error + "Error creating product" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

// Get a product by ID
router.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const product = await productService.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
});

// Update a product by ID
router.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const updatedProduct = await productService.updateProductById(
      productId,
      req.body
    );

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product by ID
router.delete("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  try {
    const deletedProduct = await productService.deleteProductById(productId);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

// Route to post an image file
router.post("/products/upload", upload.single("image"), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the file path
    const imagePath = req.file.path;

    // Respond with the image path
    res.json({ imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update the productImg field
router.put("/products/:id/updateImage", async (req, res) => {
  try {
    const { id } = req.params;
    const { imagePath } = req.body;

    // Update the productImg field in the Product model
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productImg: imagePath,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
