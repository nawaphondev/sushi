const db = require("../controllers/db");

const createReservation = async (data) => {
  return db.reservation.create({
    data,
  });
};

const getTableReservations = async (tableId) => {
  return db.reservation.findMany({
    where:{
      tableId
    }
  });
};

module.exports = {
  createReservation,
  getTableReservations,
};
