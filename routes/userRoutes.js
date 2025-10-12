import express from 'express';
const router = express.Router();
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';
import allowedTo from "../middlewares/allowedTo.js";
router.get('/getAllUsers', verifyToken, allowedTo("SUPER_ADMIN", "ADMIN"), getAllUsers);
router.put('/updateUser/:id', verifyToken, allowedTo("SUPER_ADMIN", "ADMIN"), updateUser);
router.delete('/deleteUser/:id', verifyToken, allowedTo("SUPER_ADMIN"), deleteUser);
export default router;