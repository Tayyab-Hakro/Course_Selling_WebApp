// routes/scheduleRoutes.js
import express from 'express';
import { AdminLogin, Login, SignUp } from '../controllers/UserControllers.js';
import { CreateCourse, getCreatedCourses, UpdateCourses } from '../controllers/CourseController.js';
import { verifyAdmin } from '../adminauth.js';

const router = express.Router();

// POST /api/schedule
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/admin/login', AdminLogin);

router.post('/admin/create',verifyAdmin, CreateCourse);
router.get('/admin/getcourse', getCreatedCourses);
router.put('/admin/updatecourse/:id', UpdateCourses);






export default router;
