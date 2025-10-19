import express from "express"
const router = express.Router()
import {
  createOwnerSubmission,
  getAllOwnerSubmission,
  getAllOwnerSubmissionById,
  deleteOwnerSubmission,
} from "../controllers/listYourPropertyController.js";

import verifyToken from "../middlewares/verifyToken.js";
import allowedTo from "../middlewares/allowedTo.js";
router.post("/createOwnerSubmission" , createOwnerSubmission)
router.get(
  "/getAllOwnerSubmission",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getAllOwnerSubmission
);
router.get(
  "/getAllOwnerSubmissionById/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getAllOwnerSubmissionById
);
router.delete(
  "/deleteOwnerSubmission/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  deleteOwnerSubmission
);
export default router