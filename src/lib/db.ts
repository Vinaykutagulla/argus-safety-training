import mongoose from 'mongoose';
import { mockDb } from './mockDb';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global as any;
let useMockDb = false;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null, useMock: false };
}

export async function dbConnect() {
  // Return cached connection if available
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  // If using mock database, return immediately
  if (cached.mongoose.useMock) {
    if (!useMockDb) {
      useMockDb = true;
      await mockDb.connect();
    }
    return mockDb;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Increased timeout for Atlas connections
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: 'majority',
    };

    // Try to connect to MongoDB, fall back to mock if it fails
    cached.mongoose.promise = mongoose
      .connect(MONGODB_URI || 'mongodb://localhost:27017/argus-pv', opts)
      .then((mongoose) => {
        console.log('✓ Connected to MongoDB - Cases will persist!');
        cached.mongoose.useMock = false;
        return mongoose;
      })
      .catch(async (error) => {
        console.warn('⚠ MongoDB connection failed, using mock database for development');
        console.warn('Error:', error.message);
        console.warn('📌 To fix: Ensure MongoDB URI is set in .env.local');
        cached.mongoose.useMock = true;
        useMockDb = true;
        await mockDb.connect();
        return mockDb;
      });
  }

  cached.mongoose.conn = await cached.mongoose.promise;
  return cached.mongoose.conn;
}

export { mockDb } from './mockDb';
