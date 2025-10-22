import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import databaseConnection from "../config/databaseConnection.js";
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import propertyRoutes from "../routes/propertyRoutes.js";
import bookingRoutes from "../routes/bookingRoutes.js"
import listYourPropertyRoutes from "../routes/listYourPropertyRoutes.js"
import contactUsRoutes from "../routes/contactUsRoutes.js"
const app = express();

const whitelist = [
  "https://upstays-frontend.vercel.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || whitelist.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
// database connection
databaseConnection();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/bookings", bookingRoutes)
app.use("/api/listYourProperty", listYourPropertyRoutes)
app.use("/api/contactUs", contactUsRoutes)

const Port = process.env.PORT || 3001;
app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});

export default app;
