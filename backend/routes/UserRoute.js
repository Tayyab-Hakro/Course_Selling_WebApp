// routes/scheduleRoutes.js
import express from 'express';
import { Login, SignUp } from '../controllers/UserControllers.js';

const router = express.Router();

// POST /api/schedule
router.post('/signup', SignUp);
router.post('/login', Login);


export default router;
