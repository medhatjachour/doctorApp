import express from 'express';
import { addDoctor, adminDashboardData, appointmentCancel, deleteDoctor, getAllAppointments, getAllDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', authAdmin ,upload.single('image'), addDoctor);
adminRouter.get('/all-doctors', authAdmin,getAllDoctors);
adminRouter.delete('/delete-doctor', authAdmin, deleteDoctor);
adminRouter.post('/change-availability', authAdmin,changeAvailability);
adminRouter.get('/all-appointments', authAdmin,getAllAppointments);
adminRouter.post('/cancel-appointments', authAdmin,appointmentCancel);

adminRouter.get('/dashboard', authAdmin,adminDashboardData);

export default adminRouter;
