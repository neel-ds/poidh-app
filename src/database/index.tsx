import mongoose from 'mongoose';

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

// Extend the NodeJS global interface to include mongooseCache
declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache: MongooseCache;
    }
  }
}

// Initialize the global cache if it doesn't exist
const globalWithMongooseCache = global as typeof global & {
  mongooseCache: MongooseCache;
};

if (!globalWithMongooseCache.mongooseCache) {
  globalWithMongooseCache.mongooseCache = { conn: null, promise: null };
}

const connectToDatabase = async (): Promise<mongoose.Mongoose> => {
  const cache = globalWithMongooseCache.mongooseCache;

  if (cache.conn) {
    return cache.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'WizardsAndGoblins',
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;

  return cache.conn;
};

export { connectToDatabase };
