import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to database');
  } catch (error) {
    console.log('Error connecting to Database', error);
  }
}

export default connectDB;
