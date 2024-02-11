// cart.service.js
const prisma = require('../db')

// Create a new cart
const createCart = async (data) => {
  return prisma.cart.create({
    data,
  });
};

// Get all carts
const getAllCarts = async () => {
  return prisma.cart.findMany();
};

// Get a cart by ID
const getCartById = async (id) => {
  return prisma.cart.findUnique({
    where: {
      id,
    },
  });
};

// Update a cart by ID
const updateCartById = async (id, data) => {
  return prisma.cart.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a cart by ID
const deleteCartById = async (id) => {
  return prisma.cart.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCartById,
  deleteCartById,
};
