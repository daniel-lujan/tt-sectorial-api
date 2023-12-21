import express from 'express';

import dotenv from 'dotenv';
import connectDB from './database/connection';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening at PORT ${port}`);
});
