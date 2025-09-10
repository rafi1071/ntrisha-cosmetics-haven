import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '.env') });

// IMPORTANT: Do NOT hardcode sensitive data like MongoDB URIs in this file.
// Use the .env file for secrets. Example in .env:
// MONGODB_URI=your_mongodb_connection_string_here

// console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug log (uncomment for troubleshooting)

const app = express();
app.use(cors());
app.use(express.json());

//MongoDB connection with better error handling
const connectDB = async () => {
  try {
  await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Server will continue with mock data...');
    // Don't exit, just log the error and continue
  }
};

// Connect to MongoDB
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  phone: String,
});
const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  product: Object,
  name: String,
  email: String,
  address: String,
  phone: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    const user = new User({ name, email, password, address, phone });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Profile
app.get('/api/profile', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Place Order (Cash on Delivery)
app.post('/api/order', async (req, res) => {
  try {
    const { product, name, email, address, phone } = req.body;
    const order = new Order({ product, name, email, address, phone });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Orders

// Get Orders (public, not protected)
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Protected: Get all orders (admin only)
app.get('/api/admin/orders', async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    console.log('Fetching orders from database...');
    
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, returning mock data');
      // Return mock data when database is not connected
      const mockOrders = [
        {
          _id: '507f1f77bcf86cd799439021',
          product: { name: 'Vitamin C Serum', price: 29.99 },
          name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, State',
          phone: '+1234567890',
          status: 'pending',
          createdAt: new Date('2024-01-15')
        },
        {
          _id: '507f1f77bcf86cd799439022',
          product: { name: 'Night Beauty Cream', price: 39.99 },
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          address: '456 Oak Ave, City, State',
          phone: '+1234567891',
          status: 'delivered',
          createdAt: new Date('2024-01-16')
        }
      ];
      return res.json(mockOrders);
    }
    
    const orders = await Order.find({}).lean().maxTimeMS(15000);
    console.log(`Found ${orders.length} orders:`, orders);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
});

// --- Admin Auth ---
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Now loaded from .env
const ADMIN_TOKEN = process.env.ADMIN_TOKEN; // Now loaded from .env

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ message: 'Admin login successful', token: ADMIN_TOKEN });
  }
  res.status(401).json({ error: 'Invalid admin credentials' });
});

// Protected: Get all users (admin only)
app.get('/api/admin/users', async (req, res) => {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  try {
    console.log('Fetching users from database...');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, returning mock data');
      // Return mock data when database is not connected
      const mockUsers = [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, State',
          phone: '+1234567890'
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          address: '456 Oak Ave, City, State',
          phone: '+1234567891'
        },
        {
          _id: '507f1f77bcf86cd799439013',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          address: '789 Pine Rd, City, State',
          phone: '+1234567892'
        }
      ];
      return res.json(mockUsers);
    }
    
    const users = await User.find({}).lean().maxTimeMS(15000);
    console.log(`Found ${users.length} users:`, users);
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
