const mongoose = require('mongoose');

let connectionPromise = null;

const connectDB = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        bufferCommands: false,
      })
      .then((m) => {
        console.log(`MongoDB Connected: ${m.connection.host}`);
        return m.connection;
      })
      .catch((error) => {
        connectionPromise = null; // fail hua to agli request dobara try kare
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
