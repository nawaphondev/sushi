// user.routes.js
const express = require("express");
const router = express.Router();
const accountService = require("../controllers/account");
const orderService = require("../controllers/order");

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const userTypeEnum = mapUserType(data.userType);
    const body_data = req.body;
    body_data.userType = userTypeEnum;
    const newUser = await accountService.createUser(body_data);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all tables
router.get("/tables", async (req, res) => {
  try {
    const tables = await accountService.getAllTables();
    res.json(tables);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error getting tables" });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await accountService.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
});

router.post("/reserve", async (req, res) => {
  const data = req.body
  try {
    const updatedUser = await accountService.updateTableById(data);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error getting orders" });
  }
})

// Update a user by ID
router.put("/update", async (req, res) => {
  // console.log(req.body)

  let orderId = null
  if (req.body.status === "OCCUPIED") {
    const order = await orderService.createOrder({
      accountId: req.body.id
    })
    orderId = order.id
  }

  try {
    const updatedUser = await accountService.updateTableById({...req.body, currentOrder: orderId});

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // console.log(updatedUser)
    delete updatedUser.password
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await accountService.deleteUserById(userId);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
