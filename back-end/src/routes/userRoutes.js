// user.routes.js
const express = require("express");
const router = express.Router();
const userService = require("../controllers/user");
const authenticate = require("../middlewares/authenticate");

const mapUserType = (userTypeString) => {
  // Assuming you have a map of string values to enum values
  const userTypeMap = {
    customer: "CUSTOMER",
    admin: "ADMIN",
  };

  // Default to 'CUSTOMER' if not found
  return userTypeMap[userTypeString] || "CUSTOMER";
};

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const userTypeEnum = mapUserType(data.userType);
    const body_data = req.body;
    body_data.userType = userTypeEnum;
    const newUser = await userService.createUser(body_data);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
});

//get all admins
router.get("/admins", async (req, res) => {
  try {
    const users = await userService.getAllAdmins();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting Admins" });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
});

// Update a user by ID
router.put("/update",authenticate , async (req, res) => {
  // console.log(req.body)

  try {
    const updatedUser = await userService.updateUserById(req.body.id, req.body);

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await userService.deleteUserById(userId);

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
