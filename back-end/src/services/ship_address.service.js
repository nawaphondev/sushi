// ship_address.service.js
const prisma = require('../db')


// Create a new ship address
const createShipAddress = async (data) => {
  return prisma.shipAddress.create({
    data,
  });
};

// Get all ship addresss
const getAllShipAddresss = async () => {
  return prisma.shipAddress.findMany();
};

// Get a ship address by ID
const getShipAddressById = async (id) => {
  return prisma.shipAddress.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
const updateShipAddressById = async (id, data) => {
  return prisma.shipAddress.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a ship address by ID
const deleteShipAddressById = async (id) => {
  return prisma.shipAddress.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createShipAddress,
  getAllShipAddresss,
  getShipAddressById,
  updateShipAddressById,
  deleteShipAddressById,
};
