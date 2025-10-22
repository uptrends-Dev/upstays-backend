// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// /**
//  * Connect to MongoDB with caching to avoid creating multiple connections
//  * when running in serverless environments (like Vercel).
//  */
// export default async function databaseConnection() {
//   try {
//     // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
//     if (mongoose.connection.readyState === 1) {
//       console.log("mongo already connected");
//       return mongoose.connection;
//     }

//     if (mongoose.connection.readyState === 2) {
//       // currently connecting - wait for it to finish
//       console.log("mongo is connecting...");
//       return mongoose.connection;
//     }

//     await mongoose.connect(process.env.DATABASE_URL, {
//       // keep defaults, but you can add options if needed
//     });
//     console.log("mongo connected successfully");
//     return mongoose.connection;
//   } catch (error) {
//     console.log("error connecting to mongodb", error);
//     throw error;
//   }
// }

// db.js
import mongoose from "mongoose";

export default async function connectDB(uri = process.env.MONGO_URL) {
  if (!uri) throw new Error("MONGO_URL is missing");

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2) {
    // if a connect is already in progress, just wait for it
    await mongoose.connection.asPromise();
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME, // optional
    });
    console.log("MongoDB connected");
    return mongoose.connection;
  } catch (err) {
    console.error("MongoDB connection error:", err?.message || err);
    throw err; // let caller decide what to do
  }
}