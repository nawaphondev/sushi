// ship_address.service.js
const prisma = require('../db')


// Create a new ship address
const createCard = async (data) => {
  return prisma.card.create({
    data
  });
};

// Get all ship addresss
const getAllCards = async () => {
  return prisma.card.findMany();
};

// get all Cards by user id
const getAllCardsByUserId = async ({userId}) => {
  return prisma.card.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getCardById = async (id) => {
  return prisma.card.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
// const updateCardById = async (id, data) => {
//   return prisma.card.update({
//     where: {
//       id,
//     },
//     data,
//   });
// };

// Delete a ship address by ID
const deleteCardById = async ({id}) => {
  return await prisma.card.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  // updateCardById,
  deleteCardById,
  getAllCardsByUserId
};
