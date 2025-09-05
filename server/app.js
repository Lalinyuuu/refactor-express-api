import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/db.js';
import productRoute from './routes/productRoute.js';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => res.send('Hello World!'));
app.use('/products', productRoute);

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});