import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});