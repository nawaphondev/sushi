// order.service.js
const prisma = require('../db')

// Create a new order
const createOrder = async (data) => {
  return prisma.order.create({
    data,
  });
};

// Get all orders
const getAllOrders = async () => {
  return prisma.order.findMany();
};

// Get a order by ID
const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    with: {
      orderDetails: true,
      payments: true
    }
  });
};

// Update a order by ID
const updateOrderById = async (id, data) => {
  return prisma.order.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a order by ID
const deleteOrderById = async (id) => {
  return prisma.order.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
