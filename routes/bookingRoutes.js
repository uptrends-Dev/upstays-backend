import express from "express";
const router = express.Router();
import {
  createBooking,
  getAllBookings,
  getbookingById,
  deleteBooking,
  // changestatus
} from "../controllers/bookingController.js";
import verifyToken from "../middlewares/verifyToken.js";
import allowedTo from "../middlewares/allowedTo.js";

router.post(
  "/createBooking",
  createBooking
);
router.get(
  "/getAllBookings",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getAllBookings
);
router.get(
  "/getbookingById/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  getbookingById
);
// router.patch(
//   "/changestatus/:id",
//   verifyToken,
//   allowedTo("SUPER_ADMIN", "ADMIN"),
//   changestatus
// );
router.delete(
  "/deleteBooking/:id",
  verifyToken,
  allowedTo("SUPER_ADMIN", "ADMIN"),
  deleteBooking
);
export default router;
