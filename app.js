import express from "express";
import dotenv from "dotenv";
dotenv.config();
import databaseConnection from "./config/databaseConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
app.use(express.json());

// database connection
databaseConnection();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);

export default app;
