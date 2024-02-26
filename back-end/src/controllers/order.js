// .js
const prisma = require("../models/db");

// Create a new order
const createOrder = async (data) => {
  return await prisma.order.create({
    data,
  });
};

const createOrderDetail = async (data) => {
  return await prisma.orderDetail.create({
    data,
  });
};

//create many order detail
const createManyOrderDetail = async (data) => {
  return await prisma.orderDetail.createMany({
    data,
    skipDuplicates: true,
  });
};

// Get all orders
const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
      payment: true,
      shippingAddress: true,
      user: {
        select: {
          avatar: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          username: true,
        },
      },
    },
  });
};

// Get a order by ID
const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      orderDetails: {
        include: {
          product: {
            select: {
              name: true,
              productImg: true,
              capacity: true,
              color: true,
            },
          },
        },
      },
    },
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

// get all orders from user
const getOrdersByUserId = async (userId) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderDetails: true,
    },
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  createOrderDetail,
  getOrdersByUserId,
  createManyOrderDetail,
};
