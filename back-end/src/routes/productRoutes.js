// product.routes.js
const express = require("express");
const router = express.Router();
const productService = require("../services/product.service");
const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");

function createFilename(req, file) {
  fileExtension = path.extname(file.originalname)
  return req.body.name + fileExtension
}

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, createFilename(req, file))
  }
})
const upload = multer({ storage }).single('productImg')

// Create a new product
router.post("/add", upload, async (req, res) => {
  const data = req.body
  data.productImg = createFilename(req, req.file)
  try {
    const newProduct = await productService.createProduct(data);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error + "Error creating product" });
  }
});

// Get all products
router.get("/all", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error getting products" });
  }
});

// Get a product by ID
router.get("/get/:id", async (req, res) => {
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
router.put("/update/:id", async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
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


// Route to update the productImg field
router.put("/updateImage/:id", async (req, res) => {
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
