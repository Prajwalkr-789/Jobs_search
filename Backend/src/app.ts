import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { pool} from './Database/Db';
import jobRoutes from './Routes/JobRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({origin: 'https://jobs-search-delta.vercel.app'})); 
app.use(express.json());
app.use('/jobs', jobRoutes);
app.get('/', (_req, res) => res.send('Job API is runninig'));

pool.connect()
 .then(() => {console.log('✅ Connected to PostgreSQL')
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
 })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL:', err)
    process.exit(1);;
  });
