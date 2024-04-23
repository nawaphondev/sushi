const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const {
  createAccount,
  getTableByUsername,
} = require("../controllers/account");

router.post("/register", async (req, res, next) => {
  const data = req.body;
  console.log(data)

  try {
    if (!(data.username && data.password && data.confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (data.confirmPassword !== data.password) {
      throw new Error("Confirm Password is not match");
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);


    console.log(data)

    const rs = await createAccount({ ...data, password: hashedPassword, confirmPassword: undefined });

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

    const account = await getTableByUsername(username);

    const pwOk = await bcrypt.compare(password, account.password);
    if (!pwOk) {
      throw new Error("invalid password");
    }

    const payload = { id: account.id };
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
  res.json(req.account);
});

module.exports = router;
