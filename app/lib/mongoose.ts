import mongoose, { Connection } from 'mongoose';

const uri = process.env.MONGODB_URI as string;

console.log(uri);

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseCache;
    }
  }
}

// Global cache for mongoose connection
global.mongoose = global.mongoose || { conn: null, promise: null };

let cached = global.mongoose;

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connecting to MongoDB...');
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Adjust as needed
    }).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose.connection;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;