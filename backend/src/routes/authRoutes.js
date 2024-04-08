const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const authenticate = require("../middlewares/authenticate");
const prisma = require("../models/db");
const { createCart } = require("../controllers/cart");
const router = express.Router();

const {
  createUser,
  getUserByUsername,
  updateUserById,
} = require("../controllers/user");

router.post("/register", async (req, res, next) => {
  const {
    username,
    password,
    confirmPassword,
    email,
    phoneNumber,
    firstName,
    lastName,
    userType,
    secretQuestion,
    secretAnswer
  } = req.body;

  try {
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("Confirm Password is not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const data = {
      username,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      phoneNumber,
      secretQuestion,
      secretAnswer,
      userType: userType || "CUSTOMER",
    };

    const rs = await createUser(data);
    await createCart({ userId: rs.id });

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!(username.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }

    const user = await getUserByUsername(username);

    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid password");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token: token });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/me", authenticate, (req, res, next) => {
  res.json(req.user);
});

router.post("/changePassword", authenticate, async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword, id } = req.body;

  try {
    if (!(currentPassword && newPassword && confirmPassword)) {
      throw new Error("fulfill all inputs");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("confirm password not match");
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const pwOk = await bcrypt.compare(currentPassword, user.password);
    if (!pwOk) {
      throw new Error("invalid password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await updateUserById(id, { password: hashedPassword });

    res.json({ msg: "Password Changed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
