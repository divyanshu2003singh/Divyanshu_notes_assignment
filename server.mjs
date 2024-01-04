import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js'; // Add .js extension here
import noteRoutes from './routes/noteRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://divyanshu:divyanshu@cluster0.57fvbtj.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
