// .js
const prisma = require("../models/db");

// Create a new user
const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

// Get all users
const getAllUsers = async () => {
  return prisma.user.findMany({
    where: {
      userType: "CUSTOMER",
    },
  });
};

// Get all admins
const getAllAdmins = async () => {
  return prisma.user.findMany({
    where: {
      userType: "ADMIN",
    },
  });
};

// Get a user by ID
const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      avatar: true,
      email: true,
      firstName: true,
      phoneNumber: true,
      username: true,
    },
  });
};

// Get a user by username
const getUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

// Update a user by ID
const updateUserById = async (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a user by ID
const deleteUserById = async (id) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUsername,
  getAllAdmins,
};
