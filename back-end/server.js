require('dotenv').config()
// backend/server.js
const express = require('express');
// const userRoutes = require('./src/routes/userRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const shipAddressRoutes = require('./src/routes/shipAddressRoutes');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes = require('./src/routes/authRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


//middlewares
// notFound
// app.use(notFound)

// error
// app.use(errorMiddleware)


// Use routers
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/ship_addresses', shipAddressRoutes);
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes)
app.use('/contact', contactRoutes)


app.use(express.static('public'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});