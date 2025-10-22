import express from "express";
const router = express.Router();
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  updateAchtiveProperty
} from "../controllers/propertyController.js";
import verifyToken from "../middlewares/verifyToken.js";
import allowedTo from "../middlewares/allowedTo.js";
router.post(
  "/createProperty",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  createProperty
);
router.get("/getAllProperties", getAllProperties);
router.get("/getPropertyById/:id", getPropertyById);
router.put(
  "/updateProperty/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  updateProperty
);
router.put(
  "/updateAchtiveProperty/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  updateAchtiveProperty
);
router.delete(
  "/deleteProperty/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  deleteProperty
);
export default router;
