import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  let authHeader = req.headers["authorization"] || req.headers["Authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
 