// routes/scheduleRoutes.js
import express from 'express';
import { AdminLogin, Login, SignUp } from '../controllers/UserControllers.js';
import { CreateCourse } from '../controllers/CourseController.js';
import { verifyAdmin } from '../adminauth.js';

const router = express.Router();

// POST /api/schedule
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/admin/login', AdminLogin);
router.get('/admin/verify', verifyAdmin);

router.post('/admin/create',verifyAdmin, CreateCourse);




export default router;
