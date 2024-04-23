const db = require("../controllers/db");

// Get all products
const getAllProducts = async () => {
  return db.product.findMany();
};

// Get a product by ID
const getProductById = async (id) => {
  return db.product.findUnique({
    where: {
      id,
    }
  });
};

// Update a product by ID
const updateProductById = async (id, data) => {
  return db.product.update({
    where: {
      id: id,
    },
    data,
  });
};

const upsertProduct = async (id, data) => {
  return db.product.upsert({
    where: {
      id: parseInt(id)
    },
    create: data,
    update: data
  })
}

const deleteProductById = async (id) => {
  return db.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProductById,
  upsertProduct,
  deleteProductById
};
