const db = require("./db");

// Create a new user
const createAccount = async (data) => {
  return db.account.create({
    data,
  });
};

// Get all users
const getAllTables = async () => {
  return db.account.findMany({
    where: {
      status: {
        not: "ADMIN"
      },
    },
    select:{
      id: true,
      username: true,
      status: true,
      seats: true,
      currentOrder: true,
      orders: {
        select: {
          id: true,
          orderDate: true,
          items: {
            select: {
              quantity: true,
              product: {
                select : {
                  name: true,
                  price: true
                }
              }
            }
          }
        },
      },
      reservations: true
    }
  });
};

const getTableByUsername = async (username) => {
  return db.account.findUnique({
    where: {
      username,
    },
  });
};

// Update a user by ID
const updateTableById = async (data) => {
  // console.log(data)
  return await db.account.update({
    where: {
      id: data.id
    },
    data,
  });
};

// Delete a user by ID
const deleteTableById = async (id) => {
  return db.account.delete({
    where: {
      id,
    },
  });
};

const getTablesByPax = async(pax) => {
  return await db.account.findMany({
    where: {
      seats: {
        gte: pax
      },
      status: {
        not: "ADMIN"
      }
    }
  })
}

module.exports = {
  createAccount,
  getAllTables,
  getTableByUsername,
  updateTableById,
  deleteTableById,
  getTablesByPax
};
