import express from "express";
const router = express.Router();
import {
  createContactUs,
  getAllcreateContactUs,
  getcreateContactUsById,
  deleteContactUs,
} from "../controllers/contactUsController.js";
import verifyToken from "../middlewares/verifyToken.js";
import allowedTo from "../middlewares/allowedTo.js";

// Route to create a new contact message
router.post("/createContactUs", createContactUs);

// Route to get all contact messages with pagination and filtering
router.get(
  "/getAllcreateContactUs",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getAllcreateContactUs
);

// Route to get a contact message by ID
router.get(
  "/getcreateContactUsById/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getcreateContactUsById
);

// Route to delete a contact message by ID
router.delete(
  "/deleteContactUs/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  deleteContactUs
);

export default router;
