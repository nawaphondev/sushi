// cart.service.js
const prisma = require('../db')

// Create a new cart
const createCart = async (data) => {
  return await prisma.shoppingCart.create({
    data,
  });
};

// Get all carts
const getAllCarts = async () => {
  return prisma.shoppingCart.findMany();
};

// Get a cart by ID
const getCartById = async (id) => {
  return prisma.shoppingCart.findUnique({
    where: {
      id,
    },
    select: {
      shoppingCartItems: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              productImg: true,
              capacity: true,
              color: true
            }
          }
        },
      },
    },
  });
};

const getCartByUserId = async (userId) => {
  const shoppingCart = await prisma.shoppingCart.findFirst({
    where: {
      userId: userId,
    },
  });
  return shoppingCart;
};

// Update a cart by ID
const updateCartById = async (id, data) => {
  return prisma.shoppingCart.update({
    where: {
      id,
    },
    data,
  });
};

const addCartItemByCartId = async (data) => {
  const {productId, shoppingCartId, quantity} = data
  const item = await prisma.shoppingCartItem.upsert({
    where: {
      productId_shoppingCartId : { productId, shoppingCartId}
    },
    update: {
      quantity: {
        increment: quantity,
      }
    },
    create: data,
  });
  return item
};

//removeShoppingCartItem
const removeShoppingCartItem = async (data) => {
  const {productId, shoppingCartId} = data
  return await prisma.shoppingCartItem.delete({
    where: {
      productId_shoppingCartId : { productId, shoppingCartId}
    }
  });
};

// Delete a cart by ID
const deleteCartById = async (id) => {
  return prisma.shoppingCart.delete({
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
  getCartByUserId,
  addCartItemByCartId,
  removeShoppingCartItem
};
