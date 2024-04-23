// product.routes.js
const express = require("express");
const router = express.Router();
const productService = require("../controllers/product");
const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");

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

function createFilename(req, file) {
  // console.log(req.body)
  fileExtension = path.extname(file.originalname)
  return `${req.body.name}${fileExtension}`
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, createFilename(req, file))
  }
})
const upload = multer({ storage }).single('image')

// Update a product by ID
router.put("/update", upload, async (req, res) => {
  // console.log(req.file)
  const { id, name, price, category } = req.body

  const image = req.file ? req.file.filename : req.body.image
  try {
    // const updatedProduct = await productService.updateProductById(req.body.id, req.body.data);
    const updatedProduct = await productService.upsertProduct(id, { name, price: parseFloat(price), category, image });

    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(updatedProduct);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error updating product", message: error.message });
  }
});

// Delete a product by ID
router.delete("/delete", async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProductById(req.body.id);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error deleting product", message: error.message });
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
        image: imagePath,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
