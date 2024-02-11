// user.routes.js
const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const authService = require("../services/auth.service");

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

// Get a user by ID
router.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

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
router.put("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const updatedUser = await userService.updateUserById(userId, req.body);

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
router.delete("/users/:id", async (req, res) => {
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

router.post("/signup", async (req, res) => {
  const { username, password, email, phoneNumber, userType } = req.body;

  // Hash the password before saving to the database
  const hashedPassword = await authService.hashPassword(password);

  // Save user details to the database
  const user = await userService.createUser({
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    userType,
  });

  // Generate a JWT token
  const token = authService.generateToken(user.id);

  res.json({ user, token });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Fetch user details from the database based on the username
  const user = await userService.getUserByUsername(username);

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await authService.comparePasswords(
    password,
    user.password
  );

  if (passwordMatch) {
    // Generate a JWT token
    const token = authService.generateToken(user.id);
    res.json({ user, token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
