import express from 'express'
import { getAllUsers, getUser } from '../controllers/user.controler.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);

router.get("/:id", verifyUser, getUser);

export default router;