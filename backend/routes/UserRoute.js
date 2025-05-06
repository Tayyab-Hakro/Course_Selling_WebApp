// routes/scheduleRoutes.js
import express from 'express';
import { AdminLogin, Login, SignUp } from '../controllers/UserControllers.js';
import { CreateCourse, DeleteCourse, getCreatedCourses, SingleCourse, UpdateCourses } from '../controllers/CourseController.js';
import { verifyAdmin } from '../adminauth.js';

const router = express.Router();

// POST /api/schedule
router.post('/signup', SignUp);
router.post('/login', Login);
router.post('/admin/login', AdminLogin);

router.post('/admin/create',verifyAdmin, CreateCourse);
router.get('/admin/getcourse', getCreatedCourses);
router.put('/admin/updatecourse/:id', verifyAdmin, UpdateCourses);
router.delete('/admin/deletecourse/:id', verifyAdmin, DeleteCourse);
router.get('/admin/single/:id', verifyAdmin, SingleCourse);








export default router;
