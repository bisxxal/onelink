'use server' 
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose || { conn: null, promise: null };

 const ConnectDb = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_URI) throw new Error('MONGO_URI is missing');

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI)
      .then((conn) => {
        console.log('Database connected');
        return conn;
      })
      .catch((err) => {
        console.error('Database connection failed:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;

  global.mongoose = cached; 

  return cached.conn;
};
export default ConnectDb
