import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import databaseConnection from "../config/databaseConnection.js";
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import propertyRoutes from "../routes/propertyRoutes.js";

const app = express();

const whitelist = [
  "https://upstays-frontend.vercel.app",
  "http://localhost:3001",
];
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || whitelist.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

const Port = process.env.PORT || 3001;
app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});

export default app;

// Vercel will call this handler for each request. We export a compatible handler.
// @vercel/node will accept a default export that is a function (req,res) —
// but we can reuse the Express app by forwarding requests to it.
// export default function handler(req, res) {
//   return app(req, res);
// }
