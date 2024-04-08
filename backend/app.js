require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const cardRoutes = require("./src/routes/cardRoutes");
const contactRoutes = require("./src/routes/contactRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const productRoutes = require("./src/routes/productRoutes");
const shipAddressRoutes = require("./src/routes/shipAddressRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Use routers
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/addresses", shipAddressRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);

app.use(express.static("public"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
