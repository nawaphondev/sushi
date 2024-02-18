// ship_address.service.js
const prisma = require('../db')


// Create a new ship address
const createPayment = async (data) => {
  return prisma.payment.create({
    data
  });
};

// Get all ship addresss
const getAllPayments = async () => {
  return prisma.payment.findMany();
};

// get all Paymentss by user id
const getAllPaymentsByUserId = async ({userId}) => {
  return prisma.payment.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getPaymentById = async (id) => {
  return prisma.payment.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
const updatePaymentById = async (id, data) => {
  return prisma.payment.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a ship address by ID
const deletePaymentById = async ({id}) => {
  return await prisma.payment.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  getAllPaymentsByUserId
};
