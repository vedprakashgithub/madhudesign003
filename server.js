// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// DB & Cloudinary
connectDB();
connectCloudinary();

// Trust reverse proxy (e.g. for secure cookies)
app.set('trust proxy', 1);

// CORS Setup
app.use(cors({
  origin: ['https://admin.madhudesigns.com', 'https://mydigitalfield.in', 'https://madhudesigns.com', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// JSON parsing
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
