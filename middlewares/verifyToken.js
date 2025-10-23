import jwt from "jsonwebtoken";
import Session from "../models/session.js"
export default async function verifyToken(req, res, next) {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // 
  
  try {
    if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const session = await Session.findOne({ token, isActive: true });

    if (!session) return res.status(401).json({ message: "Session not found" });
    if (session.expiresAt < Date.now()) {
      session.isActive = false;
      await session.save();
      return res.status(401).json({ message: "Session expired" });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
