import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import apiRoutes from './routes/route.js';

dotenv.config();

const app = express();
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Middlewares
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Auth Service is running');
});

// Liveness probe
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Readiness probe (checks DB connection)
app.get('/ready', async (req, res) => {
  try {
    if (global.mongoose?.connection?.readyState === 1) {
      return res.status(200).json({ status: 'READY' });
    }
    return res.status(503).json({ status: 'NOT_READY' });
  } catch (err) {
    return res.status(503).json({ status: 'NOT_READY' });
  }
});

const PORT = process.env.PORT || 5000;

// IMPORTANT: bind to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
