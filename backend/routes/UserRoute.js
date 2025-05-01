// routes/scheduleRoutes.js
import express from 'express';
import { AdminLogin, Login, SignUp } from '../controllers/UserControllers.js';

const router = express.Router();

// POST /api/schedule
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/admin', AdminLogin);



export default router;
