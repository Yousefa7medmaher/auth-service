import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import apiRoutes from './routes/route.js';
dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// Mount /api route
app.use('/api', apiRoutes);

app.get('/', (req, res) => res.send('Auth Service is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
