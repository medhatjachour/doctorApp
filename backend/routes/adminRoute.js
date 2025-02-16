import express from 'express';
import { addDoctor, appointmentCancel, getAllAppointments, getAllDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin ,upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors', authAdmin,getAllDoctors);
adminRouter.post('/change-availability', authAdmin,changeAvailability);
adminRouter.get('/all-appointments', authAdmin,getAllAppointments);
adminRouter.post('/cancel-appointments', authAdmin,appointmentCancel);

export default adminRouter;
