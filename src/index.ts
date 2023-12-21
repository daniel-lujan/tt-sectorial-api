import express from 'express';

import dotenv from 'dotenv';
import connectDB from './database/connection';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN ?? '',
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(`API listening at PORT ${port}`);
});
