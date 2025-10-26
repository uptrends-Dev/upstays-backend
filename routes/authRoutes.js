import express from 'express';
const router = express.Router();
import { registerUser, loginUser , logoutUser , getMe } from '../controllers/authController.js';
import verifyToken from '../middlewares/verifyToken.js';
import allowedTo from "../middlewares/allowedTo.js";
// router.post('/register' , verifyToken , allowedTo("SUPER_ADMIN"), registerUser);
router.post('/register' , registerUser);
router.post('/login' , loginUser);
router.post('/logout' ,  logoutUser);
router.get("/getMe",verifyToken, getMe);

export default router;