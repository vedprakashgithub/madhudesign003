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

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS Configuration
app.use(cors({
  origin: [
    'https://madhudesigns.com',
    'https://admin.madhudesigns.com',
    'http://localhost:5173'
  ],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('API Working');
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server started on PORT: ${port}`);
});
