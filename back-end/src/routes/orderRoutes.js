// order.routes.js
const express = require("express");
const router = express.Router();
const orderService = require("../services/order.service");
const { removeShoppingCartItems } = require("../services/cart.service");
const paymentService = require("../services/payment.service");

// Create a new order
router.post("/new", async (req, res) => {
  const data = req.body
  // console.log(req.body);
  try {
    const newOrder = await orderService.createOrder({
      shippingAddressId: parseInt(data.shippingAddressId),
      userId: data.userId
    });
    const { id: orderId } = newOrder;

    const orderDetails = data.items.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        orderId
      }
    })
    await orderService.createManyOrderDetail(orderDetails)
    await removeShoppingCartItems(data.shoppingCartId, orderDetails.map((item) => item.productId))
    const payment = await paymentService.createPayment({
      orderId,
      method: data.paymentMethod,
      amount: orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0)
    })

    res.json({...newOrder, paymentId: payment.id});
  } catch (error) {
    console.log(req.body, error.message)
    res.status(500).json({ error: "Error creating order", message: error.message });
  }
});

// Get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error getting orders", message: error.message });
  }
});

// Get a order by ID
router.get("/:id", async (req, res) => {
  const orderId = parseInt(req.params.id, 10);

  try {
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error getting order", message: error.message });
  }
});

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

// Get all orders from user
router.get("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const orders = await orderService.getOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error getting orders" });
  }
});

module.exports = router;
