const db = require("../controllers/db");

// Create a new order
const createOrder = async (data) => {
  return await db.order.create({
    data,
  });
};

const getTableOrder = async (accountId) => {
  return await db.order.findMany({
    where: {
      accountId
    },
    orderBy: {
      id: "desc",
    },
    take: 1,
  });
};

//create many order detail
const createManyOrderItem = async (data) => {
  return await db.orderItems.createMany({
    data,
    // skipDuplicates: true,

  });
};

const createOrderItem = async (data) => {
  return await db.orderItems.upsert({
    where: {
      orderId_productId: {
        orderId: data.orderId,
        productId: data.productId
      }
    },
    create: data,
    update: {
      quantity: {
        increment: data.quantity
      }
    }
  });
};

// Get all orders
const getAllOrders = async () => {
  return db.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
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
  return db.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              name: true,
              iamge: true
            }
          }
        }
      },
    },
  });
};

// Update a order by ID
const updateOrderById = async (id, data) => {
  return db.order.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a order by ID
const deleteOrderById = async (id) => {
  return db.order.delete({
    where: {
      id,
    },
  });
};

// get all orders from user
const getOrdersByUserId = async (accountId) => {
  const lastDay = Date.now() - (24 * 60 * 60 * 1000);
  const yesterday = new Date(lastDay).toISOString();

  return db.order.findMany({
    where: {
      accountId,
      orderDate: {
        gte: yesterday
      }
    },
    include: {
      items: {
        include: {
          product: true,
        }
      },
      account: {
        select: {
          username: true
        }
      }
    },
    take: 1,
    orderBy: {
      orderDate: "desc",
    }
  });
};

const getAllSales = async () => {
  return await db.$queryRaw`
    SELECT p.id AS "id", p.name AS "name", SUM(oi.quantity) AS total
    FROM OrderItems oi
    JOIN Product p ON oi.productId = p.id
    GROUP BY p.id, p.name
    ORDER BY total DESC;
  `
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrdersByUserId,
  createOrderItem,
  createManyOrderItem,
  getTableOrder,
  getAllSales
};
