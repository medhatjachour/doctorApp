import express from 'express';
import { cancelAppointment, completeAppointment, doctorAppointments, doctorDashboard, doctorList, doctorProfile, loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',loginDoctor);
doctorRouter.get('/appointments',authDoctor,doctorAppointments);

doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment);
doctorRouter.post('/complete-appointment',authDoctor,completeAppointment);

doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
doctorRouter.get('/profile',authDoctor,doctorProfile);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);


export default doctorRouter;
