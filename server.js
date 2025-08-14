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

// Initialize Express App
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database and Cloudinary
connectDB();
connectCloudinary();

// Trust proxy (for cookies & headers when behind a reverse proxy)
app.set('trust proxy', 1);

// CORS Middleware
app.use(cors({
  origin: [
    'https://madhudesigns.com',
    'https://admin.madhudesigns.com',
    'http://localhost:5173',
    'http://localhost:5173'
  ],
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy 🚀' });
});

// Root Route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server started on PORT: ${port}`);
});
