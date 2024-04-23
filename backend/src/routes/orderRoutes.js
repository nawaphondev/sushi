// order.routes.js
const express = require("express");
const router = express.Router();
const orderService = require("../controllers/order");

// Create a new order
router.post("/new", async (req, res) => {
  const {accountId, items} = req.body;
  // console.log(req.body);
  try {
    const [order] = await orderService.getTableOrder(accountId)
    // console.log(accountId)
    // if (!orderId) {

    //   const newOrder = await orderService.createOrder({
    //     userId: userId,
    //     tableId: tableId,
    //   });
    //   orderId = newOrder.id
    // }

    const orderItems = items.map((item) => {
      orderService.createOrderItem({
        productId: item.id,
        quantity: item.quantity,
        orderId: order.id,
      })
    });

    // await orderService.createManyOrderItem(orderItems);

    res.json({ success: true });
  } catch (error) {
    console.log(req.body, error.message);
    res
      .status(500)
      .json({ error: "Error creating order", message: error.message });
  }
});

// Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting orders", message: error.message });
  }
});

// // Get a order by ID
// router.get("/:id", async (req, res) => {
//   const orderId = parseInt(req.params.id);

//   try {
//     const order = await orderService.getOrderById(orderId);

//     if (!order) {
//       res.status(404).json({ error: "Order not found" });
//       return;
//     }

//     res.json(order);
//   } catch (error) {
//     console.log(error.message)
//     res
//       .status(500)
//       .json({ error: "Error getting order", message: error.message });
//   }
// });

// Update a order by ID
router.put("/update/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const updatedOrder = await orderService.updateOrderById(orderId, req.body);

    if (!updatedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
});

// Delete a order by ID
router.delete("/delete/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const deletedOrder = await orderService.deleteOrderById(orderId);

    if (!deletedOrder) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
});

// Get all orders from table
router.get("/table/:id", async (req, res) => {
  const accountId = parseInt(req.params.id, 10);

  try {
    const [orders] = await orderService.getOrdersByUserId(accountId);
    res.json(orders);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error getting orders" });
  }
});


router.get("/sales", async (req, res) => {
  try {
    const sales = await orderService.getAllSales()
    // console.log(sales)
    res.json(sales);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error getting items", message: error.message });
  }
})

module.exports = router;
